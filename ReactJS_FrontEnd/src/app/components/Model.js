import React from "react";
import Swal from "sweetalert2";
import jQuery from "jquery";
import SizeBuy from "./SizeBuy";

export default function Model(props){


  //Create a SizeBuy component for each size
  let sizes = [];
  console.log(props.sizes);
  props.sizes.p_sizes.forEach((size, index) => {
    sizes.push(<SizeBuy 
      key={size + "_" + index}
      productn={props.productn}
      modeln={props.modeln}
      size={size} 
      sizen={index} />)
  });


  const addSize = (e) => {
    Swal.fire({
      title: 'Agregar talla nueva',
      icon: 'question',
      text: '¿Desea agregar una talla nueva a este modelo?',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((res) => {
      if (res.isConfirmed) {
        let indexes = jQuery(e.target).parents().eq(1).children().last().children().eq(0).attr('for');
        let productn = indexes.substring(5,6);
        let modeln = indexes.substring(8,9);
        let sizen = parseInt(indexes.substring(11,12)) + 1;
        indexes = '[' + productn + '][' + modeln + '][' + sizen + ']';
        console.log(jQuery(e.target).parents().eq(1));
        let newSize = "<div class='col form-check'><label class='form-check-label' for='size"
        + indexes + "'><input class='form-control' id='size"
        + indexes + "' name='size"
        + indexes + "' type='text' placeholder='Talla'></label><div class='mt-2'><input type='number' class='form-control' id='quantity"
        + indexes + "' name='quantity"
        + indexes + "' ></div></div>";
        console.log(jQuery('.models'));
        jQuery(e.target).parents().eq(1).append(newSize);
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
          {sizes}
        </div>
      </div>
    </div>
  );
}