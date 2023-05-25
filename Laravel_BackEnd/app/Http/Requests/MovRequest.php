<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MovRequest extends FormRequest
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
      'mov' => 'required|max:255',
      'type' => 'required|boolean',
      'amount' => 'required|numeric'
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
        'date.required' => 'La fecha es obligatoria',
        'mov.required' => 'Se requiere un nombre descriptivo',
        'type.required' => 'Se requiere declarar el tipo de movimiento',
        'type.boolean' => 'El tipo de movimiento solo puede ser Ingreso o Gasto',
        'amount.required' => 'La cantidad del movimiento es obligatoria',
        'amount.numeric' => 'La cantidad del movimiento debe ser un valor numérico',
    ];
}

  protected function failedAuthorization()
  {
    throw new AuthorizationException('Usuario no autorizado');
  }
}
