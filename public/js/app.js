//var Vue = require('vue')
//var VueRouter = require('vue-router')
// Vue.use(require('vue-resource'));
// Vue.use(VueRouter)

Vue.http.headers.common['X-CSRF-Token'] = $('#token').attr('content');
//Vue.config.debug=true;
var mysqlTimeStampToDate = function (timestamp) {
    var date = new Date(timestamp * 1000);
    var day = "0" + date.getDate();
    var month = "0" + (date.getMonth() + 1);
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    //var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    var formattedTime = day.substr(-2) + '/' + month.substr(-2) + '/' + year;
    return formattedTime;
};

Vue.filter('mysqlTimeStampToDate', function (value) {
    return mysqlTimeStampToDate(value);
});

var App = Vue.extend({
    //  el: '.app',
    methods: {
        showProjetFrm: function () {
            $('#projet_form_modal').modal('show');
        }
    }
});

var router = new VueRouter()
router.map({
    '': {
        component: projet_component
    },
    'projet': {
        component: projet_component
    },
    '/projet-detail/:projetId': {
        component: projet_detail
    }
})

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '.app');
