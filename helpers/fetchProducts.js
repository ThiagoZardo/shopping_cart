const fetchProducts = async () => {
  const url = (endpoint) => `https://api.mercadolibre.com/sites/MLB/search?q=$QUERY${endpoint}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
