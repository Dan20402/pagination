/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const fetch = require('node-fetch');
const buildUrl = require('build-url');

const DEPUTADO_ID = 141439;

const getNextLink = (links) => {
    const nextLink = links.find((link) => link.rel === 'next');
    return nextLink?.href;
};

const getFirstDespesas = async (deputadoId) => {
    const url = buildUrl('https://dadosabertos.camara.leg.br', {
        path: `/api/v2/deputados/${deputadoId}/despesas`,
        queryParams: {
            ordem: 'ASC',
            ordenarPor: 'ano',
        },
    });

    const response = await fetch(url);
    const paginatedExpense = await response.json();
    return { paginatedExpense, nextLink: getNextLink(paginatedExpense.links) };
};

const getNextDespesas = async (url) => {
    const response = await fetch(url);
    const paginatedExpense = await response.json();
    return { paginatedExpense, nextLink: getNextLink(paginatedExpense.links) };
};

const iterateResponse = async (response, allResponses) => {
    if (!response.nextLink) {
        return allResponses;
    }

    const nextResponse = await getNextDespesas(response.nextLink);
    const iteratedResponse = await iterateResponse(
        nextResponse,
        allResponses?.concat(nextResponse.paginatedExpense.dados),
    );
    return iteratedResponse;
};

const main = async () => {
    const response = await getFirstDespesas(DEPUTADO_ID);
    const firstResponse = response.paginatedExpense.dados;

    console.log(await iterateResponse(response, firstResponse));
};

main();
