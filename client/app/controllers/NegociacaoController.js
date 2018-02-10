class	NegociacaoController	{

	constructor()	{
        const $ = document.querySelector.bind(document);
        this._inputData	= $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._service = new NegociacaoService();

        
        this._negociacoes =	new	Bind(
            new	Negociacoes(),	
            new	NegociacoesView('#negociacoes'),
            'adiciona', 'esvazia'
        );

        this._mensagem = new	Bind(
            new	Mensagem(),	
            new	MensagemView('#mensagemView'),
            'texto'
        );

    }

    adiciona(event) {
        try {
            event.preventDefault();
            this._negociacoes.adiciona(this._criaNegociacao());
            this._mensagem.texto = 'Negociação adicionada com sucesso';
            this._limpaFormulario();
        } catch (err) {

            console.log(err);
            console.log(err.stack);
            
            if (err instanceof DataInvalidaException) {
                this._mensagem.texto = err.message;
            } else {
                this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte';
            }
        }
    }

    importaNegociacoes() {

        this._service.obterNegociacoesDaSemana((err, negociacoes) => {
            
            if (err) {
                this._mensagem.texto = 'Não	foi	possível	obter	nas	negociações	da	semana';
                return;
            }

            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));

            this._mensagem.texto = 'Negociações	importadas	com	sucesso';
        });
    }

    apaga()	{
        event.preventDefault();
        this._negociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }

    _limpaFormulario()	{
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 1.0
        this._inputData.focus();
    }

    _criaNegociacao()	{
        return	new	Negociacao(
            DateConverter.toDate(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );								
    }

}