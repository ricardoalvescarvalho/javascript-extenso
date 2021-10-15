/*
Escreve o valor (unidades monetárias) por extenso em pt-br.

Para para outras unidades, ajustar variáveis de instância
(inteiro, inteiros, centavo, centavos) em run-time.

Autor:  Ricardo Alves Carvalho
        ricardo.alves.carvalho@gmail.com

Obs.:   Começa a apresentar problemas de precisão 
        numérica nos centavos a partir de 70 trilhões.
*/

/* função de exemplo */
function extenso(valor) {
    var e = new Extenso;
    var p = document.getElementById('p-ext');
    p.innerHTML = e.extenso(valor);
}

class Extenso {
    inteiro  = 'real';
    inteiros = 'reais';
    centavo  = 'centavo';
    centavos = 'centavos';

    unidade(n) {
        var u = Math.trunc(n);
        u = u % 10;
        switch (u) {
            case 0: 
                return '';
            case 1:
                return 'um';
            case 2:
                return 'dois';
            case 3:
                return 'três';
            case 4:
                return 'quatro';
            case 5:
                return 'cinco';
            case 6:
                return 'seis';
            case 7:
                return 'sete';
            case 8:
                return 'oito';
            case 9:        
                return 'nove';
        } 
    }

    dezena(n) {
        var d = Math.trunc(n % 100 / 10);
        switch (d) {
            case 0: 
                return this.unidade(n);
            case 1:
                var u = n % 10;
                switch (u) {
                    case 0:
                        return 'dez';
                    case 1:
                        return 'onze';
                    case 2:
                        return 'doze';
                    case 3:
                        return 'treze';
                    case 4:
                        return 'quatorze';
                    case 5:
                        return 'quinze';
                    case 6:
                        return 'dezesseis';
                    case 7:
                        return 'dezessete';
                    case 8:
                        return 'dezoito';
                    case 9:
                        return 'dezenove';
                }
            case 2:
                return 'vinte' + this.concat(this.unidade(n));
            case 3:
                return 'trinta' + this.concat(this.unidade(n));
            case 4:
                return 'quarenta' + this.concat(this.unidade(n));
            case 5:
                return 'cinquenta' + this.concat(this.unidade(n));
            case 6:
                return 'sessenta' + this.concat(this.unidade(n));
            case 7:
                return 'setenta' + this.concat(this.unidade(n));
            case 8:
                return 'oitenta' + this.concat(this.unidade(n));
            case 9:        
                return 'noventa' + this.concat(this.unidade(n));
        }       
    }

    concat(s) {
        if (s != '') {
            return ' e ' + s;
        } else {
            return '';
        }
    }

    centena(c) {
        var d = this.dezena(c);
        var n = Math.trunc(c % 1000 / 100);
        switch (n) {
            case 0:
                return d;
            case 1:
                if (d == '') {
                    return 'cem';
                } else {
                    return 'cento' + this.concat(d);
                }
            case 2:
                return 'duzentos' + this.concat(d);
            case 3:
                return 'trezentos' + this.concat(d);
            case 4:
                return 'quatrocentos' + this.concat(d);
            case 5:
                return 'quinhentos' + this.concat(d);
            case 6:
                return 'seiscentos' + this.concat(d);
            case 7:
                return 'setecentos' + this.concat(d);
            case 8:
                return 'oitocentos' + this.concat(d);
            case 9:
                return 'novecentos' + this.concat(d);
        }
    }

    milhar(n) {
        var m = Math.trunc(n / 1000) % 1000;
        var c = this.centena(n);
        var sep;
        if (c == '') {
            sep = '';
        } else if (c.indexOf(' e ') == -1) {
            sep = ' e ';
        } else {
            sep = ', ';
        }
        return ((m != 0) ? this.centena(m) + ' mil' : '') + ((m != '') ? sep : '') + c;
    }

    milhao(n) {
        var m = Math.trunc(n / 1000000) % 1000;
        var x = this.milhar(n);
        var sep;
        if (m == 0) {
            sep = '';
        } else if (x == '') {
            sep = ' de'
        } else {
            sep = (x.indexOf(' e ') == -1) ? ' e ' : ', ';
        }
        var aux;
        if (m == 0) {
            aux = '';
        } else if (m == 1) {
            aux = ' milhão';
        } else {
            aux = ' milhões';
        }
        return this.milhar(m) + aux + sep + x;        
    }

    bilhao(n) {
        var b = Math.trunc(n / 1000000000) % 1000;
        var m = this.milhao(n);
        var sep;
        if (b == 0) {
            sep = '';
        } else if (m == '') {
            sep = ' de'
        } else {
            sep = (m.indexOf(' e ') == -1) ? ' e ' : ', ';
        }
        var aux;
        if (b == 0) {
            aux = '';
        } else if (b == 1) {
            aux = ' bilhão';
        } else {
            aux = ' bilhões';
        }
        return this.milhar(b) + aux + sep + m;        
    }

    trilhao(n) {
        var t = Math.trunc(n / 1000000000000) % 1000;
        var b = this.bilhao(n);
        var sep;
        if (t == 0) {
            sep = '';
        } else if (b == '') {
            sep = ' de'
        } else {
            sep = (b.indexOf(' e ') == -1) ? ' e ' : ', ';
        }
        var aux;
        if (t == 0) {
            aux = '';
        } else if (t == 1) {
            aux = ' trilhão';
        } else {
            aux = ' trilhões';
        }
        return this.milhar(t) + aux + sep + b;        
    }

    quatrilhao(n) {
        var q = Math.trunc(n / 1000000000000000) % 1000;
        var t = this.trilhao(n);
        var sep;
        if (q == 0) {
            sep = '';
        } else if (t == '') {
            sep = ' de'
        } else {
            sep = (t.indexOf(' e ') == -1) ? ' e ' : ', ';
        }
        var aux;
        if (q == 0) {
            aux = '';
        } else if (q == 1) {
            aux = ' quatrilhão';
        } else {
            aux = ' quatrilhões';
        }
        return this.milhar(q) + aux + sep + t;        
    }

    extenso(n) {
        var i = Math.trunc(n);
        var result = this.quatrilhao(i); //capacidade máxima

        if (i == 0) {
            result = '';
        } else if (i == 1) {
            result += ' ' + this.inteiro;
        } else {
            result += ' ' + this.inteiros;
        }

        var c = Math.round(100.00 * (n - i)); //precisão duas decimais
        var aux = this.dezena(c);
        if (c == 0) {
            aux = '';
        } else if (c == 1) {
            aux += ' ' + this.centavo;
        } else {
            aux += ' ' + this.centavos;
        }

        if (result != '' && aux != '') {
            result += ' e ' + aux;
        } else {
            result += aux;
        }

        return result;
    }
}
