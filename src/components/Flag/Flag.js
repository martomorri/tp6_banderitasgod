import React from 'react';
import { string } from 'prop-types';

function Flag(props) {
    return (
        <>
        <img className='flag-cont' src={props.flag} alt='flag' />
        <h1 className='text-white fw-bold'>{props.clues}</h1>
        <br></br>
        </>
    );
}

Flag.propTypes = {
    flag:string.isRequired,
    clues:string.isRequired
}

export default Flag;