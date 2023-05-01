import React from "react";
import Model from "./Model";

export default class Products extends React.Component {

  constructor(props){
    super(props);
    let initModelList = [];
    props.models.models.forEach((model,index) => {
      initModelList.push(
      <Model
      key={model.name + model.id}
      productn={props.productn}
      model={model}
      modeln={index}
      sizes={props.sizes.get(model.id)} />
      );
    });
    
    this.state = {modelList:initModelList};
  }


  render(){
    return(
      <div className='product mb-3 p-2'>
        <div className="product-title m-4 text-center" data-bs-toggle="collapse" data-bs-target={"#product_" + this.props.productn}>
          <img src={ this.props.product.product } alt={ this.props.product.product } />
          <h5>{ this.props.product.product }</h5>
        </div>
        <div className="product-models collapse" id={"product_" + this.props.productn}>
          {this.state.modelList}
        </div>
      </div>
    );
  }
  
}