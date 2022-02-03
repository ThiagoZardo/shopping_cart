require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

// Para realizar esse Requisito, consultei os meus exercícios do dia 01/02/2022.

describe('1 - Teste a função fecthProducts', () => {

  it('1- verifica se fetchProducts é uma função', async () => {
    await expect(typeof fetchProducts).toBe('function');
  })

  it('2- Verifique se ao executar a função fetchProducts com o argumento "computador" a fetch foi chamada', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  })

  it('3- Verifica se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  })

  it('4- verifica se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch que já está importado no arquivo.', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  })

  it('5- verifica se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const failRequest = await fetchProducts();
    expect(failRequest).toEqual(new Error('You must provide an url'));
  })

});
