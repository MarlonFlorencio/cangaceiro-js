System.register(['../domain/index.js', '../ui/index.js', '../util/index.js'], function (_export, _context) {
    "use strict";

    var Negociacoes, NegociacaoService, Negociacao, NegociacoesView, MensagemView, Mensagem, DataInvalidaException, DateConverter, getNegociacaoDao, Bind;
    return {
        setters: [function (_domainIndexJs) {
            Negociacoes = _domainIndexJs.Negociacoes;
            NegociacaoService = _domainIndexJs.NegociacaoService;
            Negociacao = _domainIndexJs.Negociacao;
        }, function (_uiIndexJs) {
            NegociacoesView = _uiIndexJs.NegociacoesView;
            MensagemView = _uiIndexJs.MensagemView;
            Mensagem = _uiIndexJs.Mensagem;
            DataInvalidaException = _uiIndexJs.DataInvalidaException;
            DateConverter = _uiIndexJs.DateConverter;
        }, function (_utilIndexJs) {
            getNegociacaoDao = _utilIndexJs.getNegociacaoDao;
            Bind = _utilIndexJs.Bind;
        }],
        execute: function () {
            class NegociacaoController {

                constructor() {
                    const $ = document.querySelector.bind(document);
                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');

                    this._service = new NegociacaoService();

                    this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView('#negociacoes'), 'adiciona', 'esvazia');

                    this._mensagem = new Bind(new Mensagem(), new MensagemView('#mensagemView'), 'texto');

                    this._init();
                }

                _init() {
                    getNegociacaoDao().then(dao => dao.listaTodos()).then(negociacoes => negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))).catch(err => this._mensagem.texto = err);
                }

                adiciona(event) {
                    try {
                        event.preventDefault();
                        const negociacao = this._criaNegociacao();
                        getNegociacaoDao().then(dao => dao.adiciona(negociacao)).then(() => {
                            this._negociacoes.adiciona(negociacao);
                            this._mensagem.texto = 'Negociação adicionada com sucesso';
                            this._limpaFormulario();
                        }).catch(err => this._mensagem.texto = err);
                    } catch (err) {
                        //	código	omitido
                    }
                }

                apaga() {

                    event.preventDefault();

                    getNegociacaoDao().then(dao => dao.apagaTodos()).then(() => {
                        this._negociacoes.esvazia();
                        this._mensagem.texto = 'Negociações apagadas com sucesso';
                    }).catch(err => this._mensagem.texto = err);
                }

                importaNegociacoes() {

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

                    this._service.obtemNegociacoesDoPeriodo().then(negociacoes => {
                        negociacoes.filter(novaNegociacao => !this._negociacoes.toArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente))).forEach(negociacao => this._negociacoes.adiciona(negociacao));
                        this._mensagem.texto = 'Negociações	do	período	importadas	com	sucesso';
                    }).catch(err => this._mensagem.texto = err);
                }

                _limpaFormulario() {
                    this._inputData.value = '';
                    this._inputQuantidade.value = 1;
                    this._inputValor.value = 1.0;
                    this._inputData.focus();
                }

                _criaNegociacao() {
                    return new Negociacao(DateConverter.toDate(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                }

            }

            _export('NegociacaoController', NegociacaoController);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map