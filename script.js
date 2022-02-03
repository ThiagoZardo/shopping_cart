// const { fetchProducts } = require("./helpers/fetchProducts");
const cartItems = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItems);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const AddCart = async (event) => {
  const elemento = event.target.parentNode;
  const productID = getSkuFromProductItem(elemento);
  const product = await fetchItem(productID);
  const returnCreateCartItemElement = createCartItemElement(product);
  cartItems.appendChild(returnCreateCartItemElement);
  saveCartItems(cartItems);
};

const includeProductsInTheSite = async () => {
  const createProducts = await fetchProducts('computador');
  const sectionItems = document.querySelector('.items');
  const { results } = createProducts;
  results.forEach((element) => sectionItems.appendChild(createProductItemElement(element)));
};

// Função para remover os itens clicados que já estão salvos no localStorage. *Consultei o meu "projeto To do List".
const removeClickSaved = () => {
  for (let i = 0; i < cartItems.childNodes.length; i += 1) {
    cartItems.childNodes[i].addEventListener('click', cartItemClickListener);
  }
};

window.onload = async () => {
  getSavedCartItems(cartItems);
  removeClickSaved();

  await includeProductsInTheSite();
  const itemAdd = document.querySelectorAll('.item__add');
  itemAdd.forEach((element) => element.addEventListener('click', AddCart));
};
