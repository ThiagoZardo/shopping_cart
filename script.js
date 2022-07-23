// const { fetchProducts } = require("./helpers/fetchProducts");
let total = 0;
const cartItemsOl = document.querySelector('.cart__items');
const container = document.querySelector('.items');
const textLoading = document.createElement('p');
const priceParagraph = document.createElement('p');

// Função Carregando
const loading = () => {
    textLoading.className = 'loading';
    textLoading.innerHTML = 'carregando...';
    textLoading.style.fontSize = '20px';
    container.appendChild(textLoading);  
};

// Função veio pronta "Exibe imagem do produto" 
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// Função veio pronta "Cria um elemento com os dados recebidos por parametros da função createProductItemElement (id, nome, imagem)" 
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// Função veio pronta "Alterei os parametros para bater com as chaves do objeto"
function createProductItemElement({ id: sku, title: name, thumbnail: image, price: salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${salePrice}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

// Função veio pronta "Pega o ID do elemento"
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// Função que calcula o preço quando um item é removido do carrinho. Fiz com a ajuda do Roberval na monitoria.
const reducePrice = (string) => {
  const stringSplit = string.split('$');
  const itemPrice = stringSplit[stringSplit.length - 1];
  total -= Number(itemPrice);
};

// Requisito 05 ajusta o formato do valor total.
const price = async () => {
  const containerCartTitle = document.querySelector('.container-cartTitle');
  priceParagraph.className = 'total-price';
  priceParagraph.innerHTML = `${total.toLocaleString('pt-br',
    { style: 'currency', currency: 'BRL' })}`;
  containerCartTitle.appendChild(priceParagraph);
};

// Remove os items clicados e salva no localStorage.
function cartItemClickListener(event) {
  reducePrice(event.target.innerText);
  price();
  event.target.parentElement.remove();
  saveCartItems(cartItemsOl);
}

// Função veio pronta "Alterei os parametros para bater com as chaves do objeto" Cria os itens em li's criadas dinamicamente e preenche com os valores corretos do produto, Imar Mendes me ajudou.
function createCartItemElement({ id: _sku, title: name, price: salePrice, thumbnail }) {
  const image = createProductImageElement(thumbnail);
  image.className = 'icon__image';
  const circle = document.createElement('div');
  const x = document.createElement('p');
  x.className = 'btn__x';
  const li = document.createElement('li');
  circle.className = 'circle';
  li.className = 'cart__item';
  circle.appendChild(image);

  li.innerText = ` ${name}
  R$${salePrice}`;
  x.innerText = 'x';
  li.appendChild(circle);
  li.appendChild(x);
  x.addEventListener('click', cartItemClickListener);
  console.log(li);
  return li;
}

// Função criada que adciona os produtos no carrinho de compras. Imar me ajudou a estruturar essa Função
// Ao clicar no botão, chamo o Pai (ou seja a section com todos os dados do produto) depois passo esse produto como parametro para a função getSkuFromProductItem e faz a soma dos produtos adcionados ao carrinho. Imar Mendes me ajudou. 
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

// inclui os produtos na página do site buscando o fetch no arquivo fetchProducts. Imar Mendes me ajudou.
const includeProductsInTheSite = async (item) => {
  const createProducts = await fetchProducts(item);
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
  getSavedCartItems(cartItemsOl);
  updatePrice();
  clearCart();
  await includeProductsInTheSite('computador');
  textLoading.remove();
  const buttonsAdd = document.querySelectorAll('.item__add');
  buttonsAdd.forEach((buttonAdd) => buttonAdd.addEventListener('click', AddCart));
};
