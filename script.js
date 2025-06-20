class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
    this.memory = 0;
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  clearAll() {
    this.clear();
    this.memory = 0;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
    this.currentOperandTextElement.classList.add('result-pop');
    setTimeout(() => {
      this.currentOperandTextElement.classList.remove('result-pop');
    }, 300);
  }

  getDisplayNumber(number) {
    if (number === undefined) return '';
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { 
        maximumFractionDigits: 0 
      });
    }
    
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Button event listeners with animations
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    button.classList.add('button-press');
    setTimeout(() => {
      button.classList.remove('button-press');
    }, 200);
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
    button.classList.add('button-press');
    setTimeout(() => {
      button.classList.remove('button-press');
    }, 200);
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
  equalsButton.classList.add('button-press');
  setTimeout(() => {
    equalsButton.classList.remove('button-press');
  }, 200);
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
  allClearButton.classList.add('button-press');
  setTimeout(() => {
    allClearButton.classList.remove('button-press');
  }, 200);
});

// Double click to clear memory
allClearButton.addEventListener('dblclick', () => {
  calculator.clearAll();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
  deleteButton.classList.add('button-press');
  setTimeout(() => {
    deleteButton.classList.remove('button-press');
  }, 200);
});

// Keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;
  
  if (!isNaN(key) || key === '.') {
    const button = Array.from(numberButtons).find(btn => btn.innerText === key);
    if (button) {
      button.click();
      button.classList.add('button-press');
      setTimeout(() => {
        button.classList.remove('button-press');
      }, 200);
    }
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    let opButton;
    if (key === '*') {
      opButton = Array.from(operationButtons).find(btn => btn.innerText === '×');
    } else if (key === '/') {
      opButton = Array.from(operationButtons).find(btn => btn.innerText === '÷');
    } else {
      opButton = Array.from(operationButtons).find(btn => btn.innerText === key);
    }
    if (opButton) {
      opButton.click();
      opButton.classList.add('button-press');
      setTimeout(() => {
        opButton.classList.remove('button-press');
      }, 200);
    }
  } else if (key === 'Enter' || key === '=') {
    equalsButton.click();
    equalsButton.classList.add('button-press');
    setTimeout(() => {
      equalsButton.classList.remove('button-press');
    }, 200);
  } else if (key === 'Escape') {
    allClearButton.click();
    allClearButton.classList.add('button-press');
    setTimeout(() => {
      allClearButton.classList.remove('button-press');
    }, 200);
  } else if (key === 'Backspace') {
    deleteButton.click();
    deleteButton.classList.add('button-press');
    setTimeout(() => {
      deleteButton.classList.remove('button-press');
    }, 200);
  }
});