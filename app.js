// DOM Elements
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const valueEl = document.querySelector('.value');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

const additionEl = document.querySelector('.addition');
const substractionEl = document.querySelector('.substraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');

const decimalEl = document.querySelector('.decimal');
const number0El = document.querySelector('.number-0');

const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
const numberElArray = [
  number0El,number1El, number2El, number3El, number4El,
  number5El,number6El, number7El, number8El, number9El
];

// variables
let valueStrInMemory = false;
let operatorInMemory = false;

// functions
const getValueAsStr = () =>  valueEl.textContent.split(',').join('');


const getValueAsNum = () => {
  return parseFloat(getValueAsStr());
};

const setValueAsStr = (valueStr) => {
  if (valueStr[valueStr.length - 1] === '.') {
    valueEl.textContent += '.';
    return;
  }

  const [wholeNumStr, decimalStr] = valueStr.split('.');
  // console.log(wholeNumber, decimalStr);
  if (decimalStr) {
    valueEl.textContent = 
      parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
  } else {
    valueEl.textContent = parseFloat(wholeNumStr).toLocaleString(); 
  }
  // valueEl.textContent = parseFloat(valueStr).toLocaleString();
};

const handleNumberClick = (num) => {
  console.log(num);
  const currentValueStr = getValueAsStr();
  if (currentValueStr === '0') {
    setValueAsStr(num); 
  } else {
    setValueAsStr(currentValueStr + num); 
  }
};

const handleOpertorClick = (operation) => {
  const currentValueStr = getValueAsStr();
  const currentValueNum = getValueAsNum();
  //const valueStrInMemory = getValueStr();

  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setValueAsStr('0');
    return;
  }

  const valueNumInMemory = parseFloat(valueStrInMemory)
  let newValueNum;
  if (operatorInMemory === 'addition' ) {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === 'substraction' ) {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === 'multiplication' ) {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === 'division' ) {
    newValueNum = valueNumInMemory / currentValueNum;
  }
  
  valueStrInMemory = newValueNum.toString();
  operatorInMemory = operation;
  setValueAsStr('0');
};

// Add Event Listeners to functions
acEl.addEventListener('click',  () => {
  setValueAsStr('0');
});

pmEl.addEventListener('click',  () => {
  const currentValueNum = getValueAsNum();
  const currentValueStr = getValueAsStr();
  if (currentValueStr === '-0'){
    setStrAsValue('0');
    return;
  }
  if (currentValueStr >= 0){
      console.log('-' + currentValueStr);
    setValueAsStr('-' +  currentValueStr);
  } else {
    setValueAsStr(currentValueStr.substring('1'));
  }
});

percentEl.addEventListener('click',  () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setValueAsStr(newValueNum.toString()); 
});


// add event listeners to operators
// additionEl.addEventListener('click', () => {
//   handleOpertorClick('addition');
// });

substractionEl.addEventListener('click', () => {
  handleOpertorClick('substraction');
});

multiplicationEl.addEventListener('click', () => {
  handleOpertorClick('multiplication');
});

divisionEl.addEventListener('click', () => {
  handleOpertorClick('division');
});

equalEl.addEventListener('click', () => {
});


// Add event listeners to numbers and decimals
for (let i = 0; i < numberElArray.length; i++) {
  const numberEl = numberElArray[i];
  numberEl.addEventListener("click", () => {
    handleNumberClick(i.toString());
  });
}

decimalEl.addEventListener("click", () => {
  //console.log('Decimal'); 
  const currentValueStr = getValueAsStr ();
  if (!currentValueStr.includes('.')){
  valueEl.textContent = currentValueStr +'.'; 
  }
});

// set up the time
const updateTime = () => {  
  const currentTime = new Date();
    
  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  if (currentHour > 12) {
    currentHour -= 12;
  }
    
  hourEl.textContent = currentHour.toString();
  minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime, 1000);
updateTime();