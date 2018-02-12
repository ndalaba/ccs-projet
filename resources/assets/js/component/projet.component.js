//`id`, `projet`, `created_at`, `updated_at`, `note`, `debut`, `fin`
var projet = {id:0, projet:'',created_at:null, updated_at:null, note:'', debut:null, fin:null};
var projet_component = Vue.extend({
  template: `
      <div id="page-inner" class="home">
          <div class="row">
              <div class="col-md-12">
                  <h1 class="page-head-line">{{titre}}</h1>
                  <div class="list-group">
                      <h4 class="list-group-item-heading">{{sousTitre}}</h4>
                  </div>
              </div>
          </div>
          <div class="row">
              <div class=" col-md-3 col-sm-3" v-for="projet in projets">
                  <div class="style-box-one Style-one-clr-one">
                    <div class="btn-group" style="float: right;">
                      <button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown"><i class="fa fa-bars pull-left"></i></button>
                      <ul class="dropdown-menu">
                        <li><a title="Détails" v-link="{ path: '/projet-detail/'+projet.id}"><i class="fa fa-bar-chart"></i> Détails</a></li>
                        <li><a href="#" title="Modifier" @click="modifier(projet)"><i class="fa fa-pencil"></i> Modifier</a></li>
                        <li><a href="#" title="Copier le projet" @click="copier(projet.id)"><i class="fa fa-copy"></i> Copier Projet</a></li>
                        <li class="divider"></li>
                        <li><a href="#" title="Supprimer" @click="supprimer(projet.id)"><i class="fa fa-times text-danger text"></i> Supprimer</a></li>
                      </ul>
                    </div>
                    <h3> {{projet.projet}}</h3>
                  </div>
              </div>
          </div>

          <div class="modal fade" tabindex="-1" role="dialog" id="projet_form_modal" >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                <div class="panel panel-primary">
                  <div class="panel-heading">Enregistrer un projet</div>
                      <div class="panel-body">
                        <form class="form-horizontal" role="form" method="POST" @submit.prevent='saveProjet()' @mouseover="inputmask()">
                          <div class="form-group">
                            <label class="col-md-4 control-label">Projet</label>
                            <div class="col-md-6">
                              <input type="text" class="form-control" name="name" v-model="projet.projet" required="">
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-4 control-label">Début</label>
                            <div class="col-md-6">
                              <input type="text" class="form-control" name="debut" v-model="projet.debut" placeholder="2014-01-25" data-inputmask="'mask': '9999-99-99'">
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-4 control-label">Fin</label>
                            <div class="col-md-6">
                              <input type="text" class="form-control" name="fin" v-model="projet.fin" placeholder="2014-01-25" data-inputmask="'mask': '9999-99-99'">
                            </div>
                          </div>

                          <div class="form-group">
                            <label class="col-md-4 control-label">Note</label>
                            <div class="col-md-6">
                              <textarea name="name" v-model="projet.note" class="form-control"></textarea>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                              <button type="submit" class="btn btn-primary btn-sm">Enregistrer</button>
                              <button type="button" class="btn btn-danger btn-sm" name="annuler" @click="annuller()">Annuller</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                </div>
              </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
          </div>

      </div>`,
      data: function(){
        return {
          titre: 'Tableau de bord',
          sousTitre: 'Projets',
          projets:[],
          projet:projet
        }
      },
      created : function(){
        this.getProjets();
      },
      methods: {
         getProjets:function(){
           var self= this;
           this.$http.get('projet/liste').then(function(response){
          //  this.$set('projets',response.data);
             self.projets=response.data;
           });
         },
         saveProjet:function(){
           var self= this;
           this.$http.post('projet/save-projet', self.projet).then(function(response){
               var data= response.data
               if(data.status){
                 self.resetProjet();
                 self.getProjets();
                   $('#projet_form_modal').modal('hide');
               }
               else{
                 alert(data.message);
               }
           });
         },
         copier: function(projetId){
            this.$http.get('projet/dupliquer/'+projetId).then(function(response){
               this.projets=response.data;
            });
         },
         modifier: function(projet){
           this.projet=projet;
           $('#projet_form_modal').modal('show');
         },
         resetProjet: function(){
            this.projet={id:0, projet:'',created_at:null, updated_at:null, note:'', debut:null, fin:null};
         },
         annuller:function(){
           this.resetProjet(); $('#projet_form_modal').modal('hide');
         },
         supprimer:function(id){
           if(confirm("Êtes vous sûr de vouloir supprimer ce projet")){
             self=this;
             this.$http.get('projet/supprimer/'+id).then(function(){
               self.getProjets();
             });
           }
         },

         inputmask:function(){
           $(":input").inputmask();
         }
      }
});
//Vue.component('projet', projet_component);
