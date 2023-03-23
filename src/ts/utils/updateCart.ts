interface Args {
  itemId: number;
  quantity: number;
}

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
  } catch (error) {
    console.log(error);
  }
};
