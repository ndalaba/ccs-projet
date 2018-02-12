<?php namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Pourcentage extends Model {
//`id`, `projet`, `created_at`, `updated_at`, `note`, `debut`, `fin`
    public $fillable = ['projet_id', 'Pourcentage','ajout'];

    public static $rules = ['projet_id' => 'required','pourcentage'=>'required'];


    public function projet() {
        return $this->belongsTo('App\Http\Models\Projet');
    }
}
