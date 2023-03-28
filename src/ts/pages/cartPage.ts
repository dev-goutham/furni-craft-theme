import { updateCart } from '../utils/updateCart';

export const addEventListenersToCart = () => {
  const cartQtyEls = document.querySelectorAll('.cart-item-details');
  cartQtyEls.forEach((el) => {
    const addBtn = el.querySelector('.cart-plus');
    const deductBtn = el.querySelector('.cart-minus');
    const removeBtn = el.querySelector('.remove-button');
    const id = el.getAttribute('data-id')!;

    const sendUpdate = async (qty: number) => {
      try {
        await updateCart({
          itemId: id as unknown as number,
          quantity: qty,
        });
      } catch (error) {
        console.log(error);
      }
    };

    const addItem = async (quantity: number) => {
      sendUpdate(quantity + 1);
    };

    const deductItem = async (quantity: number) => {
      await sendUpdate(quantity - 1);
    };

    const removeItem = async () => {
      await sendUpdate(0);
      el.parentElement?.remove();
    };

    addBtn?.addEventListener('click', async (e) => {
      e.preventDefault();
      const quantity = parseInt(el.getAttribute('data-quantity')!);
      addItem(quantity);
    });

    deductBtn?.addEventListener('click', async (e) => {
      e.preventDefault();
      const quantity = parseInt(el.getAttribute('data-quantity')!);
      if (quantity > 1) {
        await deductItem(quantity);
      } else {
        await removeItem();
      }
    });

    removeBtn?.addEventListener('click', removeItem);
  });
};

addEventListenersToCart();
