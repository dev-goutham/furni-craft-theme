/* eslint-disable no-unused-vars */

import { Item, Cart } from './cart-typings';
import { updateCart } from '../utils/updateCart';

class CartComponent extends HTMLElement {
  private isOpen = false;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(cartTemplate.content.cloneNode(true));
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  handleShowDialog() {
    const dialog = this.shadowRoot?.querySelector('.cart-dialog');

    if (this.isOpen) {
      dialog?.classList.remove('hidden');
    } else {
      dialog?.classList.add('hidden');
    }
  }

  async attachRemoveButtons() {
    const removeButtons = this.shadowRoot?.querySelectorAll('.remove-button');
    removeButtons?.forEach((button) => {
      button.addEventListener('click', async () => {
        const id = button.getAttribute('data-id') as unknown as number;
        await updateCart({
          itemId: id,
          quantity: 0,
        });
        // const cartItem = this.shadowRoot?.querySelector(`#item-${id}`)!;
        // cartItem.remove();
        this.updateCart();
      });
    });
  }

  attachPlusMinusButton() {
    const quantitySections = this.shadowRoot?.querySelectorAll(
      '.cart-item-quantity',
    );
    quantitySections?.forEach((qty) => {
      const plusButton = qty.querySelector('.cart-plus');
      const minusButton = qty.querySelector('.cart-minus');
      const id = qty.getAttribute('data-id') as unknown as number;
      const itemCount = qty.getAttribute('data-quantity') as unknown as number;
      plusButton?.addEventListener('click', () => {
        updateCart({
          quantity: +itemCount + 1,
          itemId: id,
        });
      });
      minusButton?.addEventListener('click', () => {
        updateCart({
          itemId: id,
          quantity: +itemCount - 1,
        });
      });
    });
  }

  async updateCart() {
    const dialog = this.shadowRoot?.querySelector('.cart-dialog');
    const cartCount = this.querySelector('.count')!;
    try {
      const cartData = (await (await fetch('/cart.js')).json()) as Cart;
      cartCount.textContent = String(cartData.item_count);

      const oldCartItems = dialog?.querySelector('.cart-items') as Node;
      const oldCheckoutSection = dialog?.querySelector(
        '.checkout-section',
      ) as Node;
      if (dialog?.contains(oldCartItems)) {
        dialog?.removeChild(oldCartItems);
      }
      if (dialog?.contains(oldCheckoutSection)) {
        dialog.removeChild(oldCheckoutSection);
      }

      if (cartData.item_count > 0) {
        cartCount.classList.remove('empty');
        const noItems = dialog?.querySelector('.no-items');
        if (noItems) {
          noItems.remove();
        }
        const cartItemsElem = document.createElement('div');
        cartItemsElem.className = 'cart-items';

        dialog?.appendChild(cartItemsElem);
        createCartItems(cartData.items, cartItemsElem);
        createCheckoutButton(cartData.total_price, dialog!);
        this.attachRemoveButtons();
        this.attachPlusMinusButton();
        this.updateCurrency();
      } else {
        cartCount.classList.add('empty');
        const noItems = document.createElement('h3');
        noItems.className = 'no-items';
        noItems.textContent = 'No Items in the Cart';
        dialog?.appendChild(noItems);
      }
    } catch (error) {
      console.log(error);
    }
  }

  updateCurrency() {
    const moneyEls = this.shadowRoot?.querySelectorAll('span.money');
    const selector = document.querySelector(
      'currency-component',
    ) as unknown as {
      getAmount: (amount: number) => number;
    };
    moneyEls?.forEach((el) => {
      const amount = +el.getAttribute('data-amount')!;
      const convertedAmount = selector.getAmount(amount / 100);
      el.textContent = String(convertedAmount);
    });
  }

  connectedCallback() {
    const toggleBtn = this.querySelector('button.cart-button');
    this.updateCart();

    window.addEventListener('click', (e) => {
      if (this.contains(e.target as Node)) {
        return;
      } else {
        this.isOpen = false;
        this.handleShowDialog();
      }
    });
    toggleBtn?.addEventListener('click', () => {
      this.toggleOpen();
      this.handleShowDialog();
    });
  }

  disconectedCallback() {
    const toggleBtn = this.querySelector('button.cart-button');
    const dialog = this.querySelector('.cart-dialog');
    window.removeEventListener('click', (e) => {
      if (
        dialog?.contains(e.target as Node) ||
        toggleBtn?.contains(e.target as Node)
      ) {
        return;
      } else {
        this.isOpen = false;
        this.handleShowDialog();
      }
    });
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'item-count') {
      const button = this.querySelector(
        '.cart-button .count',
      ) as HTMLSpanElement;
      button.innerText = newValue;
    } else if (name === 'currency') {
      this.updateCurrency();
    }
  }

  static get observedAttributes() {
    return ['item-count', 'currency'];
  }
}

