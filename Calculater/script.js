class Calculator {
    constructor(previousText, currentText) {
        this.previousText = previousText;
        this.currentText = currentText;
        this.clear();
    }

    clear() {
        this.current = '0';
        this.previous = '';
        this.operation = undefined;
    }

    delete() {
        this.current = this.current.toString().slice(0, -1);
        if(this.current === '') this.current = '0';
    }

    appendNumber(number) {
        if(number === '.' && this.current.includes('.')) return;
        if(this.current === '0' && number !== '.') this.current = '';
        this.current = this.current.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.current === '0') return;
        if(this.previous !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previous = this.current;
        this.current = '0';
    }

    calculate() {
        let computation;
        const prev = parseFloat(this.previous);
        const curr = parseFloat(this.current);
        if(isNaN(prev) || isNaN(curr)) return;
        
        switch(this.operation) {
            case '+': computation = prev + curr; break;
            case '-': computation = prev - curr; break;
            case '*': computation = prev * curr; break;
            case '/': computation = prev / curr; break;
            default: return;
        }
        
        this.current = computation;
        this.operation = undefined;
        this.previous = '';
    }

    updateDisplay() {
        this.currentText.innerText = this.current;
        if(this.operation != null) {
            this.previousText.innerText = `${this.previous} ${this.operation}`;
        } else {
            this.previousText.innerText = '';
        }
    }
}

// Get elements
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('[data-action="calculate"]');
const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const decimalButton = document.querySelector('.decimal');
const previousText = document.getElementById('previous');
const currentText = document.getElementById('current');

const calculator = new Calculator(previousText, currentText);

// Event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

decimalButton.addEventListener('click', () => {
    calculator.appendNumber('.');
    calculator.updateDisplay();
});