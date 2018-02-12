
/*var tache_liste = Vue.extend({
  template: `
      <tr style="font-weight: bold;" class="hide toggleList{{rubrique_id}}">
        <td style="widtd:40%">Tâche</td>
        <td style="widtd:15%">Début</td>
        <td style="widtd:15%">Fin</td>
        <td style="widtd:10%">Réalisation(%)</td>
        <td style="widtd:10%"></td>
      </tr>
      <tr v-for="tache in taches" class="hide toggleList{{rubrique_id}}">
        <td style="width:40%">{{tache.tache}}</td>
        <td style="width:20%">{{tache.debut}}</td>
        <td style="width:20%">{{tache.fin}}</td>
        <td style="width:10%">{{tache.realisation}}</td>
        <td style="width:10%">
          <a href="#" title="Modifier" @click.prevent="modifier(tache)"><i class="fa fa-pencil"></i> </a> |
          <a href="#" title="Supprimer" @click.prevent="supprimer(tache.id)"><i class="fa fa-times text-danger text"></i> </a>
        </td>
      </tr>
      `,
      props: ['rubrique_id'],
      data: function(){
        return {
          taches:[],
          toggleList:false
        }
      },
      created : function(){
        this.getTaches(this.rubrique_id);
      },
      methods: {
         getTaches:function(rubrique){
           var self= this;
           this.$http.get('projet/tache/liste/'+rubrique).then(function(response){
          //  this.$set('projets',response.data);
             self.taches=response.data;
             $('#rubrique_table').mouseenter(function(){
               $('.toggleList'+activeRubrique).removeClass('hide');
             });
           });
         },
         modifier: function(tache){
           $('#tache_form_modal').modal('show');
           this.$parent.$refs.tacheform.curentTache=tache;
         },
         supprimer:function(id){
           self=this;
           this.$http.get('projet/tache/supprimer/'+id+'/'+self.rubrique_id).then(function(){
             self.$parent.getRubriques(self.$route.params.projetId);
             //self.getTaches(self.rubrique_id);
           });
         }
      }
});*/

var tache_form = Vue.extend({
  template: `
          <div class="modal fade" tabindex="-1" role="dialog" id="tache_form_modal" >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                <div class="panel panel-primary">
                  <div class="panel-heading">Enregistrer une tâche</div>
                      <div class="panel-body">
                        <form class="form-horizontal" role="form" method="POST" @submit.prevent='saveTache()' @mouseover="inputmask()">
                          <input type="hidden" id="rubrique_id" name="rubrique_id" v-model="curentTache.rubrique_id">
                          <div class="form-group">
                            <label class="col-md-4 control-label">Tâche</label>
                            <div class="col-md-6">
                              <input type="text" class="form-control" name="name" v-model="curentTache.tache" required="">
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-4 control-label">Début</label>
                            <div class="col-md-6">
                              <input type="text" class="form-control" name="debut" v-model="curentTache.debut" placeholder="2014-01-25" data-inputmask="'mask': '9999-99-99'">
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-4 control-label">Fin</label>
                            <div class="col-md-6">
                              <input type="text" class="form-control" name="fin" v-model="curentTache.fin" placeholder="2014-01-25" data-inputmask="'mask': '9999-99-99'">
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-4 control-label">Réalisation (%)</label>
                            <div class="col-md-6">
                              <input type="number" class="form-control" name="realisation" v-model="curentTache.realisation" placeholder="25.5">
                            </div>
                          </div>

                          <div class="form-group">
                            <label class="col-md-4 control-label">Note</label>
                            <div class="col-md-6">
                              <textarea name="name" v-model="curentTache.note" class="form-control"></textarea>
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
      `,
      data: function(){
        return {
          curentTache: {id:0, tache:'', rubrique_id:0, created_at:null, updated_at:null, note:'', debut:null, fin:null,realisation:0},
        }
      },
      methods: {
         saveTache:function(){
           var self= this;
           this.curentTache.rubrique_id= $('#tache_form_modal #rubrique_id').val();
           this.$http.post('projet/save-tache', self.curentTache).then(function(response){
               var data= response.data
               if(data.status){
                // self.getTaches(self.rubrique_id);
                 self.$parent.getRubriques(self.$route.params.projetId);
                 self.resetTache();
               }
               else{
                 alert(data.message);
               }
           });
         },
         modifier: function(tache){
           $('#tache_form_modal').modal('show');
           this.curentTache=tache;
         },
         resetTache: function(){
            this.curentTache={id:0, tache:'',rubrique_id:this.curentTache.rubrique_id,created_at:null, updated_at:null, note:'', debut:null, fin:null,realisation:0};
         },
         annuller:function(){
           this.resetTache(); $('#tache_form_modal').modal('hide');
         },
         inputmask:function(){
           $(":input").inputmask();
         }
      }
});

Vue.component('tache-form', tache_form);
//Vue.component('tache-liste', tache_liste);
