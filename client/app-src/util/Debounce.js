export function debounce(fn, milissegundos) {
    let timer = 0;
    return () => {
        //	para	o	último	timer	definido
        clearTimeout(timer);
        //	a	variável	timer	ganha	o	ID	de	um	novo	temporizador	
        //	afeta	a	variável	no	escopo	da	função	debounce
        timer = setTimeout(() => fn(), milissegundos);
    }
}