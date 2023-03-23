export async function addToCart(id: string, quantity = 1) {
  const formData = {
    items: [
      {
        id,
        quantity,
      },
    ],
  };
  try {
    const res = await (
      await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
    ).json();
    //@ts-ignore
    document.querySelector('cart-component').updateCart();
    return res;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}
