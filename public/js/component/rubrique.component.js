var activeRubrique = 0;
var curentRubrique = {
    id: 0,
    rubrique: '',
    created_at: null,
    updated_at: null,
    note: '',
    debut: null,
    fin: null,
    projet_id: 0
};
var rubrique_component = Vue.extend({
    template: `
      <div class="col-md-12">
        <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover" id="rubrique_table">
                    <tbody>
                      <template v-for="rubrique in rubriques">
                          <tr>
                              <td colspan="6" style="cursor: pointer; text-align: left;font-size: 17px;font-weight: bold;color: #000;background-color: #D0CECE;padding-left: 30px;">
                                <span @click="toggleTacheList(rubrique.id)"> <i class="fa fa-arrows-v"></i> {{ rubrique.rubrique | uppercase }} ({{rubrique.realisation}})% </span>
                                  <div class="row-actions" style="float:right; width:auto;">
                                      <span><a href="#" class="btn btn-primary btn-sm" title="Copier Rubrique" @click.prevent="copier(rubrique.id)"><i class="fa fa-copy"></i> Copier la rubrique</a> </span>
                                      <span><a href="#" class="btn btn-primary btn-sm" title="Ajouter une tache" @click.prevent="addTache(rubrique.id)"><i class="fa fa-tasks"></i> Ajouter une tache</a> </span>
                                      <span><a href="#" class="btn btn-primary btn-sm" title="Modifier la rubrique" @click.prevent="modifier(rubrique)"><i class="fa fa-pencil"></i> Modifier</a></span>
                                      <span><a href="#" class="btn btn-danger btn-sm" title="Déplacer cet élément dans la Corbeille" @click.prevent="supprimer(rubrique.id)"><i class="fa fa-remove"></i> Supprimer</a> </span>
                                  </div>
                              </td>
                          </tr>

                          <tr style="font-weight: bold;" class="hide toggleList{{rubrique.id}}">
                            <td style="widtd:40%">Tâche</td>
                            <td style="widtd:15%">Début</td>
                            <td style="widtd:15%">Fin</td>
                            <td style="widtd:10%">Réalisation(%)</td>
                            <td style="widtd:10%"></td>
                          </tr>
                          <tr v-for="tache in rubrique.taches" class="hide toggleList{{rubrique.id}}">
                            <td style="width:40%">{{tache.tache}}</td>
                            <td style="width:20%">{{tache.debut}}</td>
                            <td style="width:20%">{{tache.fin}}</td>
                            <td style="width:10%">{{tache.realisation}}</td>
                            <td style="width:10%">
                              <a href="#" title="Modifier" @click.prevent="modifierTache(tache)"><i class="fa fa-pencil"></i> </a> |
                              <a href="#" title="Supprimer" @click.prevent="supprimerTache(tache.id)"><i class="fa fa-times text-danger text"></i> </a>
                            </td>
                          </tr>

                            <!--<tache-liste :rubrique_id="rubrique.id"  v-ref:tacheListe></tache-liste>-->
                      </template>
                    </tbody>
                </table>
                <tache-form v-ref:tacheForm></tache-form>
            </div>
           <div class="modal fade" tabindex="-1" role="dialog" id="rubrique_form_modal" >
             <div class="modal-dialog">
               <div class="modal-content">
                 <div class="modal-body">
                 <div class="panel panel-primary">
                   <div class="panel-heading">Enregistrer une rubrique</div>
                       <div class="panel-body">
                         <form class="form-horizontal" role="form" method="POST" @submit.prevent='saveRubrique()' @mouseover="inputmask()">
                           <input type="hidden" id="projet_id" name="projet_id" value="{{projet_id}}" v-model="curentRubrique.projet_id">
                           <div class="form-group">
                             <label class="col-md-4 control-label">Rubrique</label>
                             <div class="col-md-6">
                               <input type="text" class="form-control" name="rubrique" v-model="curentRubrique.rubrique" required="">
                             </div>
                           </div>
                           <div class="form-group">
                             <label class="col-md-4 control-label">Début</label>
                             <div class="col-md-6">
                               <input type="text" class="form-control" name="debut" v-model="curentRubrique.debut" placeholder="2014-01-25" data-inputmask="'mask': '9999-99-99'">
                             </div>
                           </div>
                           <div class="form-group">
                             <label class="col-md-4 control-label">Fin</label>
                             <div class="col-md-6">
                               <input type="text" class="form-control" name="fin" v-model="curentRubrique.fin" placeholder="2014-01-25" data-inputmask="'mask': '9999-99-99'">
                             </div>
                           </div>
                           <div class="form-group">
                             <label class="col-md-4 control-label">Note</label>
                             <div class="col-md-6">
                               <textarea name="name" v-model="curentRubrique.note" class="form-control"></textarea>
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
      </div>
      <div class="col-md-12" id="chart" style="overflow: auto;margin-top: 20px;">
        <canvas id="myLineChart" width="1500" height="760"></canvas>
        <canvas id="myBarChart" width="1500" height="760"></canvas>
      </div>
      `,
    props: ['projet_id'],
    data: function () {
        return {
            curentRubrique: curentRubrique,
            rubriques: [],
            labels: []
        }
    },
    computed: {
        rubrique_id: function () {
            return this.curentRubrique.id;
        }
    },
    created: function () {
        this.getRubriques(this.projet_id);
    },
    ready: function () {
        this.chart(this.projet_id);
    },
    methods: {
        chart: function (projetId) {
            var self = this;
            this.$http.get('projet/rubrique/liste/' + projetId).then(function (response) {
                var rubriques = response.data;
                var label = [];
                var data = [];
                for (var i = 0; i < rubriques.length; i++) {
                    label[i] = rubriques[i].rubrique;
                    data[i] = rubriques[i].realisation;
                }
                var chartData = {
                    labels: label,
                    datasets: [
                        {
                            label: "Réalisation projet en pourcentage",
                            fillColor: "rgba(151,187,205,0.2)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: data
                        }
                    ]
                };
                var ctx1 = $("#myLineChart").get(0).getContext("2d");
                var ctx2 = $("#myBarChart").get(0).getContext("2d");
                var myLineChart = new Chart(ctx1).Line(chartData, {
                    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> %",
                    //  responsive: true,
                    //scaleBeginAtZero: true,
                });
                var myBarChart = new Chart(ctx2).Bar(chartData, {
                    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> %",
                    //  responsive: true,
                });
            });
        },
        getRubriques: function (projet) {
            var self = this;
            this.$http.get('projet/rubrique/liste/' + projet).then(function (response) {
                // this.$set('projets',response.data);
                self.rubriques = response.data;
                var nbreRubrique = self.rubriques.length;
                var pourcentage = 0;
                for (var i = 0; i < nbreRubrique; i++) {
                    pourcentage += self.rubriques[i].realisation;
                }
                pourcentage = pourcentage / nbreRubrique;
                pourcentage = parseFloat(pourcentage).toFixed(2);
                $('#pourcentageProjet').html(pourcentage + '%');
                self.chart(projet);

                var showCurentList= function(){
                    var list= document.querySelectorAll('.toggleList'+activeRubrique);
                    for(var i=0; i< list.length; i++){
                        list[i].classList.remove('hide');
                    }
                };

                setTimeout(showCurentList,1000);

            });
        },
        saveRubrique: function () {
            var self = this;
            this.$http.post('projet/save-rubrique', self.curentRubrique).then(function (response) {
                var data = response.data
                if (data.status) {
                    self.resetRubrique();
                    self.getRubriques(self.projet_id);
                    $('#rubrique_form_modal').modal('hide');
                }
                else {
                    alert(data.message);
                }
            });
        },
        modifier: function (rubrique) {
            this.curentRubrique = rubrique;
            $('#rubrique_form_modal').modal('show');
        },
        resetRubrique: function () {
            this.curentRubrique = {
                id: 0,
                rubrique: '',
                created_at: null,
                updated_at: null,
                note: '',
                debut: null,
                fin: null,
                projet_id: this.projet_id
            };
        },
        copier: function(id){
            var self = this;
            this.$http.get('projet/rubrique/dupliquer/'+id+'/'+self.projet_id).then(function(response){
                self.getRubriques(self.projet_id);
            });
        },
        annuller: function () {
            this.resetRubrique();
            $('#rubrique_form_modal').modal('hide');
        },
        supprimer: function (id) {
            if (confirm("Êtes vous sûr de vouloir supprimer cette rubrique")) {
                var self = this;
                this.$http.get('projet/rubrique/supprimer/' + id).then(function () {
                    self.getRubriques(self.projet_id);
                });
            }
        },
        addTache: function (rubrique_id) {
            $('#tache_form_modal').modal('show');
            $('#tache_form_modal #rubrique_id').val(rubrique_id);

        },
        toggleTacheList: function (rubrique_id) {
            //var element= document.querySelectorAll('.toggleList'+rubrique_id);
            // element.classList.toggle('hide');
            $('.toggleList' + rubrique_id).toggleClass('hide');
            activeRubrique = rubrique_id;
        },
        getTaches: function (rubrique) {
            var self = this;
            this.$http.get('projet/tache/liste/' + rubrique).then(function (response) {
                //  this.$set('projets',response.data);
                self.taches = response.data;
                $('#rubrique_table').mouseenter(function () {
                    $('.toggleList' + activeRubrique).removeClass('hide');
                });
            });
        },
        modifierTache: function (tache) {
            $('#tache_form_modal').modal('show');
            this.$refs.tacheform.curentTache=tache;
        },
        supprimerTache: function (id) {
            self = this;
            this.$http.get('projet/tache/supprimer/' + id + '/' + self.rubrique_id).then(function () {
                self.getRubriques(self.$route.params.projetId);
            });
        },
        inputmask: function () {
            $(":input").inputmask();
        }
    }
});
Vue.component('rubrique', rubrique_component);