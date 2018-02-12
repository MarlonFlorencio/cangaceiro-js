System.register([], function (_export, _context) {
    "use strict";

    function debounce(fn, milissegundos) {
        let timer = 0;
        return () => {
            //	para	o	último	timer	definido
            clearTimeout(timer);
            //	a	variável	timer	ganha	o	ID	de	um	novo	temporizador	
            //	afeta	a	variável	no	escopo	da	função	debounce
            timer = setTimeout(() => fn(), milissegundos);
        };
    }

    _export("debounce", debounce);

    return {
        setters: [],
        execute: function () {}
    };
});
//# sourceMappingURL=Debounce.js.map