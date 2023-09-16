let runningTotal = 0;
let buffer = '0';
let prevOperator;
let cache = [];

const screen = document.querySelector('.screen');

let buttonClick = (val) => {
  if (isNaN(val)) {
    handleSymbol(val);
  } else {
    handleNumber(val);
  }
  screen.innerText = buffer;
};

let handleSymbol = (symbol) => {
  switch (symbol){
    case 'C':
      buffer = '0';
      runningTotal = 0;
      break;
    case '=':
      if (prevOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      prevOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case '←':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case '−':
    case '×':
    case '÷':
    case '+':
      handleMath(symbol);
      break;
  }
};

let handleMath = (symbol) => {
  if(buffer === '0') {
    return;
  }

  const intBuffer = parseInt(buffer);

  if(runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  prevOperator = symbol;
  buffer = '0';
};

let flushOperation = (intBuffer) => {
  // if (prevOperator === '+') {
  //   runningTotal += intBuffer;
  // } else if (prevOperator === '-') {
  //   runningTotal -= intBuffer;
  // } else if (prevOperator === '÷') {
  //   runningTotal /= intBuffer;
  // } else if (prevOperator === '×') {
  //   runningTotal *= intBuffer;
  // }
  switch (prevOperator) {
    case '−':
      runningTotal -= intBuffer;
      break;
    case '×':
      runningTotal *= intBuffer;
      break;
    case '÷':
      runningTotal /= intBuffer;
      break;
    case '+':
      runningTotal += intBuffer;
      break;
  }
};

let handleNumber = (numString) => {
  if (buffer === '0') {
    buffer = numString;
  } else {
    buffer += numString;
  }
};

let init = () => {
  document.querySelector('.calc-buttons').addEventListener('click', (event) => {
    buttonClick(event.target.innerText);
  });
};

init();