var pourcentage = Vue.extend({
    template: `
        <div class="modal fade" tabindex="-1" role="dialog" id="percent_modal" >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                <div class="panel panel-primary">
                  <div class="panel-heading">
                        <h4 style="float:left;width: 40%;"> Pourcentage</h4>
                        <input type="date" v-model="ajout" class="form-control" style="float:left;width: 45%;"/>
                        <input type="button" class="btn  btn-info" value="Ajouter" @click="addpourcentage()"/>
                  </div>
                      <div class="panel-body">
                            <div class="table-responsive">
                                    <table class="table table-bordered table-striped table-hover">
                                            <thead>
                                                <tr style="font-weight: bold;">
                                                    <th>Pourcentage</th>
                                                    <th>Date</th>
                                                    <th></th>
                                                </tr>
                                             </thead>
                                            <tbody>
                                                <tr v-for="pourcentage in pourcentages">
                                                    <td>{{pourcentage.pourcentage}} %</td>
                                                    <td>{{pourcentage.ajout | mysqlTimeStampToDate }}</td>
                                                    <td>
                                                         <a href="#" title="Supprimer" @click.prevent="supprimerPourcentage(pourcentage)"><i class="fa fa-times text-danger text"></i> </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                    </table>
                            </div>
                      </div>
                    </div>
                </div>
              </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div>
        </div>
    `,
    data: function () {
        return {
            pourcentages: [],
            ajout: ''
        }
    },
    created: function () {
        var self = this;
        var projet_id = this.$route.params.projetId;
        this.getPourcentage(projet_id);
    },
    methods: {
        supprimerPourcentage: function (pourcentage) {
            var self = this;
            this.$http.get('projet/pourcentage/supprimer/' + pourcentage.id).then(function () {
                self.pourcentages.$remove(pourcentage)
            });
        },
        addpourcentage: function () {
            var self = this;
            var projet_id = this.$route.params.projetId;
            var data = {ajout: this.ajout};
            this.$http.post('projet/pourcentage/' + projet_id, data).then(function (response) {
                if (response.data.status == 1) {
                    var pourcentages = response.data.pourcentages;
                    self.getPourcentage(projet_id);
                    self.$parent.chart(pourcentages);
                }
                else {
                    alert("Erreur!");
                }
            });
        },
        getPourcentage: function (projet_id) {
            var self = this;
            this.$http.get('projet/pourcentages/' + projet_id).then(function (response) {
                self.pourcentages = response.data;
            });
        }
    }
});

Vue.component('pourcentage', pourcentage);