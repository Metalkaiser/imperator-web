<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SellRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, mixed>
   */
  public function rules()
  {
    return [
      'date' => 'required',
      'products' => 'required',
      'models' => 'required',
      'sizes' => 'required',
      'quantities' => 'required',
      'amount' => 'required|numeric',
    ];
  }

    /**
 * Get the error messages for the defined validation rules.
 *
 * @return array
 */
public function messages()
{
    return [
        'date.required' => 'La fecha es requerida',
        'products.required' => 'Los productos son requeridos',
        'models.required' => 'Los modelos de los productos son obligatorios',
        'sizes.required' => 'Se requieren las tallas vendidas',
        'quantities.required' => 'Se requieren las cantidades vendidas',
        'amount.required' => 'Se requiere el monto total de la venta',
        'amount.numeric' => 'El monto total de la venta debe ser un valor numérico'
    ];
}

  protected function failedAuthorization()
  {
    throw new AuthorizationException('Usuario no autorizado');
  }
}
