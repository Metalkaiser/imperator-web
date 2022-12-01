import React from "react";
import Swal from "sweetalert2";
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
      sizes={props.sizes[index]} />
      );
    });
    
    this.state = {modelList:initModelList};
  }

  newModel = (i,e) => {
    let newModelType = {
      modelName:'',
      sizesType:'',
      sizes:[]
    };
    Swal.fire({
      title: '¿Desea agregar un nuevo modelo al producto?',
      icon:'question',
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          title: 'Ingrese los datos del nuevo modelo',
          html: "<div class='mb-3'><label for='newmodel'>Nombre del modelo:</label>"
          + "<input type='text' name='newmodel' id='newmodel' placeholder='Modelo'></div><div>"
          + "<input type='radio' name='tipotalla' id='sizestype1' value='collares'>"
          + "<label for='sizestype1'>Collares (longitud)</label></div>"
          + "<div><input type='radio' name='tipotalla' id='sizestype2' value='anillos'>"
          + "<label for='sizestype2'>Anillos (tallas)</label></div>",
          preConfirm: () => {
              newModelType.modelName = document.getElementById('newmodel').value;
              document.querySelectorAll('[name="tipotalla"]').forEach(input => {
                if (input.checked) {
                  newModelType.sizesType = input.value;
                }
              });
          }
        }).then((resp) => {
          if (resp.isConfirmed) {
            console.log(newModelType);
          }
        })
      }
    });

    /*let newModelList = this.state.modelList;
    newModelList.push(<Model
      key={'modelo' + 3}
      productn={this.props.productn}
      model={'modelo'}
      modeln={3}
      sizes={{id:null, p_sizes:[]}} />
    );
    console.log(this.state.modelList);
    this.setState({
      modelList:[...newModelList]
    });*/
  }

  
  render(){
    return(
      <div className='product mb-3 p-2'>
        <div className="product-title m-4 text-center" data-bs-toggle="collapse" data-bs-target={"#product_" + this.props.productn}>
          <h5>{ this.props.product.product }</h5>
        </div>
        <div className="product-models collapse" id={"product_" + this.props.productn}>
          {this.state.modelList}
          <div className="d-flex flex-row justify-content-around my-5">
            <div><button type="button" className="btn btn-info" onClick={(e) => this.newModel(0,e)}>Agregar modelo</button></div>
            <div><button type="button" className="btn btn-danger">Quitar modelo</button></div>
          </div>
        </div>
      </div>
    );
  }
  
}