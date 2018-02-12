@extends(((Request::ajax()) ? 'layout-ajax' : 'layout'))
@section('title')
    @parent
    | D’un coup d’œil
@stop
@section('content')
    <div id="page-inner" class="home">
        <div class="row">
            <div class="col-md-12">
                <h1 class="page-head-line">Tableau de bord</h1>
                <div class="list-group">
                    <h4 class="list-group-item-heading">Projets</h4>
                </div>
            </div>
        </div>

        <div class="row">
            <div class=" col-md-3 col-sm-3">
                <div class="style-box-one Style-one-clr-one">
                    <a href="#" class="ajax">
                        <h3> articles</h3>
                    </a>
                </div>
            </div>
        </div>
    </div>
@endsection
