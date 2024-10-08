import React, { useState } from "react";
import SizeBuy from "./buy/SizeBuy";

export default function Model(props){

  //Create a SizeBuy component for each size
  let sizes = [];
  props.sizes.forEach((size, index) => {
    sizes.push(<SizeBuy 
      key={size + "_" + index}
      productn={props.productn}
      modeln={props.model}
      size={size} 
      sizen={index} />)
  });
  
  const [sizesComponents] = useState(sizes); //initiate a state hook for size components

  return(
    <div className="mt-3 p-3 rounded border">
      <h5>{props.model.name}</h5>
      <div className="mt-2">
        <div className="row text-center">
        <input type="checkbox" value={props.model.id} name="model[]" id={'model_' + props.model.id} style={{opacity:'0'}}/>
          {sizesComponents}
        </div>
      </div>
    </div>
  );
}