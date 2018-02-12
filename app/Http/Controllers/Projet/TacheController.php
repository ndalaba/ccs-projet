<?php
/**
 * Created by PhpStorm.
 * User: ndalaba
 * Date: 26/05/15
 * Time: 10:17
 */

namespace App\Http\Controllers\Projet;

use App\Http\Controllers\Controller;
use App\Http\Models\Tache;
use App\Http\Models\Rubrique;
use App\Http\Models\Help;
use Illuminate\Http\Request;


class TacheController extends Controller {

    public function __construct() {
        $this->middleware('edit');
    }

    public function index($rubrique_id){
      return Tache::where('rubrique_id',$rubrique_id)->get();
    }
    public function delete($id,$rubrique_id){
      Tache::find($id)->delete();
      self::pourcentage($rubrique_id);
    }
    public function tache($id=0){
      return Tache::findOrFail($id);
    }

    public function save(Request $request) {
        if ($request->isMethod('post')) {
          /*  $request->merge(
              array(
                'debut' => Help::toMysqlDate($request->input('debut')),
                'fin' => Help::toMysqlDate($request->input('fin'))
              )
            );
            return $request->all();
            */

            $validator = \Validator::make($request->all(),Tache::$rules);
            $response=null;
            if ($validator->fails()) {
                return json_encode(['status'=>0, 'message'=>'Renseigner correctement les champs']);
            }
            if ($request->input('id')!=0) {
                $projet = Tache::find($request->input('id'));
                $projet->update($request->all());
                  $response= json_encode(['status'=>1, 'message'=>'Tâche modifié']);
            } else {
                //if (Help::checkObject(new Tache(), 'tache', $request->input('tache'), $request->input('id', 0)))
                  //  return json_encode(['status'=>0, 'message'=>'Tâche déja enregistrée']);
                $projet = Tache::create($request->all());
                $response= json_encode(['status'=>1, 'message'=>'Tâche enregistrée']);
            }

            self::pourcentage($request->input('rubrique_id'));

            return $response;
        }

    }
    private function pourcentage($rubrique_id){
      $taches= Tache::where('rubrique_id',$rubrique_id)->get();
      $total_realisation=0;
      $nTache= count($taches);
      foreach ($taches as $tache) {
          $total_realisation+= $tache->realisation;
      }
      $rubrique=Rubrique::find($rubrique_id);
      $rubrique->realisation = $total_realisation/$nTache;
      $rubrique->update();
    }

}
