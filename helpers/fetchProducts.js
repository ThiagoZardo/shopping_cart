const fetchProducts = async (endpoint) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${endpoint}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
      return error;
  }
};

fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
