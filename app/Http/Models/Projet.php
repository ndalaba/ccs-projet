<?php namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Projet extends Model {
//`id`, `projet`, `created_at`, `updated_at`, `note`, `debut`, `fin`
    public $fillable = ['projet', 'note','debut','fin'];

    public static $rules = ['projet' => 'required'];


    public function rubriques() {
        return $this->hasMany('App\Http\Models\Rubrique');
    }
    public function pourcentage() {
        return $this->hasMany('App\Http\Models\Pourcentage');
    }
}
