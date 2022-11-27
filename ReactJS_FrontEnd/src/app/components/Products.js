import React from "react";
import Model from "./Model";

export default class Products extends React.Component {

  constructor(props){
    super(props);
    let modelList = [];
    props.models.models.forEach((model,index) => {
      modelList.push(
      <Model
      key={model.name + model.id}
      productn={props.productn}
      model={model}
      modeln={index}
      sizes={props.sizes[index]} />
      );
    });
    
    this.modelList = modelList;
  }

  modelList = [];
  
  render(){
    return(
      <div className='product mb-3 p-2'>
        <div className="m-4 text-center">
          <h5>{ this.props.product.product }</h5>
        </div>
        <div className="product-models" id='models'>
          {this.modelList}
          <div className="d-flex flex-row justify-content-around my-5">
            <div><button type="button" className="btn btn-info" onClick={(e) => this.newModel(0,e)}>Agregar modelo</button></div>
            <div><button type="button" className="btn btn-danger">Quitar modelo</button></div>
          </div>
        </div>
      </div>
    );
  }
  
}