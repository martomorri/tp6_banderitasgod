import React from 'react';
import { number } from 'prop-types';

function Counter(props) {
    return (
        <div className='points'>
          <p className='h1'>Time: {props.timer}</p>
          <p className='h1 '>Points: {props.points}</p>
        </div>
    );
}

Counter.propTypes = {
    timer:number.isRequired,
    points:number.isRequired
}

export default Counter;