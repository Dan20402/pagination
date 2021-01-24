/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const fetch = require('node-fetch');
const buildUrl = require('build-url');

const DEPUTADO_ID = 141439;

const getFirstDespesas = async (deputadoId) => {
    const url = buildUrl('https://dadosabertos.camara.leg.br', {
        path: `/api/v2/deputados/${deputadoId}/despesas`,
        queryParams: {
        ordem: 'ASC',
        ordenarPor: 'ano',
        },
    });
    console.log(url);
    const response = await fetch(url);
    const paginatedExpense = await response.json();
    return { paginatedExpense, nextLink: getNextLink(paginatedExpense.links) };
};

const getNextDespesas = async (url) => {
    const response = await fetch(url);
    const paginatedExpense = await response.json();
    return { paginatedExpense, nextLink: getNextLink(paginatedExpense.links) };
};

const getNextLink = (links) => {
    console.log(links);
    for (link of links) {
        if (link.rel === 'next') {
            return link.href;
        }
    }
};


const iterateResponse = async (response, allResponses) => {
    
    if (!response.nextLink) {
        return allResponses;
    };

    const nextResponse = await getNextDespesas(response.nextLink);

    iterateResponse(nextResponse, allResponses.concat(nextResponse.paginatedExpense.dados))
}

const main = async () => {
 
    const response = await getFirstDespesas(DEPUTADO_ID);
    const firstResponse = response.paginatedExpense.dados;

    console.log(JSON.stringify(firstResponse.concat(iterateResponse(response))));
}

main();