System.register(['./ApplicationException.js'], function (_export, _context) {
    "use strict";

    var ApplicationException;
    function obrigatorio(parametro) {
        throw new ApplicationException(`${parametro} é um parâmetro obrigatório`);
    }

    _export('obrigatorio', obrigatorio);

    return {
        setters: [function (_ApplicationExceptionJs) {
            ApplicationException = _ApplicationExceptionJs.ApplicationException;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=Obrigatorio.js.map