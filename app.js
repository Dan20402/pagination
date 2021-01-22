const fetch = require('node-fetch');

//This the specific deputado's id.
const id = 141439;

//Despesas endpoint .... got it from here if you are interested. https://dadosabertos.camara.leg.br/swagger/api.html
let url = `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/despesas?ordem=ASC&ordenarPor=ano`;

const getDespesas = async function () {
  const response = await fetch(url);
  const data = await response.json();
  console.log(`Total count: ${response.headers.get('x-total-count')}`);
  return data;
};

getDespesas().then((data) => {
  const dados = data.dados;
  const links = data.links;
  //console.log(links);

  /*  The block below groups the links array by 'self', 'next', 'first', 'last'. */
  const key = 'rel';
  const filtrado = links.reduce((result, current) => {
    if (!result[current[key]]) {
      result[current[key]] = [];
    }
    result[current[key]].push(current);
    return result;
  }, {});
  //console.log(filtrado);
});
