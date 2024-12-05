const result = document.getElementById("display");

let x = [];
let y = [];
let operator = null;

function appendOperator(operatorMath) {
    if (x.length === 0) return; // Impede operadores sem um número inicial

    if (operator === null) {
        if (operatorMath === '%') {
            // Calcula porcentagem de x
            x = [(parseFloat(x.join('')) / 100).toString()];
            result.innerHTML = x.join('');
        } else {
            operator = operatorMath;
            result.innerHTML = x.join('') + operator;
        }
    } else if (y.length !== 0 && operatorMath === '%') {
        // Calcula porcentagem de y em relação a x
        let porcentagem = (parseFloat(y.join('')) * parseFloat(x.join(''))) / 100;
        y = [porcentagem.toString()];
        result.innerHTML = x.join('') + operator + y.join('');
    } else {
        operator = operatorMath; // Substitui o operador, se já existir
        result.innerHTML = x.join('') + operator;
    }
}

function deleteLast() {
    if (x.length === 0) return; // Nada para apagar

    if (y.length > 0) {
        y.pop();
        result.innerHTML = x.join('') + (operator || '') + y.join('');
    } else if (operator) {
        operator = null;
        result.innerHTML = x.join('');
    } else {
        x.pop();
        result.innerHTML = x.length > 0 ? x.join('') : '0';
    }
}

function appendNumber(number) {
    if (x.length === 0 && number === '0') return; // Impede múltiplos zeros iniciais

    if (number === '.') {
        // Impede múltiplos pontos decimais
        if (operator === null && x.includes('.')) return;
        if (operator !== null && y.includes('.')) return;
    }

    if (operator === null) {
        if(number === '.'){
            x.push('0')
        }
        x.push(number);
        result.innerHTML = x.join('');
    } else {
        y.push(number);
        result.innerHTML = x.join('') + operator + y.join('');
    }
}

function clearDisplay() {
    x = [];
    y = [];
    operator = null;
    result.innerHTML = '0';
}

function calculate() {
    if (x.length === 0 || y.length === 0 || operator === null) return; // Impede cálculos inválidos

    const numX = parseFloat(x.join(''));
    const numY = parseFloat(y.join(''));
    let resultValue;

    switch (operator) {
        case '+':
            resultValue = numX + numY;
            break;
        case '-':
            resultValue = numX - numY;
            break;
        case '*':
            resultValue = numX * numY;
            break;
        case '/':
            if (numY === 0) {
                result.innerHTML = "Erro"; // Divisão por zero
                return;
            }
            resultValue = numX / numY;
            break;
    }

    result.innerHTML = resultValue;
    x = [resultValue.toString()];
    y = [];
    operator = null;
}
