import React from 'react';

export const Results = ({ data, handleClick }) => {
  return (
    <div>
      <ul>
        {data.map(({ label_id }, index) => {
          return (
            <li className='results' key={index} onClick={handleClick}>
              {label_id}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
