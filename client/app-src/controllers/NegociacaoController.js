import { Negociacoes, NegociacaoService, Negociacao } from '../domain/index.js';
import { NegociacoesView, MensagemView, Mensagem, DateConverter } from '../ui/index.js';
import { getNegociacaoDao, Bind, getExceptionMessage, debounce, controller, bindEvent } from '../util/index.js';

@controller('#data', '#quantidade', '#valor')
export class NegociacaoController {

    constructor(_inputData, _inputQuantidade, _inputValor) {
        //	UMA	ÚNICA	INSTRUÇÃO
        Object.assign(this, { _inputData, _inputQuantidade, _inputValor })

        //const $ = document.querySelector.bind(document);

        this._service = new NegociacaoService();

        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),
            'adiciona', 'esvazia'
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView('#mensagemView'),
            'texto'
        );

        this._init();
    }

    async _init() {
        try {
            const dao = await getNegociacaoDao();
            const negociacoes = await dao.listaTodos();
            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
        } catch (err) {
            this._mensagem.texto = getExceptionMessage(err);
        }
    }

    @bindEvent('submit','.form')
    @debounce()
    async adiciona(event) {
        try {
            event.preventDefault();
            const negociacao = this._criaNegociacao();
            const dao = await getNegociacaoDao();
            await dao.adiciona(negociacao);
            this._negociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociação adicionada com sucesso';
            this._limpaFormulario();
        } catch (err) {
            this._mensagem.texto = getExceptionMessage(err);
        }
    }

    @bindEvent('click',	'#botao-apaga')
    async apaga() {
        try {
            const dao = await getNegociacaoDao();
            await dao.apagaTodos();
            this._negociacoes.esvazia();
            this._mensagem.texto = 'Negociações apagadas com sucesso';
        } catch (err) {
            this._mensagem.texto = getExceptionMessage(err);
        }
    }

    //importaNegociacoes() {

    /*
    const negociacoes = [];
    this._service.obterNegociacoesDaSemana()
    
    .then(semana => {
        negociacoes.push(...semana);
        return this._service.obtemNegociacoesDaSemanaAnterior();
    })
    
    .then(anterior => {
        negociacoes.push(...anterior);
        return this._service.obtemNegociacoesDaSemanaRetrasada();
    })

    .then(retrasada => {
        negociacoes.push(...retrasada);
        negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações importadas com sucesso';
    })

    .catch(err => this._mensagem.texto = err);
    */

    /*
    this._service.obtemNegociacoesDoPeriodo()
        .then(negociacoes => {
            negociacoes.filter(novaNegociacao =>
                !this._negociacoes.toArray().some(negociacaoExistente =>
                    novaNegociacao.equals(negociacaoExistente)))
                .forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações	do	período	importadas	com	sucesso';
        })
        .catch(err => this._mensagem.texto = err);
    */

    //}

    @bindEvent('click',	'#botao-importa')
    @debounce(1500)
    async importaNegociacoes() {
        try {
            const negociacoes = await this._service.obtemNegociacoesDoPeriodo();
            console.log(negociacoes);
            negociacoes.filter(novaNegociacao =>
                !this._negociacoes.toArray().some(negociacaoExistente =>
                    novaNegociacao.equals(negociacaoExistente)))
                .forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações	do	período	importadas com	sucesso';
        } catch (err) {
            this._mensagem.texto = getExceptionMessage(err);
        }
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 1.0
        this._inputData.focus();
    }

    _criaNegociacao() {
        return new Negociacao(
            DateConverter.toDate(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

}