<?php
$fichiers = \File::files('uploads/fichiers');
?>
<script>
    var removeFichierUrl='{{ url('admin/medias/delete-fichier/') }}';
    var url='{{ asset('uploads/fichiers/') }}';
    var token='{{csrf_token()}}';
</script>

<div class="modal fade" id="fichierModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel"> Bibliothèque Images</h4>
            </div>
            <div class="modal-body" style="overflow: auto">
                <div class="row">
                    @foreach($fichiers as $fichier)
                        <ul>
                            @foreach($fichiers as $fichier)
                                <figure id="{{filename($fichier)}}"  class="{{filename($fichier)}}"  >
                                    <figcaption>
                                        <label for="">{{filename($fichier)}}</label>
                                        <input type="text" style="font-size: 11px;width: 100%" readonly value="{{ asset('uploads/fichiers/'.filename($fichier)) }}"/>
                                        <a class="delete-tag" onclick="removeFichier('{{filename($fichier)}}')" href="#">Supprimer </a></figcaption>
                                </figure>

                            @endforeach
                        </ul>
                    @endforeach
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>
            </div>
        </div>
    </div>
</div>