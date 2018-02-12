<?php
/**
 * Created by PhpStorm.
 * User: N'Dalaba
 * Date: 04/08/2015
 * Time: 11:13
 */

namespace App\Http\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Help {

    /**
     * Verifier l'existance d'un objet sur un champ
     * @param string $field
     * @param string $val
     * @param int $id
     * @return bool
     */
    public static function checkObject(Model $model, $field = '', $val = "", $id = 0) {
        $objet = $model::where($field, $val)->first();
        if ($objet != null) {
            // S'il s'agit du mm objet alors un autre objet n'existe pas
            if ($objet->id == $id)
                return false;
            else
                return true;
        } else
            return false;
    }

    public static function timestampToDateTime($value) {
        return date('d/m/Y H:i', strtotime($value));
    }
    public static function timestampToDate($value) {
        return date('d/m/Y', strtotime($value));
    }
    public static function timestampToDateL($value) {
        return date('d-M-Y', strtotime($value));
    }
    public static function numerofacture($value) {
        return date('dmY', strtotime($value));
    }
    public static function toMysqlDate($value) {
        return date('Y:m:d', strtotime($value));
    }

}
