<?php
/**
 * Created by PhpStorm.
 * User: ndalaba
 * Date: 26/05/15
 * Time: 10:17
 */

namespace App\Http\Controllers\Projet;

use App\Http\Controllers\Controller;
use App\Http\Models\Projet;
use App\Http\Models\Rubrique;
use App\Http\Models\Pourcentage;
use App\Http\Models\Tache;
use App\Http\Models\Help;
use Illuminate\Http\Request;


class ProjetController extends Controller {

    public function __construct() {
        $this->middleware('edit');
    }

    public function index() {
        return Projet::latest()->get();
    }

    public function delete($id) {
        Projet::find($id)->delete();
    }

    public function projet($id = 0) {
        return Projet::findOrFail($id);
    }

    public function pourcentage(Request $request, $id) {
        $projet_id = $id;
        $rubriques = Rubrique::where('projet_id', $projet_id)->get();
        $total_realisation = 0;
        $nRubri = count($rubriques);
        foreach ($rubriques as $rubrique) {
            $total_realisation += $rubrique->realisation;
        }
        $percent = $total_realisation / $nRubri;
        $pourcentage = new Pourcentage;
        $pourcentage->projet_id = $projet_id;
        $pourcentage->pourcentage = $percent;

        $pourcentage->ajout = strtotime($request->input('ajout'));

        $pourcentage->save();

        $pourcentages = Pourcentage::where('projet_id', $projet_id)->orderBy('ajout')->get();
        return json_encode(['status' => 1, 'message' => 'Pourcentage enregistré', 'pourcentages' => $pourcentages]);

    }

    public function save(Request $request) {
        if ($request->isMethod('post')) {
            $validator = \Validator::make($request->all(), Projet::$rules);
            if ($validator->fails()) {
                return json_encode(['status' => 0, 'message' => 'Renseigner correctement les champs']);
            }
            if ($request->input('id') != 0) {
                $projet = Projet::find($request->input('id'));
                $projet->update($request->all());
                return json_encode(['status' => 1, 'message' => 'Projet modifié']);
            }
            else {
                if (Help::checkObject(new Projet(), 'projet', $request->input('projet'), $request->input('id', 0)))
                    return json_encode(['status' => 0, 'message' => 'Projet déja enregistré']);
                Projet::create($request->all());
                return json_encode(['status' => 1, 'message' => 'Projet enregistré']);
            }
        }

    }

    public function dupliquer($id) {
        $lastprojet = Projet::findOrFail($id);
        $projet = Projet::create(array('projet' => $lastprojet->projet . '_tmp'));
        foreach ($lastprojet->rubriques as $rubrique) {
            $newRubrique = Rubrique::create(array('projet_id' => $projet->id, 'rubrique' => $rubrique->rubrique, 'note' => $rubrique->note));
            foreach ($rubrique->taches as $tache) {
                Tache::create(array('rubrique_id' => $newRubrique->id, 'tache' => $tache->tache, 'note' => $tache->note));
            }
        }
        return Projet::latest()->get();
    }
}
