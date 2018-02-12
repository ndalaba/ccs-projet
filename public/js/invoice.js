Vue.config.debug = true;
var amount=0;
var currency = function (val) {
    var val = val.toString();
    var number = +val.replace(/[^\d.]/g, '')
    return isNaN(number) ? 0 : parseFloat(number.toFixed(2))
};

Vue.filter('currencyDisplay', {
    read: function (val) {
        return val.toFixed(2)
    },
    write: function (val, oldVal) {
        return currency(val);
    }
});

var grandTotal = function () {
    var subtotal = document.querySelectorAll('td.subtotal');
    var total = 0.00;
    var i;
    for (i = 0; i < subtotal.length; i++) {
        total += parseFloat(subtotal[i].innerHTML);
    }
    amount=currency(total);
    document.querySelector('#grandTotal').innerHTML = amount;
    // return total;
};
setInterval(function () {
    var element = document.querySelector("#grandTotal");
    if (typeof(element) != 'undefined' && element != null) {
        grandTotal();
    }

}, 1000);

new Vue({
    el: '.invoice',
    data: {
        rubriques: [],
        gTotal: 0.00,
    },
    ready: function () {
        this.gtotal = grandTotal();
    },
    created: function () {
        var vm = this;
        $.getJSON(url + '/ml/rubriques/' + toice, function (rubriques) {
            vm.rubriques = rubriques.reverse();
        });
    },
    methods: {
        subTotal: function (items) {
            var total = 0.00;
            items.forEach(function (item, key) {              
                total += (item.quantity * item.amount * (item.taxe / 100)) + (item.quantity * item.amount);
            });
            return total;
        },
        save:function(){
          var data= {
            _token: token,
            client: client,
            voyage: voyage,
            toice: toice,
            numero: numero,
            amount: amount,
            rubriques: JSON.stringify(this.rubriques)
          }
          $.post(url+'/ml/invoice/saveinvoice',data,function(response){
            alert(response);
          });
        }
    }
});
