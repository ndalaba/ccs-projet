 <nav class="navbar navbar-default navbar-fixed-top navbar-cls-top">
    <div class="navbar-header">
        <!--<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>-->
        <a class="navbar-brand" href="{{ url('/projet') }}"><i class="fa fa-home"></i> {{ config('application.name') }}</a>
    </div>
    <div class="notifications-wrapper">
        <ul class="nav navbar-right">
            @if(isset($edit))
                <li><a href="{{ $edit }}">Modifier la page</a></li>
            @endif
            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                <i class="fa fa-user-plus"></i>  <i class="fa fa-caret-down"></i>
                </a>
                <ul class="dropdown-menu dropdown-user">
                  <li>
                     <a class="ajax" href="{{ url('users') }}" title="Utilisateurs"> <i class="fa fa-list "></i> Utilisateurs</a>
                  </li>
                  <li>
                     <a class="ajax" href="{{ url('users/edit') }}" title="Ajouter un utilisateur"> <i class="fa fa-pencil "></i> Ajouter</a>
                  </li>
                    <li>
                       <a class="ajax" href="{{url('users/edit/'.Auth::user()->id)}}"><i class="fa fa-user-plus"></i> Modifier mon profil</a>
                    </li>
                    <li class="divider"></li>
                    <li><a href="{{ url('/auth/logout') }}"><i class="fa fa-sign-out"></i> Logout</a>
                    </li>
                </ul>
            </li>
        </ul>
        <ul class="nav navbar-right" style="margin-right:20px">
            <li>
                <a class="dropdown-toggle" data-toggle="dropdown" href="#" @click="showProjetFrm()">
                    <i class="fa fa-plus"></i> Projet
                </a>
            </li>
        </ul>

    </div>
</nav>
