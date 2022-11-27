import React from "react";
import SizeBuy from "./SizeBuy";

export default class Model extends React.Component{

  constructor(props){
    super(props);
    //Create a SizeBuy component for each size
    props.sizes.p_sizes.forEach((size, index) => {
      this.sizes.push(<SizeBuy 
        key={size + "_" + index}
        productn={props.productn}
        modeln={props.modeln}
        size={size} 
        sizen={index} />)
    });
  }

  sizes = [];

  render(){
    return(
      <div className="mt-3 p-3 rounded border">
        <h5>{this.props.model.name}</h5>
        <div className="mt-2">
          <div className="row text-center">
            <div className="col">
              <button type="button" className="btn btn-outline-info">Nueva</button>
              <div>
              </div>
            </div>
            {this.sizes}
          </div>
        </div>
      </div>
    );
  }
}