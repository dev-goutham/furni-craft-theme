class CurrencySelector extends HTMLElement {
  public selectedCurrency: string | null = null;
  private defaultCurrency: string | null = null;
  private currencies: string[] | null = null;
  public exchangeRates: { [key: string]: number } | null = null;
  constructor() {
    super();
  }

  public getAmount(amount: number, cur: string = this.selectedCurrency!) {
    const rateForCurrency = this.exchangeRates![`${cur}`];
    const newText = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: cur,
    }).format(amount * rateForCurrency);
    return newText;
  }
  setConvertedCurrency() {
    if (!this.exchangeRates) {
      return;
    }
    const cur = this.selectedCurrency as string;
    const moneyEls = document.querySelectorAll('span.money');

    moneyEls.forEach((el) => {
      const amount = parseInt(
        (el.getAttribute('data-amount') as string).split(',').join(''),
      );
      el.textContent = this.getAmount(amount, cur);
    });
    const addToCartButtons = document.querySelectorAll('input[type="submit"]');
    addToCartButtons.forEach((btn) => {
      const amount = btn.getAttribute('data-amount');
      if (!amount) {
        return;
      } else {
        // const oldText = (btn as HTMLInputElement).value;
        const convertedAmount = this.getAmount(+amount / 100, cur);
        const newText = `Add to Cart ${convertedAmount}`;
        (btn as HTMLInputElement).value = newText;
      }
    });
  }

  selectCurrency(val: string) {
    const options = document.querySelectorAll('select[name="currency"] option');
    options.forEach((option) => {
      const { value } = option as HTMLOptionElement;
      if (option.getAttribute('selected')) {
        option.removeAttribute('selected');
      }
      if (value === val) {
        option.setAttribute('selected', 'selected');
      }
    });
    this.setConvertedCurrency();
  }

  private async getExchangeRates() {
    if (this.exchangeRates) {
      return;
    }
    let exchangeUri = `https://api.freecurrencyapi.com/v1/latest?apikey=KecCKGNPc7zMS4rHDmvA8bVi91HX0VrjngtrX3AV&currencies=USD`;
    if (!this.currencies) {
      return;
    } else {
      this.currencies.forEach((cur) => {
        exchangeUri = exchangeUri.concat(`%2C${cur}`);
      });
    }

    const rates = await (await fetch(exchangeUri)).json();
    this.exchangeRates = rates.data;
    this.setConvertedCurrency();
  }

  connectedCallback() {
    this.currencies = (this.dataset.currencies as string).split(' ');
    this.getExchangeRates();
    this.defaultCurrency = this.dataset.default as string;
    this.selectedCurrency =
      window.localStorage.getItem('currency') || this.defaultCurrency;
    window.addEventListener('DOMContentLoaded', () => {
      this.selectCurrency(this.selectedCurrency as string);
      const selectors = document.querySelectorAll(
        'select[name="currency"]',
      ) as NodeListOf<HTMLSelectElement>;
      selectors.forEach((selector) => {
        selector.addEventListener('change', (e) => {
          const { value } = e.target as HTMLSelectElement;
          window.localStorage.setItem('currency', value);
          this.selectedCurrency = value;
          this.selectCurrency(value);
          const cart = document.querySelector('cart-component');
          cart?.setAttribute('currency', value);
        });
      });
    });
    // selector?.addEventListener('change', (e) => {
    //   const { value } = e.target as HTMLSelectElement;
    // });
  }
}

customElements.define('currency-component', CurrencySelector);
