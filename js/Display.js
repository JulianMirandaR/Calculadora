class Display {
    constructor(displayValorAnterior, displayValorActual) {
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;
        this.valorActual = '';
        this.valorAnterior = '';
        this.signos = {
            sumar: '+',
            dividir: '÷',
            multiplicar: '×',
            restar: '-',
        }
        this.nuevoNumero = false;
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0, -1);
        this.imprimirValores();
    }

    borrarTodo() {
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.nuevoNumero = false;
        this.imprimirValores();
    }

    computar(tipo) {
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = tipo;

        if (tipo === 'igual') {
            this.valorAnterior = '';
            this.nuevoNumero = true;
        } else {
            this.valorAnterior = this.valorActual || this.valorAnterior;
            this.valorActual = '';
            this.nuevoNumero = false;
        }
        this.imprimirValores();
    }

    agregarNumero(numero) {
        if (numero === '.' && this.valorActual.includes('.')) return

        if (this.nuevoNumero) {
            this.valorActual = numero.toString();
            this.nuevoNumero = false;
        } else {
            this.valorActual = this.valorActual.toString() + numero.toString();
        }
        this.imprimirValores();
    }

    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

    calcular() {
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if (isNaN(valorActual) || isNaN(valorAnterior)) return
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual);
    }
}