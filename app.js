/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const fetch = require('node-fetch');
const buildUrl = require('build-url');

const DEPUTADO_ID = 141439;
const ITEMS_PER_PAGE = 10;
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
    const allExpenses = [];
    const response = await getDespesas(ITEMS_PER_PAGE, 1, DEPUTADO_ID);

    const numberOfPages = Math.floor(response.totalCount / ITEMS_PER_PAGE);
    const { dados } = response.paginatedExpense;
    allExpenses.push(dados);
    console.log(numberOfPages);
    if (numberOfPages > 1) {
        for (let currentPage = 2; currentPage <= numberOfPages; currentPage++) {
            const nextResponse = await getDespesas(ITEMS_PER_PAGE, currentPage, DEPUTADO_ID);
            const nextDados = nextResponse.paginatedExpense.dados;
            allExpenses.push(nextDados);
        }
    }
    console.log(allExpenses);
};
main();
