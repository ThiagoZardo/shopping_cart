const saveCartItems = (cartItem) => {
  localStorage.setItem('cartItems', cartItem.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
