import {  useState, useEffect } from 'react';

import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const { 
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    valueChangehandler:  nameChangeHandler, 
    inputBlurHandler: nameBlurHandler,
    reset: resetNsmeInput,
  } = useInput(value => value.trim() !== '');

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enterdEmailIsTouched, setEnteredEmailIsTouched] = useState(false);

  const enteredEmailIsValid = enteredEmail.includes("@");
  const enteredEmailIsInvalid = !enteredEmailIsValid && enterdEmailIsTouched;

  // this code is more slim and its paformance is better than using "useEffect"
  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  } 

  const emialInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  }

  const emailInputBlurHandler = (event) => {
    setEnteredEmailIsTouched(true);
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if(!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    // nameInputRef.current.value = '';  => This is NOT ideal, DO NOT manipulate the DOM...
    
    resetNsmeInput();

    setEnteredEmail('');
    setEnteredEmailIsTouched(false); 
    }
    // user ref : we should not change DOM directly... like this vanila javascript
    // nameInputRef.current.value = '';

    /*
    useState : if you need value after every keystroke, using state is better. And if you want to reset entered input, when you want to update entered value...
    useRef : if you need value only once, when the form is submitted, ref might be better
     */

  const nameInputClasses = nameInputHasError
    ? 'form-control' 
    : 'form-control invalid';

  const emailInputClasses = enteredEmailIsInvalid 
    ? "form-control invalid" 
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text' id='name' 
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError &&<p className='error-text'>Name must not be empty!</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input 
          type='email' id='email' 
          onChange={emialInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {enteredEmailIsInvalid && (
          <p className='error-text'>Please enter s valid Email.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;