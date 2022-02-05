import React from 'react';

export const Tube = ({ data }) => {
  return (
    <div>
      {data.map(({ label_id, shipping_tracking_code }, index) => {
        return (
          <div key={index}>
            <div>
              <p>Label ID: {label_id}</p>
            </div>
            <div>
              <p>Shipping Tracking Code: {shipping_tracking_code}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
