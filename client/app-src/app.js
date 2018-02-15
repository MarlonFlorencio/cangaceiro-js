import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/js/modal.js';
import '../css/meucss.css';

import { NegociacaoController } from './controllers/NegociacaoController.js';

// teste do carregamento do jquery e do bootstrap.js
$('h1').on('click',() => alert('Foi clicado!'));
console.log('Função adicionada pelo bootstrap:');
console.log($('h1').modal);

// import { Negociacao } from './domain/index.js';
// const negociacao = new Negociacao(new Date(), 1, 200);
// const headers = new Headers();
// headers.set('Content-Type', 'application/json');
// const method = 'POST';
// const body = JSON.stringify(negociacao);
// const config = {
//     method,
//     headers,
//     body
// };
// fetch('http://localhost:3000/negociacoes', config).then(() => console.log('Dado enviado com sucesso'));


const controller = new NegociacaoController();


// const $ = document.querySelector.bind(document);
// $('.form').addEventListener('submit', controller.adiciona.bind(controller));
// $('#botao-apaga').addEventListener('click', controller.apaga.bind(controller));
// $('#botao-importa').addEventListener('click', controller.importaNegociacoes.bind(controller));

// import { debounce } from './util/index.js';
// $('#botao-importa')
//     .addEventListener('click', debounce(() => {
//         console.log('EXECUTOU	A	OPERAÇÃO	DO	DEBOUNCE');
//         controller.importaNegociacoes();
//     }, 1000));