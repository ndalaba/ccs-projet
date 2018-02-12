$(document).ready(function () {

    /*====================================
     METIS MENU
     ======================================*/
    $('#main-menu').metisMenu();
    /*======================================
     LOAD APPROPRIATE MENU BAR ON SIZE SCREEN
     ========================================*/
    $(window).bind("load resize", function () {
        if ($(this).width() < 768) {
            $('div.sidebar-collapse').addClass('collapse')
        } else {
            $('div.sidebar-collapse').removeClass('collapse')
        }
    });
    //Set active menu
    var activeMenu = function () {
        var menu = ['home', 'maersk', 'users'];
        $('#main-menu li a').removeClass('active-menu');
        $('#main-menu li ul').removeClass('in');
        menu.forEach(function (value) {
            if ($('#page-wrapper .' + value).length) {
                $('#main-menu #' + value).addClass('active-menu');
                $('#main-menu #' + value).parent('li').find('ul').addClass('in');
            }
        });
    };
    activeMenu();
    // select all
    $('#select_all').change(function () {
        var checkboxes = $(this).closest('form').find(':checkbox');
        if ($(this).is(':checked')) {
            checkboxes.prop('checked', true);
        } else {
            checkboxes.prop('checked', false);
        }
    });

    $('#wrapper').on('click', 'a.del', function (e) {
        e.preventDefault();
        if (confirm('Êtes vous sûr de vouloir supprimer cet élément?')) {
            $('#page-wrapper').css({"cursor": "wait"});
            var $this = $(this);
            $.get($this.attr('href'), function (rs) {
                $this.parents('tr').fadeOut();               
                /*$('#page-wrapper').html(rs);*/
                $('#page-wrapper').css({"cursor": "default"});
            });
        }
    });

    $('body').on('submit', 'form#post', function (e) {
        e.preventDefault();
        $('#page-wrapper').css({'opacity': "0.3", "cursor": "wait"});
        var $this = $(this);
        var data = $this.serialize();
        $.post($this.attr('action'), data, function (rs) {
            $('#page-wrapper').html(rs);
            $('#page-wrapper').css({'opacity': "1", "cursor": "default"});
        });
        return false;
    });

    /*======================================
     NAVIGATION AJAX
     ========================================*/
    var chargeUnefois = false;

    function pageTitle(value) {
        var title = $('title').attr('data-titre');
        $('title').html(title + " | " + value);
    }

    function showContent(url, title, element) {
        $('#page-wrapper').css({'opacity': "0.3", "cursor": "wait"});
        $.get(url, function (data) {
            $('#page-wrapper').html(data);
            pageTitle(title);
            $('ul.nav a').removeClass('selected');
            if (element !== undefined) element.addClass('selected');
            $('#page-wrapper').fadeIn(500);
            chargeUnefois = true;
            $('html, body').animate({
                scrollTop: 0
            }, 'fast');
            $('#page-wrapper').css({'opacity': "1", "cursor": "default"});
        });
    }

    $('body').on('click', '.ajax:not("a.del")', function (e) {
        e.preventDefault();
        var a = $(this);
        var url = a.attr('href');
        var title = a.attr('title');
        showContent(url, title, a);
        history.pushState({
            titre: title
        }, title, url);
        e.stopPropagation();
    });
    window.onpopstate = function (event) {
        if (event.state == null && chargeUnefois) showContent(document.location.pathname, 'ERP'); //window.location.reload();
        else showContent(document.location.pathname, event.state.titre);
    }
});

// Utils

var initForm = function() {
    //Util.chosen();
    $(":input").inputmask();
};