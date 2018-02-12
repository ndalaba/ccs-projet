<?php
/**
 * Created by PhpStorm.
 * User: ndalaba
 * Date: 26/05/15
 * Time: 10:17
 */

namespace App\Http\Controllers\Projet;

use App\Http\Controllers\Controller;
use App\Http\Models\Rubrique;
use App\Http\Models\Help;
use App\Http\Models\Tache;
use Illuminate\Http\Request;


class RubriqueController extends Controller {

    public function __construct() {
        $this->middleware('edit');
    }

    public function index($projet_id) {
        return Rubrique::with('taches')->where('projet_id', $projet_id)->get();
    }

    public function delete($id) {
        Rubrique::find($id)->delete();
    }

    public function rubrique($id = 0) {
        return Rubrique::findOrFail($id);
    }

    public function save(Request $request) {
        if ($request->isMethod('post')) {
            $validator = \Validator::make($request->all(), Rubrique::$rules);
            if ($validator->fails()) {
                return json_encode(['status' => 0, 'message' => 'Renseigner correctement les champs']);
            }
            if ($request->input('id') != 0) {
                $projet = Rubrique::find($request->input('id'));
                $projet->update($request->all());
                return json_encode(['status' => 1, 'message' => 'Rubrique modifié']);
            } else {
                //if (Help::checkObject(new Rubrique(), 'rubrique', $request->input('rubrique'), $request->input('id', 0)))
                //  return json_encode(['status'=>0, 'message'=>'Rubrique déja enregistrée']);
                $projet = Rubrique::create($request->all());
                return json_encode(['status' => 1, 'message' => 'Rubrique enregistrée']);
            }
        }

    }

    public function dupliquer($id, $projet_id) {
        $lastrubrique = Rubrique::findOrFail($id);
        $rubrique = Rubrique::create(array('rubrique' => $lastrubrique->rubrique . '_tmp', 'projet_id' => $lastrubrique->projet_id));
        foreach ($lastrubrique->taches as $tache) {
            $newTache = Tache::create(array('rubrique_id' => $rubrique->id, 'tache' => $tache->tache, 'note' => $tache->note));
        }
        return Rubrique::with('taches')->where('projet_id', $projet_id)->get();
    }

}
