import "../css/set.css"
import React from "react";


const Set = ({ set, onOpen, isCentered, openedCards}) => { 
    return (
      <div className={`set ${isCentered ? 'centered' : ''}`} 
      onClick={() => onOpen(set.id)}>
        <img src={set.images.logo} alt={set.name} />
        <p> x/{set.total} </p>
      </div>
    );
};

export default Set