const createCheckoutButton = (total: number, dialog: Element) => {
  const checkoutSection = document.createElement('div');
  checkoutSection.className = 'checkout-section';
  checkoutSection.innerHTML = /* html */ `
          <div class='sub-total'>
            <span class='subtotal'> Subtotal </span>
            <span data-amount=${total} class='money total-amount'>
              ${total}
            </span>
          </div>
          <a class='checkout-btn' href='/cart'>
            Go To Cart
          </a>
  `;
  dialog.appendChild(checkoutSection);
};

const createCartItems = (items: Item[], cartItems: HTMLElement) => {
  items.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.id = `item-${item.id}`;
    cartItem.innerHTML = /* html */ `
      <div>
        <img
          src='${item.image}'
          alt='${item.id}'
        >
      </div>
      <div class='cart-item-details'>
        <div class='details'>
          <h3>${item.product_title}</h3>
          <p>${item.variant_title}</p>
        </div>
        <div data-id="${item.id}" data-quantity="${item.quantity}" class='cart-item-quantity'>
          Quantity:
          <button class="cart-minus">-</button>
          <span class='quantity'>
              ${item.quantity}
          </span>
          <button class="cart-plus">+</button>
        </div>
      </div>
      <div class='cart-item-price'>
        <span data-amount=${item.line_price} class='money price'>
          ${item.line_price}
        </span>
        <button
          data-id='${item.id}'
          class='remove-button'
        >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          class='w-6 h-6'
        >
          <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
        </svg>
        </button>
      </div>
    `;
    cartItems.appendChild(cartItem);
  });
};

// const cartCheckoutSection = document.createElement('div')

const cartTemplate = document.createElement('template');

cartTemplate.innerHTML = /* html */ `
  <style>
   .cart-dialog {
  --sb-track-color: grey;
  --sb-thumb-color: #000;
  --sb-size: 10px;
  background-color: #fff;
  box-shadow: 5px 9px 18px 2px rgba(0, 0, 0, 0.48);
  max-height: 400px;
  overflow-y: scroll;
  padding: 0 50px;
  position: absolute;
  right: 0;
  scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  top: 73px;
  z-index: 50;
}
 .cart-dialog::-webkit-scrollbar {
  width: var(--sb-size);
}
 .cart-dialog::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 10px;
}
 .cart-dialog::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 10px;
}
 .cart-dialog.hidden {
  display: none;
}
 .cart-dialog img {
  height: 80px;
  -o-object-fit: cover;
  object-fit: cover;
  width: 80px;
}
 .cart-dialog .cart-item {
  border-bottom: 1px solid #dedede;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 20px 0;
  width: 430px;
  max-height: 80px;
}
 .cart-dialog .cart-item .cart-item-details {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  margin-left: 20px;
}
 .cart-dialog .cart-item .cart-item-details .details h3 {
  font-family: var(--font-serif);
  font-size: 15px;
  font-weight: 700;
  margin: 0;
}
 .cart-dialog .cart-item .cart-item-details .details p {
  font-size: 13px;
  margin: 0;
}
 .cart-dialog .cart-item .cart-item-details .cart-item-quantity button{
  background-color: transparent;
  border: none;
  outline: none;
  padding: 5px;
  cursor: pointer;
}
 .cart-dialog .cart-item .cart-item-details .cart-item-quantity {
  font-size: 13px;
  margin-top: auto;
}
 .cart-dialog .cart-item .cart-item-details .cart-item-quantity .quantity {
  font-family: var(--font-serif);
  font-size: 15px;
  font-weight: bold;
}
 .cart-dialog .cart-item .cart-item-price {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  align-items: flex-end;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  justify-content: space-between;
}
 .cart-dialog .cart-item .cart-item-price .remove-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  transform: translateX(4px);
  height: 20px;
  width: 20px;
}
 .cart-dialog .cart-item .cart-item-price .remove-button svg {
  --stroke-color: grey;
  fill: grey;
  color: grey;
  height: 20px;
  padding: 0;
  width: 20px;
}
 .cart-dialog .sub-total {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  margin-left: 100px;
  margin-top: 25px;
}
 .cart-dialog .checkout-btn {
  background-color: #000;
  color: #fff;
  display: block;
  margin-bottom: 20px;
  margin-left: 100px;
  margin-top: 16px;
  padding: 20px 0;
  text-align: center;
}
a {
  text-decoration: none;
}
  </style>
  <slot id="button" name="cart-button"></slot>
  <!-- <slot id="dialog" name="cart-dialog"> -->
  <div class='hidden cart-dialog'>
  </div>
  </slot>
`;

customElements.define('cart-component', CartComponent);
