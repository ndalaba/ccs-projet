@extends('layout')
@section('title')
    @parent
    | Page introuvable!
@stop
@section('content')
    @if(Auth::user())
        @include('inc.admin-bar')
    @endif
    <style>
        body {margin: 0;padding: 0; width: 100%;height: 100%;color: #B0BEC5;display: table;font-weight: 100; font-family: 'Lato','Courgette',cursive; }
        .wrap{margin:0 auto;width:1000px}.logo{margin-top:50px}.logo h1{font-size:200px;color: #B0BEC5;text-align:center;margin-bottom:1px;text-shadow:1px 1px 6px #fff}.logo p{color: #B0BEC5;font-size:20px;margin-top:1px;text-align:center}.logo p span{color: #B0BEC5}.sub a{color:#fff;background:#8F8E8C;text-decoration:none;padding:7px 120px;font-size:13px;font-family:arial,serif;font-weight:700;-webkit-border-radius:3em;-moz-border-radius:.1em;-border-radius:.1em}
    </style>

    <section id="maincontent">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 col-md-9">
                    <div class="wrap">
                        <div class="logo">
                            <h1>404</h1>

                            <p>Erreur! - Page introuvable</p>

                            <div class="sub">
                                <p><a href="{{ url('/') }}">Retour</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {{-- @include('front.inc.mission-stat') --}}
    </section>
@stop