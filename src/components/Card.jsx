import React from "react";

const Card = ({ name, flag }) => {
  return (
    <div className="card">
      <img src={flag} alt={`${name} flag`} />
      <h2>{name}</h2>
    </div>
  );
};

export default Card;
