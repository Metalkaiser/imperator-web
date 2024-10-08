<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Auth\Access\AuthorizationException;

class UpdateRequest extends FormRequest
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
      'name' => 'required|max:255',
      'price' => 'required|numeric',
      'file' => 'mimes:jpg'
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
      'name.required' => 'El nombre del producto es obligatorio',
      'price.required' => 'El precio del producto es obligatorio',
      'price.numeric' => 'El precio del producto debe ser un valor numérico',
      'file.mimes' => 'El archivo debe ser una imagen jpg',
    ];
  }

  protected function failedAuthorization()
  {
    throw new AuthorizationException('Usuario no autorizado');
  }
}
