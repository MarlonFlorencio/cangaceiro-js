export class ProxyFactory {
    static create(objeto, props, armadilha) {

        return new Proxy(objeto, {
            get(target, prop, receiver) {
                //	usa	o	array	props	para	realizar	o	includes
                if (typeof (target[prop]) == typeof (Function) && props.includes(prop)) {
                    return function () {
                        target[prop].apply(target, arguments);
                        //	executa	a	armadilha	que	recebe	
                        //	o	objeto	original
                        armadilha(target);
                    }
                } else {
                    return target[prop];
                }
            },

            set(target,	prop,	value,	receiver)	{
                const	updated	=	Reflect.set(target,	prop, value);
                //	SÓ	EXECUTAMOS	A	ARMADILHA	
                //	SE	FIZER	PARTE	DA	LISTA	DE	PROPS
                if(props.includes(prop)) {
                    armadilha(target);
                }

                return	updated;
            }

        });
    }
}