@extends('layout')
@section('title')
    @parent
    | Utilisateurs
@stop
@section('content')
    <div id="page-inner" class="users">
        <div class="row">
            <div class="col-md-12">
                <h2 class="page-head-line">Nos cours <a href="{{ url('users/edit') }}" class="btn btn-primary btn-sm ajax"><i class="fa fa-edit"></i> Ajouter</a></h2>
            </div>
            <div class="col-md12">
                <form  method="post" action="{{url('users/user-action')}}" class="form-inline">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div style="margin: 10px">
                        <div class="form-group">
                            <label>Sélectionnez l’action groupée</label>
                            <select name="action" class="form-control">
                                <option value="-1" selected="selected">Actions groupées</option>
                                <option value="trash">Déplacer dans la Corbeille</option>
                            </select>
                            <input type="submit" name="doaction"  id="doaction" class="btn btn-primary action" value="Appliquer">
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped table-hover">
                            <thead>
                            <tr>
                                <th><input type="checkbox" title="Tout sélectionner" id="select_all"></th>
                                <th>Nom </th>
                                <th>Email</th>
                                <th>Rôle</th>
                                <th>Phone</th>
                                <th>Date</th>
                            </tr>
                            </thead>

                            <tbody>
                            @foreach($users as $user)
                                <tr>
                                    <th>
                                        <input type="checkbox" name="post[]" value="{{$user->id}}">
                                    </th>
                                    <td>
                                        <strong style="float: left; width: 100%"><a class="ajax" href="{{url('users/edit/'.$user->id)}}" title="Modifier">{{ $user->name }}</a></strong>

                                        <div class="row-actions">

                                            <span><a class="ajax" href="{{url('users/edit/'.$user->id)}}" title="Modifier cet élément">Modifier</a> | </span>
                                            @if($user->droit<10)
                                            <span><a class="ajax" style="color: red" class="submitdelete" title="Déplacer cet élément dans la Corbeille" href="{{url('users/destroy/'.$user->id)}}">Mettre à la Corbeille</a> </span>
                                            @endif
                                        </div>
                                    </td>
                                    <td>{{ $user->email }} </td>
                                    <td>{{ $user->fonction }}</td>
                                    <td>{{ $user->phone }}</td>
                                    <td><abbr title="{{ \App\Http\Models\Help::timestampToDate($user->updated_at)  }}">{{ \App\Http\Models\Help::timestampToDate($user->updated_at)  }}</abbr><br> </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
