import React from "react";
import Swal from "sweetalert2";
import Model from "./Model";

export default class NewModel extends React.Component {

  constructor(props){
    super(props);
    let initModelList = [];
    
    this.state = {modelList:initModelList};
  }

  //Fires a SweetAlert2 modal asking if you want to add a new model to the product
  newModel(i,e) {
    Swal.fire({
      title: '¿Desea agregar un nuevo modelo al producto?',
      icon:'question',
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((res) => {
      if (res.isConfirmed) {
        this.addModelQuery(); //Calls addModelQuery function
      }
    });
  }

  //Fires aditional SweetAlert2 modals for creating a new model for the current product
  addModelQuery() {
    let newModelType = {
      modelName:'',
      sizesType:'',
      sizes:{}
    };
    //Fire a SweetAlert2 model asking for the new model name and type
    Swal.fire({
      title: 'Ingrese el nombre del nuevo modelo',
      html: "<div class='mb-3'><label for='newmodel'>Nombre del modelo:</label>"
      + "<input type='text' name='newmodel' id='newmodel' placeholder='Modelo'></div>",
      showCancelButton: true,
      allowOutsideClick: false,
      preConfirm: () => {
        newModelType.modelName = document.getElementById('newmodel').value; //new model name
        if (newModelType.modelName === '') {      //if model name input is empty
          Swal.showValidationMessage('Ingrese un nombre para el modelo nuevo');
        }
      },
    }).then((res) => {
      //if user clicks OK button on input modal
      if (res.isConfirmed) {
        //if product type is collarchain
        if (this.props.product.type === 'collarchain') {
          newModelType.sizes = {p_sizes:['60cm']};  //for collarchains, the only size is 60cm
          this.loadModels(newModelType.modelName,newModelType.sizes);
        }
        //if product type is ring
        else {
          //fires a new SweetAlert modal that asks what sizes are included in the new model
          Swal.fire({
            title: 'Seleccione las tallas',
            html: "<div class='form-check swsizes'><label class='form-check-label' for='6'>6</label>"
            + "<input type='checkbox' class='form-check-input' name='newsizes[]' id='6' value='6'>"
            + "</div><div class='form-check swsizes'><label class='form-check-label' for='7'>7</label>"
            + "<input type='checkbox' class='form-check-input' name='newsizes[]' id='7' value='7'></div>"
            + "<div class='form-check swsizes'><label class='form-check-label' for='8'>8</label>"
            + "<input type='checkbox' class='form-check-input' name='newsizes[]' id='8' value='8'></div>"
            + "<div class='form-check swsizes'><label class='form-check-label' for='9'>9</label>"
            + "<input type='checkbox' class='form-check-input' name='newsizes[]' id='9' value='9'></div>"
            + "<div class='form-check swsizes'><label class='form-check-label' for='10'>10</label>"
            + "<input type='checkbox' class='form-check-input' name='newsizes[]' id='10' value='10'></div>"
            + "<div class='form-check swsizes'><label class='form-check-label' for='11'>11</label>"
            + "<input type='checkbox' class='form-check-input' name='newsizes[]' id='11' value='11'></div>"
            + "<div class='form-check swsizes'><label class='form-check-label' for='12'>12</label>"
            + "<input type='checkbox' class='form-check-input' name='newsizes[]' id='12' value='12'></div>"
            + "<div class='form-check swsizes'><label class='form-check-label' for='13'>13</label>"
            + "<input type='checkbox' class='form-check-input' name='newsizes[]' id='13' value='13'></div>",
            showCancelButton: true,
            allowOutsideClick: false,
            preConfirm: () => {
              //check each checkbox
              let p_sizes = [];
              document.querySelectorAll('[name="newsizes[]"]').forEach(checkbox => {
                //if this checkbox is checked
                if (checkbox.checked) {
                  p_sizes.push(parseInt(checkbox.value));
                }
              });
              newModelType.sizes = {p_sizes:p_sizes}
            }
          }).then((resp) => {
            if (resp.isConfirmed) {
              this.loadModels(newModelType.modelName,newModelType.sizes);
            }
          });
        }
      }
    })
  }

  //Loads sizes for the new model that's being created
  loadModels(name,sizes) {
    let currentModel = this.state.modelList;  //Get the current models state for the current product
    let model = {name:name}
    currentModel.push(<Model
      key={name}
      productn={this.props.productn}
      model={model}
      modeln={currentModel.length}
      sizes={sizes} />);
    this.setState({modelList:[...currentModel]});
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
          </div>
        </div>
      </div>
    );
  }
  
}