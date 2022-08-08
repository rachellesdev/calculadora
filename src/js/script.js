const txtAnterior = document.querySelector('#ope-anterior')
const txtAtual = document.querySelector('#ope-atual')
const btn = document.querySelectorAll('#btn-container button')

class Calcular {
    constructor(txtAnterior, txtAtual) {
        this.txtAnterior = txtAnterior
        this.txtAtual = txtAtual
        this.txtDigitando = ""
    }

    // adicionando digito na tela da calculadora
    addDigito(digito) {
        // checar se já foi digitado um ponto '.'
        if (digito === '.' && this.txtAtual.innerText.includes('.')) {
            return;
        }

        this.txtDigitando = digito
        this.updateScreen()
    }

    // fazer operações
    fazerOperacoes(operacao) {

        // checa se o valor atual esta vazio
        if (this.txtAtual.innerText === "" && operacao !== "C") {
            //muda a operacao
            if (this.mudaOperacao.innerText !== "") {
                this.mudaOperacao(operacao)
            }
            return
        }

        // pegar valor atual e anterior
        let operacaoValor
        const anterior = +this.txtAnterior.innerText.split(" ")[0]
        const atual = +this.txtAtual.innerText

        switch (operacao) {
            case "+":
                operacaoValor = anterior + atual
                this.updateScreen(operacaoValor, operacao, atual, anterior)
                break;

            case "-":
                operacaoValor = anterior - atual
                this.updateScreen(operacaoValor, operacao, atual, anterior)
                break;

            case "/":
                operacaoValor = anterior / atual
                this.updateScreen(operacaoValor, operacao, atual, anterior)
                break;
            case "*":
                operacaoValor = anterior * atual
                this.updateScreen(operacaoValor, operacao, atual, anterior)
                break;
            case "DEL":
                this.deletaOperacao();
                break;
            case "CE":
                this.limpaOperacaoAtual();
                break;
            case "C":
                this.limpaOperacaoTodas();
                break;
            case "=":
                this.btnIgual();
                break;
            default:
                return;
        }

    }

    // mudar valores na tela
    updateScreen(
        operacaoValor = null,
        operacao = null,
        atual = null,
        anterior = null
    ) {
        if (operacaoValor === null) {
            this.txtAtual.innerText += this.txtDigitando
        } else {
            // se o valor for 0, adicionar valor atual
            if (anterior === 0) {
                operacaoValor = atual
            }

            // add valor atual ao anterior
            this.txtAnterior.innerText = `${operacaoValor} ${operacao}`
            this.txtAtual.innerText = ""
        }
    }

    mudaOperacao(operacao) {

        const operacoes = ["+", "-", "/", "*"]

        if (!operacoes.includes(operacao)) {
            return
        }

        this.txtAnterior.innerText = this.txtAnterior.innerText.slice(0, -1) + operacao
    }

    deletaOperacao(){
        this.txtAtual.innerText = this.txtAtual.innerText.slice(0, -1)
    }

    limpaOperacaoAtual(){
        this.txtAtual.innerText = ""
    }

    limpaOperacaoTodas(){
        this.txtAnterior.innerText = ""
        this.txtAtual.innerText = ""
    }

    btnIgual(){
        let operacao = this.txtAnterior.innerText.split(" ")[1]
        this.fazerOperacoes(operacao)
    }



}

const calc = new Calcular(txtAnterior, txtAtual)

btn.forEach((b) => {
    b.addEventListener('click', (e) => {
        const valor = e.target.innerText

        if (+valor >= 0 || valor === '.') {
            calc.addDigito(valor);
        } else {
            calc.fazerOperacoes(valor);
        }
    })
})