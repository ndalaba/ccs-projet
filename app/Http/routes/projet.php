<?php
use App\Http\Models\Pourcentage;

Route::group(['middleware' => ['auth'], 'namespace' => 'Projet', 'prefix' => 'projet'], function () {

    Route::get('/', function () {
        return view('layout');
    });
    Route::get('liste', 'ProjetController@index');
    Route::get('projet/{id}', 'ProjetController@projet');
    Route::get('dupliquer/{id}', 'ProjetController@dupliquer');
    Route::post('save-projet', 'ProjetController@save');
    Route::get('supprimer/{id}', 'ProjetController@delete');
    Route::post('pourcentage/{id}', 'ProjetController@pourcentage');
    Route::get('pourcentages/{id}', function ($id) {
        $pourcentages = Pourcentage::where('projet_id', $id)->orderBy('ajout')->get();
        return json_encode($pourcentages);
    });
    Route::get('pourcentage/supprimer/{id}', function ($id) {
        Pourcentage::find($id)->delete();
    });

    Route::get('rubrique/liste/{projet}', 'RubriqueController@index');
    Route::get('rubrique/{id}', 'RubriqueController@rubrique');
    Route::post('save-rubrique', 'RubriqueController@save');
    Route::get('rubrique/supprimer/{id}', 'RubriqueController@delete');
    Route::get('rubrique/dupliquer/{id}/{projet_id}', 'RubriqueController@dupliquer');

    Route::get('tache/liste/{rubrique}', 'TacheController@index');
    Route::get('tache/{id}', 'TacheController@tache');
    Route::post('save-tache', 'TacheController@save');
    Route::get('tache/supprimer/{id}/{rubrique_id}', 'TacheController@delete');
});
