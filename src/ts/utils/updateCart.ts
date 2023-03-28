import { addEventListenersToCart } from '../pages/cartPage';

interface Args {
  itemId: number;
  quantity: number;
}

const updateDom = async () => {
  const text = await (await fetch(`/cart`)).text();
  const html = new DOMParser().parseFromString(text, 'text/html');
  const newCartPage = html.querySelector('section.cart-template')!;
  const oldCartPage = document.querySelector('section.cart-template')!;
  oldCartPage.innerHTML = newCartPage.innerHTML!;
  addEventListenersToCart();
};

export const updateCart = async ({ itemId, quantity }: Args) => {
  try {
    await (
      await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: itemId,
          quantity,
        }),
      })
    ).json();

    //@ts-ignore
    document.querySelector('cart-component')?.updateCart();
    if (window.location.href.includes('cart')) {
      updateDom();
    }
  } catch (error) {
    console.log(error);
  }
};
