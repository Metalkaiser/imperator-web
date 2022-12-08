import React, { useState } from "react";
import Swal from "sweetalert2";
import SizeBuy from "./SizeBuy";

export default function Model(props){

  //Create a SizeBuy component for each size
  let sizes = [];
  props.sizes.p_sizes.forEach((size, index) => {
    sizes.push(<SizeBuy 
      key={size + "_" + index}
      productn={props.productn}
      modeln={props.modeln}
      size={size} 
      sizen={index} />)
  });

  const [sizesList,addNewSize] = useState(props.sizes.p_sizes); //initiate a state hook for sizes
  const [sizesComponents,addNewSizeComp] = useState(sizes); //initiate a state hook for size components

  //function called when hit the button to add a new size
  const addSize = (e) => {
    //fires a SweetAlert2 modal asking if user is sure about adding a new size to the current model
    Swal.fire({
      title: 'Agregar talla nueva',
      icon: 'question',
      text: '¿Desea agregar una talla nueva a este modelo?',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(res => {
      //if user confirms new size
      if (res.isConfirmed) {
        let swNewSize = null; //the new size
        //fires a SweetAlert2 modal asking for the value of the new size
        Swal.fire({
          title: 'Ingrese la talla nueva',
          html: "<input type='text' id='swnewsize' placeholder='Talla nueva'>",
          showCancelButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          preConfirm: () => {
            swNewSize = parseInt(document.getElementById('swnewsize').value);   //getting the new size value
          }
        }).then(resp => {
          if (resp.isConfirmed) {
            //if new size doesn't already exists on the current model
            if (!sizesList.includes(swNewSize)) {
              addNewSize(sizesList.concat(swNewSize));
              addNewSizeComp(sizesComponents.concat(<SizeBuy 
                key={swNewSize + "_" + sizesList.length}
                productn={props.productn}
                modeln={props.modeln}
                size={swNewSize} 
                sizen={sizesList.length} />));
            }
            //if new size already exists on the current model
            else {
              Swal.fire({
                title: 'La talla ' + swNewSize + ' ya existe en este modelo',
                icon: 'error'
              });
            }
          }
        })
      }
    });
  }

  return(
    <div className="mt-3 p-3 rounded border">
      <h5>{props.model.name}</h5>
      <div className="mt-2">
        <div className="row text-center">
          <div className="col">
            <button type="button" className="btn btn-outline-info" onClick={(e) => addSize(e)}>Nueva</button>
            <div>
            </div>
          </div>
          {sizesComponents}
        </div>
      </div>
    </div>
  );
}