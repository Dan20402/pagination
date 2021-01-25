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
    const response = await fetch(url);
    const paginatedExpense = await response.json();
    const totalCount = response.headers.get('x-total-count');
    return { paginatedExpense, totalCount };
};

const main = async () => {
    const allExpenses = [];
    const response = await getDespesas(ITEMS_PER_PAGE, 1, DEPUTADO_ID);

    const numberOfPages = Math.floor(response.totalCount / ITEMS_PER_PAGE);
    const { dados } = response.paginatedExpense;
    allExpenses.push(dados);
    if (numberOfPages > 1) {
        const nextResults = [...Array(numberOfPages)].reduce(
            (acc, _, index) => {
                acc.push(getDespesas(ITEMS_PER_PAGE, index + 1, DEPUTADO_ID));
                return acc;
            },
            [],
        );

        nextResponses = await Promise.all(nextResults);
        nextResponses.forEach(
            (nextResponse) => allExpenses.push(nextResponse.paginatedExpense.dados),
        );

        console.log(allExpenses);
    }
};
main();
