// const { fetchProducts } = require("./helpers/fetchProducts");
let total = 0;
const cartItemsOl = document.querySelector('.cart__items');

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
const container = document.querySelector('.items');
const textLoading = document.createElement('p');

const loading = () => {
    textLoading.className = 'loading';
    textLoading.innerHTML = 'carregando...';
    textLoading.style.fontSize = '50px';
    container.appendChild(textLoading);  
};

// Função veio pronta "Exibe imagem do produto" 
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// Função veio pronta "Cria um elemento com os dados recebidos por parametros id, nome, imagem" 
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// Função veio pronta "Alterei os parametros para bater com as chaves do objeto"
function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

// Função veio pronta "Pega o ID do elemento"
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const reducePrice = (string) => {
  const stringSplit = string.split('$');
  const itemPrice = stringSplit[stringSplit.length - 1];
  total -= Number(itemPrice);
};

const priceParagraph = document.createElement('p');
// Requisito 05 Somar os valores dos produtos.
const price = async () => {
  const containerCartTitle = document.querySelector('.container-cartTitle');
  priceParagraph.className = 'total-price';
  priceParagraph.innerHTML = `${parseFloat(total)}`;
  // `${total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
  containerCartTitle.appendChild(priceParagraph);
};

// Função criada remove os items clicados e salva no localStorage.
function cartItemClickListener(event) {
  reducePrice(event.target.innerText);
  price();
  event.target.remove();
  saveCartItems(cartItemsOl);
}

// Função veio pronta "Alterei os parametros para bater com as chaves do objeto" Cria os itens em li's criadas dinamicamente e preenche com os valores corretos do produto.
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Função criada que adciona os produtos no carrinho de compras. Imar me ajudou a estruturar essa Função
// Ao clicar no botão, chamo o Pai (ou seja a section com todos os dados do produto) depois passo esse elemento como parametro para

const AddCart = async (event) => {
  const elemento = event.target.parentNode;
  const productID = getSkuFromProductItem(elemento);
  const product = await fetchItem(productID);
  const returnCreateCartItemElement = createCartItemElement(product);
  total += product.price;
  price();
  cartItemsOl.appendChild(returnCreateCartItemElement);
  saveCartItems(cartItemsOl);
};

const includeProductsInTheSite = async () => {
  const createProducts = await fetchProducts('computador');
  const sectionItems = document.querySelector('.items');
  const { results } = createProducts;
  results.forEach((element) => sectionItems.appendChild(createProductItemElement(element)));
};

// Função para remover os itens clicados que já estão salvos no localStorage. *Consultei o meu "projeto To do List".
const updatePrice = () => {
  for (let i = 0; i < cartItemsOl.childNodes.length; i += 1) {
    cartItemsOl.childNodes[i].addEventListener('click', cartItemClickListener);
    const textLi = cartItemsOl.childNodes[i].innerText;
    const textLiSplit = textLi.split('$');
    const itemPrice = textLiSplit[textLiSplit.length - 1];
    total += Number(itemPrice);
    price();
  }
};

// Botão Esvaziar Carrinho
const clearCart = () => {
  const emptyCart = document.querySelector('.empty-cart');
  emptyCart.addEventListener('click', () => {
    for (let j = cartItemsOl.childNodes.length - 1; j >= 0; j -= 1) {
      cartItemsOl.childNodes[j].remove();
    }
    localStorage.clear(); // Limpa o localStorage https://qastack.com.br/programming/7667958/clearing-localstorage-in-javascript
    total = 0;
    price();
  });
};

window.onload = async () => {
  loading();
  await sleep(2000);
  textLoading.remove();
  getSavedCartItems(cartItemsOl);
  updatePrice();
  clearCart();
  await includeProductsInTheSite();
  const buttonsAdd = document.querySelectorAll('.item__add');
  buttonsAdd.forEach((buttonAdd) => buttonAdd.addEventListener('click', AddCart));
};
