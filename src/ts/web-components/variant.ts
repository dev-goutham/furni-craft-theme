class VariantComponent extends HTMLElement {
  private variants: null | any[] = null;
  private currentOptions: string[] | null = null;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(variantTemplate.content.cloneNode(true));
  }

  getVariants() {
    if (!this.variants) {
      this.variants = JSON.parse(
        this.querySelector('[type="application/json"]')?.textContent as string,
      ).variants;
    }
    return this.variants;
  }

  setCurrentOptions({ name, value }: { name: string; value: string }) {
    if (!this.currentOptions) {
      const currentVariant = JSON.parse(
        this.querySelector('[type="application/json"]')?.textContent as string,
      ).currentVariant;
      this.currentOptions = currentVariant.options;
    }
    this.currentOptions![+name] = value;
  }

  updateUrl(id: string) {
    window.history.replaceState(
      {},
      '',
      `${this.dataset.url as string}?variant=${id}`,
    );
  }

  updateFormId(id: string) {
    const idInput = document.querySelector(
      '#product-form input[name="id"]',
    ) as HTMLInputElement;
    idInput.value = id;
  }

  updatePrice(id: string) {
    const selector = document.querySelector(
      'currency-component',
    ) as unknown as {
      getAmount: (amount: number, cur?: string) => number;
    };

    const url = this.dataset.url as string;
    const section = this.dataset.section as string;
    const oldPrice = document.getElementById('price') as HTMLInputElement;

    oldPrice.classList.add('disabled');
    oldPrice.value = '...';

    fetch(`${url}?variant=${id}&section=${section}`)
      .then((res) => res.text())
      .then((res) => {
        const html = new DOMParser().parseFromString(res, 'text/html');
        const newPrice = html.getElementById('price') as HTMLInputElement;
        const val = parseInt(newPrice.getAttribute('data-amount')!) / 100;
        const convertedPrice = String(selector.getAmount(val));
        oldPrice.value = 'Add to Cart ' + convertedPrice;
        oldPrice.classList.remove('disabled');
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }

  getCurrentVariant() {
    const currentVariant = this.getVariants()!.find(
      (variant) =>
        JSON.stringify(variant.options) === JSON.stringify(this.currentOptions),
    ) as { [key: string]: any };
    return currentVariant;
  }

  handleChange({ name, value }: { name: string; value: string }) {
    this.setCurrentOptions({ name, value });
    const currentVariant = this.getCurrentVariant();
    this.updateUrl(currentVariant.id as string);
    this.updateFormId(currentVariant.id as string);
    this.updatePrice(currentVariant.id as string);
  }

  connectedCallback() {
    const variants = this.shadowRoot?.querySelectorAll('.variant');
    if (!variants) {
      return;
    } else {
      variants?.forEach((variant) => {
        variant.addEventListener('change', (e) => {
          const { value, name } = e.target as HTMLInputElement;
          this.handleChange({ name, value });
        });
      });
    }
  }
}

const variantTemplate = document.createElement('template');

variantTemplate.innerHTML = /* html */ `
  <div>
    <slot class="variant" name="variant" />
    <slot class="submit" name="submit"/>
  </div>
`;

customElements.define('variant-component', VariantComponent);
