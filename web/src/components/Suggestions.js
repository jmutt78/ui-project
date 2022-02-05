import React from 'react';

export const Suggestions = ({ data, handleClick }) => {
  return (
    <div>
      <ul>
        {data.map(({ label_id }, index) => {
          return (
            <li key={index} onClick={handleClick}>
              {label_id}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
