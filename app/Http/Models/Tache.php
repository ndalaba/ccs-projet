<?php namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Tache extends Model {
    public $fillable = ['rubrique_id', 'tache', 'note', 'debut','fin','realisation'];
    public static $rules = ['tache' => 'required','rubrique_id' => 'required'];

}
