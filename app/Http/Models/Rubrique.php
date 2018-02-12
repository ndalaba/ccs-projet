<?php namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Rubrique extends Model {
//`id`, `projet_id`, `rubrique`, `created_at`, `updated_at`, `note`, `debut`, `fin`
    public $fillable = ['projet_id', 'rubrique', 'note', 'debut','fin'];

    public static $rules = ['rubrique' => 'required','projet_id' => 'required'];

    public function taches() {
        return $this->hasMany('App\Http\Models\Tache');
    }

}
