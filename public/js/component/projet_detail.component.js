var projet_detail = Vue.extend({
  template: `
      <div id="page-inner" class="home">
          <div class="row">
              <div class="col-md-12">
                  <h1 class="page-head-line">
                      {{projet.projet}}
                      (<strong id="pourcentageProjet"></strong>)
                      <span style="font-size:13px; text-transform:none">{{projet.note}}</span>
                      <div style="text-align:right">
                          <span><a href="#" class="btn btn-primary btn-sm" title="Enregistrer le pourcentage" @click.prevent="percent()"><i class="fa fa-list"></i> Afficher les pourcentages</a> </span>
                          <a @click.prevent="addRubrique()" class="btn btn-primary btn-sm"><i class="fa fa-save"></i> Ajouter une rubrique</a>
                          <a v-link="{ path:'/'}" class="btn btn-primary btn-sm"><i class="fa fa-history"></i> Revenir aux projets</a>
                          <div class="btn-group">
                            <button class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown"><i class="fa fa-print"></i> Impression</button>
                            <ul class="dropdown-menu" style="left:-70px;">
                              <li><a @click.prevent="printModal(1)" href=""><i class="fa fa-print"></i> Line chart</a></li>
                              <li><a @click.prevent="printModal(2)" href=""><i class="fa fa-print"></i> Bar chart</a></li>
                              <li><a @click.prevent="printModal(3)" href=""><i class="fa fa-print"></i> Line chart general</a></li>
                            </ul>
                          </div>
                      </div>
                  </h1>
              </div>
              <rubrique :projet_id="projet_id"></rubrique>
              <div class="col-md-12" id="projetchart" style="overflow: auto;margin-top: 20px;">
                <canvas id="projetLineChart" width="1500" height="760"></canvas>
              </div>

              <div class="modal fade" tabindex="-1" role="dialog" id="print_form_modal" >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-body">
                    <div class="panel panel-primary">
                      <div class="panel-heading">Description</div>
                          <div class="panel-body">
                            <form class="form-horizontal" role="form" method="POST" @submit.prevent='doPrint()'>
                              <div class="form-group">
                                <label class="col-md-4 control-label">Titre</label>
                                <div class="col-md-6">
                                  <input type="text" class="form-control" name="titre" v-model="print.titre" required="">
                                </div>
                              </div>
                              <div class="form-group">
                                <label class="col-md-4 control-label">Note</label>
                                <div class="col-md-6">
                                  <textarea name="name" v-model="print.note" class="form-control"></textarea>
                                </div>
                              </div>
                              <div class="form-group">
                                <div class="col-md-6 col-md-offset-4">
                                  <button type="submit" class="btn btn-primary btn-sm">Imprimer</button>
                                  <button type="button" class="btn btn-danger btn-sm" name="annuler" @click="resetPrint()">Annuller</button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                    </div>
                  </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
              </div>

            <pourcentage></pourcentage>

          </div>
      </div>`,

  props: ['titre', 'sousTitre'],
  data: function() {
    return {
      projet: {
        projet: '',
        note: '',
        id: 0
      },
      print: {
        titre: '',
        note: '',
        chart: 0
      }
    }
  },
  created: function() {
    var projetId = this.$route.params.projetId;
    this.getProjet(projetId);
  },
  computed: {
    projet_id: function() {
      return this.$route.params.projetId;
    }
  },
  ready:function(){
    var projet_id = this.$route.params.projetId;
    this.$http.get('projet/pourcentages/'+projet_id).then(function(response){
      self.chart(response.data);
    });
  },
  methods: {
    getProjet: function(projetId) {
      self = this;
      this.$http.get('projet/projet/' + projetId).then(function(response) {
        this.$set('projet', response.data);
        self.projet = response.data;
        this.print = {
          titre: self.projet.projet,
          note: '',
          chart: 0
        }
      });
    },
    chart:function(pourcentages){
      var label = [];
      var data = [];
      for (var i = 0; i < pourcentages.length; i++) {
          label[i] = mysqlTimeStampToDate(pourcentages[i].ajout);
          data[i] = pourcentages[i].pourcentage;
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
      var ctx1 = $("#projetLineChart").get(0).getContext("2d");
      var projetLineChart = new Chart(ctx1).Line(chartData, {
          tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> %",
          //  responsive: true,
          //scaleBeginAtZero: true,
      });
    },
    percent: function() {
        $('#percent_modal').modal('show');
     /* var self=this;
      var projet_id = this.$route.params.projetId;
      this.$http.get('projet/pourcentage/' + projet_id).then(function(response) {
        if (response.data.status == 1){
          var pourcentages = response.data.pourcentages;
          self.chart(pourcentages);
          alert(response.data.message);
        }
        else {
            alert("Erreur!");
        }
      });*/
    },
    addRubrique: function() {
      $('#rubrique_form_modal').modal('show');
    },
    resetPrint: function() {
      $('#print_form_modal').modal('hide');
      this.print = {
        titre: self.projet.projet,
        note: '',
        chart: 0
      }
    },
    printModal: function(chart) {
      $('#print_form_modal').modal('show');
      this.print.chart = chart;
    },
    doPrint: function() {
      var d = new Date();
      var dte = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
      if (this.print.chart == 1)
        this.printing('myLineChart', this.print.titre, this.print.note, dte);
      else if (this.print.chart == 2)
        this.printing('myBarChart', this.print.titre, this.print.note, dte);
      else if (this.print.chart == 3)
        this.printing('projetLineChart', this.print.titre, this.print.note, dte);
    },
    printing: function(elm, titre, note, dte) {
      var dataUrl = document.getElementById(elm).toDataURL(); //attempt to save base64 string to server using this var
      var windowContent = '<!DOCTYPE html>';
      windowContent += '<html>'
      windowContent += '<head><title>Rapport mensuel ' + dte + '</title></head>';
      windowContent += '<body>'
      windowContent += '<img style="margin: 0px; width:150px;float: left;display: inline-block;" src="http://projet.ccs-const.com/img/ccslogo.jpg">';
      windowContent += '<h1 style="text-align:center;float: left;width: 80%;">' + titre + '</h1>';
      windowContent += '<p style="text-align: center;margin-bottom: 30px;">' + note + '</p>';
      windowContent += '<img style="float:left;" src="' + dataUrl + '">';
      windowContent += '<h2 style="text-align:center;margin-top: 17px;float: left;width: 100%;">Avancement global du projet ' + $('#pourcentageProjet').text() + '</h2>';
      windowContent += '<p style="float:right;font-weight: bold;font-family: Raleway,sans-serif;">' + dte + '</p>';
      windowContent += '<p style="float:left;font-weight: bold;font-family: Raleway,sans-serif;">Ingénieur Diallo Mamadou Bobo <br>Responsable technique CCS SARL <br> Email: mbobo.diallo@ccs-const.com <br> Tel: 622 674 422</p>';
      windowContent += '</body>';
      windowContent += '</html>';
      var printWin = window.open('', '', 'width=900,height=500');
      printWin.document.open();
      printWin.document.write(windowContent);
      printWin.document.close();
      printWin.focus();
      printWin.print();
      printWin.close();
    }
  }
});
