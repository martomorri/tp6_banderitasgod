import React from 'react';

function Counter(props) {
    return (
        <div className='points'>
          <p className='h1'>Time: {props.timer}</p>
          <p className='h1 '>Points: {props.points}</p>
        </div>
    );
}

export default Counter;