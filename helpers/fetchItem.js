// Recebi ajuda dos alunos Danillo, Sheila Nakashima, Imar. 
const fetchItem = async (itemID) => {
  const url = `https://api.mercadolibre.com/items/${itemID}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
      return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
