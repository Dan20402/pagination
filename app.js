/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const fetch = require('node-fetch');
const buildUrl = require('build-url');

const DEPUTADO_ID = 141439;
const ITEMS_PERPAGE = 10;
const getDespesas = async (itemsPerPage, pageNumber, deputadoId) => {
    const url = buildUrl('https://dadosabertos.camara.leg.br', {
        path: `/api/v2/deputados/${deputadoId}/despesas`,
        queryParams: {
        ordem: 'ASC',
            ordenarPor: 'ano',
            itens: itemsPerPage,
        pagina: pageNumber,
        },
    });
    
    console.log(url);
    
    const response = await fetch(url);
    const paginatedExpense = await response.json();
    const totalCount = response.headers.get('x-total-count');
    console.log(`Total count: ${totalCount}`);
    return { paginatedExpense, totalCount };
};

const main = async () => {
 let allExpenses = [];
    const response = await getDespesas(0, itemsPerPage, DEPUTADO_ID);
   
    const numberOfPages = Math.floor(totalCount / itemsPerPage);
    const dados = response.paginatedExpense.dados;
    allExpenses.push(dados);

    for (let currentPage = 1; currentPage < numberOfPages; currentPage++){
        const response = await getDespesas(currentPage, itemsPerPage, DEPUTADO_ID);
     const dados = response.paginatedExpense.dados;
    allExpenses.push(dados);
    }
  const { links } = expenses;
  console.log(links);

main();

