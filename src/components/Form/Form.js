import React from 'react';

function Form(props) {
    return (
        <>
        <form onSubmit={e => props.handleSubmit(e)}>
          <button id="clue" className='btn btn-success' type='button' onClick={props.giveClue}>Clue</button>
          <input className='form-control w-25' type="text" name="ans" placeholder='Country name...'></input>
          <button className='btn btn-primary' type='submit'>Guess</button>
          <button className='btn btn-secondary' type='button' onClick={props.skipCountry}>Skip →</button>
        </form>
        </>
    );
}

export default Form;