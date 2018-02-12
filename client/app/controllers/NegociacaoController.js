System.register(['../domain/index.js', '../ui/index.js', '../util/index.js'], function (_export, _context) {
    "use strict";

    var Negociacoes, NegociacaoService, Negociacao, NegociacoesView, MensagemView, Mensagem, DateConverter, getNegociacaoDao, Bind, getExceptionMessage;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    return {
        setters: [function (_domainIndexJs) {
            Negociacoes = _domainIndexJs.Negociacoes;
            NegociacaoService = _domainIndexJs.NegociacaoService;
            Negociacao = _domainIndexJs.Negociacao;
        }, function (_uiIndexJs) {
            NegociacoesView = _uiIndexJs.NegociacoesView;
            MensagemView = _uiIndexJs.MensagemView;
            Mensagem = _uiIndexJs.Mensagem;
            DateConverter = _uiIndexJs.DateConverter;
        }, function (_utilIndexJs) {
            getNegociacaoDao = _utilIndexJs.getNegociacaoDao;
            Bind = _utilIndexJs.Bind;
            getExceptionMessage = _utilIndexJs.getExceptionMessage;
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
                    var _this = this;

                    return _asyncToGenerator(function* () {
                        try {
                            const dao = yield getNegociacaoDao();
                            const negociacoes = yield dao.listaTodos();
                            negociacoes.forEach(function (negociacao) {
                                return _this._negociacoes.adiciona(negociacao);
                            });
                        } catch (err) {
                            _this._mensagem.texto = getExceptionMessage(err);
                        }
                    })();
                }

                adiciona(event) {
                    var _this2 = this;

                    return _asyncToGenerator(function* () {
                        try {
                            event.preventDefault();
                            const negociacao = _this2._criaNegociacao();
                            const dao = yield getNegociacaoDao();
                            yield dao.adiciona(negociacao);
                            _this2._negociacoes.adiciona(negociacao);
                            _this2._mensagem.texto = 'Negociação adicionada com sucesso';
                            _this2._limpaFormulario();
                        } catch (err) {
                            _this2._mensagem.texto = getExceptionMessage(err);
                        }
                    })();
                }

                apaga() {
                    var _this3 = this;

                    return _asyncToGenerator(function* () {
                        try {
                            const dao = yield getNegociacaoDao();
                            yield dao.apagaTodos();
                            _this3._negociacoes.esvazia();
                            _this3._mensagem.texto = 'Negociações apagadas com sucesso';
                        } catch (err) {
                            _this3._mensagem.texto = getExceptionMessage(err);
                        }
                    })();
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

                importaNegociacoes() {
                    var _this4 = this;

                    return _asyncToGenerator(function* () {
                        try {
                            const negociacoes = yield _this4._service.obtemNegociacoesDoPeriodo();
                            console.log(negociacoes);
                            negociacoes.filter(function (novaNegociacao) {
                                return !_this4._negociacoes.toArray().some(function (negociacaoExistente) {
                                    return novaNegociacao.equals(negociacaoExistente);
                                });
                            }).forEach(function (negociacao) {
                                return _this4._negociacoes.adiciona(negociacao);
                            });
                            _this4._mensagem.texto = 'Negociações	do	período	importadas com	sucesso';
                        } catch (err) {
                            _this4._mensagem.texto = getExceptionMessage(err);
                        }
                    })();
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