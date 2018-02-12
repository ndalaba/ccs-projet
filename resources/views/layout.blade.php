<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta charset="utf-8" />
        <meta name="token" id="token" content="{{ csrf_token()}}" value="{{ csrf_token()}}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title data-titre="{{ config('application.name') }}">@section('title'){{ config('application.name') }}@show</title>
         <link href="{{ asset('css/lib.css') }}" rel="stylesheet">
         <link href="{{ asset('css/all.css') }}" rel="stylesheet">
         <link rel="shortcut icon" type="image/x-icon" href="{{ asset('img/ccslogo.jpg') }}">
         <meta name="robots" content="noindex,follow">
        <!-- HTML5 Shiv and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>
        <div id="wrapper" class="app">
            @include('inc.admin-bar')
            <div id="page-wrapper" class="page-wrapper-cls" style="margin:0">
                  @if(starts_with(Route::current()->getPath(),'projet'))
                  <!--<component :is="currentView"></component>-->
                   <router-view></router-view>
                  @else
                    @yield('content')
                  @endif
                 <footer class="footer">
                   <img style="margin: 20px 10px 10px 20px;float: left; display:none" src="http://projet.ccs-const.com/img/ccslogo.jpg">
                    &copy; {{ date('Y')}} {{ config('application.name') }} | Par : <a href="http://guinee-webdev.com" target="_blank">GUINEE-WEBDEV</a>
                </footer>
            </div>
        </div>
        @section('javascript')
            <script src="{{ asset('js/lib/lib.js') }}"></script>
            <script src="{{ asset('js/lib/jqueryinputmask.js') }}"></script>
            <script src="{{ asset('js/lib/all.js') }}"></script>            
            <script src="{{ asset('js/lib/Chart.min.js') }}"></script>
            @if(starts_with(Route::current()->getPath(),'projet'))
              <script src="{{ asset('js/lib/vue.js') }}"></script>
              <script src="{{ asset('js/lib/vue-resource.min.js') }}"></script>
              <script src="{{ asset('js/lib/vue-route.js') }}"></script>
              <script src="{{ asset('js/component/projet.component.js') }}"></script>
              <script src="{{ asset('js/component/projet_detail.component.js') }}"></script>
              <script src="{{ asset('js/component/rubrique.component.js') }}"></script>
              <script src="{{ asset('js/component/tache.component.js') }}"></script>
              <script src="{{ asset('js/component/pourcentage.component.js') }}"></script>
              <script src="{{ asset('js/app.js') }}"></script>
            @endif
        @show
    </body>

</html>