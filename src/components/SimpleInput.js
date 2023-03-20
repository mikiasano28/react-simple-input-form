import {  useState, useEffect } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState(''); 
  const [enterdNameIsTouched, setEnterdNameIsTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enterdEmailIsTouched, setEnteredEmailIsTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInValid = !enteredNameIsValid && enterdNameIsTouched;

  const enteredEmailIsValid = enteredEmail.includes("@");
  const enteredEmailIsInvalid = !enteredEmailIsValid && enterdEmailIsTouched;

  // this code is more slim and its paformance is better than using "useEffect"
  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  } 

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  }

  const emialInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  }

  const nameInputBlurHandler = (event) => {
    setEnterdNameIsTouched(true);
  }

  const emailInputBlurHandler = (event) => {
    setEnteredEmailIsTouched(true);
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnterdNameIsTouched(true);
    if(!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    setEnteredName('');
    setEnterdNameIsTouched(true);   // reset as a default

    setEnteredEmail('');
    setEnteredEmailIsTouched(false); 
    }
    // user ref : we should not change DOM directly... like this vanila javascript
    // nameInputRef.current.value = '';

    /*
    useState : if you need value after every keystroke, using state is better. And if you want to reset entered input, when you want to update entered value...
    useRef : if you need value only once, when the form is submitted, ref might be better
     */

  const nameInputClasses = nameInputIsInValid 
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
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {!nameInputIsInValid &&<p className='error-text'>Name must not be empty!</p>}
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