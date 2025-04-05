import React from "react";
import "../css/pack.css";

const Pack = ({ set, onOpen, isCentered }) => { 
  return (
    <div 
      className={`pack ${isCentered ? 'centered' : ''}`} 
      onClick={() => onOpen(set.id)}
    >
      <img src={set.images.logo} alt={set.name} />
      <div className="card-info">
        <h2 className="name">{set.name}</h2>
        <p className="release-date">{set.releaseDate}</p>
        <p className="total">Cards: {set.total}</p>
      </div>
    </div>
  );
};

export default Pack;