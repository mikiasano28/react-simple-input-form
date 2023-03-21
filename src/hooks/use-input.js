import { useState } from 'react';


const useInput = (validateValue) => {
  const [entereValue, setEnteredValue] = useState(''); 
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(entereValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangehandler = (event) => {
    setEnteredValue(event.target.value);
  }

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  }

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  }

// These functions which are defined in the hook, can be called from the place where to hook is been used.. So can be called from the components that uses the hook...
  return {
    value: entereValue, 
    isValid: valueIsValid,
    hasError,
    valueChangehandler,
    inputBlurHandler,
    reset,
  };

}


export default useInput;