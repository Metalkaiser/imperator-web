import React from "react";
import Model from "./Model";

export default class Products extends React.Component {

  constructor(props){
    super(props);
    let initModelList = [];
    let sizes = [];
    if (props.type === 'ring') {
      sizes = ['7','8','9','10','11','12','13'];
    } else if (props.type === 'collarchain') {
      sizes = ['60cm'];
    } else {
      sizes = ['Único'];
    }
    props.models.models.forEach((model,index) => {
      initModelList.push(
      <Model
      key={model.name + model.id}
      productn={props.productn}
      model={model}
      modeln={index}
      sizes={sizes} />
      );
    });
    
    this.state = {modelList:initModelList};
  }


  render(){
    return(
      <div className='product mb-3 p-2'>
        <div className="product-title m-4 text-center" data-bs-toggle="collapse" data-bs-target={"#product_" + this.props.productn}>
          <img src={ this.props.product.name } alt={ this.props.product.name } />
          <h5>{ this.props.product.name }</h5>
        </div>
        <div className="product-models collapse" id={"product_" + this.props.productn}>
          {this.state.modelList}
        </div>
      </div>
    );
  }
  
}