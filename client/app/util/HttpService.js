System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            let HttpService = class HttpService {

                _handleErrors(res) {
                    //	se	não	estiver	ok,	lança	a	exceção
                    if (!res.ok) throw new Error(res.statusText);
                    return res;
                }

                get(url) {
                    return fetch(url).then(res => this._handleErrors(res)).then(res => res.json());
                }

                /*
                get(url) {
                    return new Promise((resolve, reject) => {
                        const xhr = new XMLHttpRequest();
                        xhr.open('GET', url);
                        xhr.onreadystatechange = () => {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    //	PASSOU	O	RESULTADO	PARA	RESOLVE
                                    //	JÁ	PARSEADO!
                                    resolve(JSON.parse(xhr.responseText));
                                } else {
                                    console.log(xhr.responseText);
                                    //	PASSOU	O	ERRO	PARA	REJECT
                                    reject(xhr.responseText);
                                }
                            }
                        };
                        xhr.send();
                    });
                }
                */
            };

            _export("HttpService", HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map