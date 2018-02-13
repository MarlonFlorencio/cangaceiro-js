System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            let Negociacoes = class Negociacoes {

                constructor() {
                    this._negociacoes = [];
                    Object.freeze(this);
                }

                adiciona(negociacao) {
                    this._negociacoes.push(negociacao);
                }

                esvazia() {
                    this._negociacoes.length = 0;
                }

                toArray() {
                    return [].concat(this._negociacoes);
                }

                get volumeTotal() {
                    return this._negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0);
                }
            };

            _export("Negociacoes", Negociacoes);
        }
    };
});
//# sourceMappingURL=Negociacoes.js.map