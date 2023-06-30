import React from 'react';

function Flag(props) {
    return (
        <>
        <img className='flag-cont' src={props.flag} alt='flag' />
        <h1 className='text-white fw-bold'>{props.clues}</h1>
        <br></br>
        </>
    );
}

export default Flag;