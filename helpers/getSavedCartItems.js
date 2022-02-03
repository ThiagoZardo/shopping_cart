const getSavedCartItems = () => {
  const cartItem = document.querySelector('.cart__items');
  const saveCart = localStorage.getItem('cartItems');
  cartItem.innerHTML = saveCart;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
