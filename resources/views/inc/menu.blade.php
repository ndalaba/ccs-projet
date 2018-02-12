<nav  class="navbar-default navbar-side" role="navigation">
    <div class="sidebar-collapse">
        <ul class="nav" id="main-menu">
            <li>
                <div class="user-img-div">
                    <img src="{{ asset('/img/f5adf3427f58c4043955a9e6307c1fe2.png') }}" class="img-circle" />
                </div>
            </li>
            <li style="text-align:center">
                <a class="ajax" href="{{url('users/edit/'.Auth::user()->id)}}" title="Profil"> <strong> {{ Auth::user()->name }} </strong></a>
            </li>
            <li>
                <a id="home" class="active-menu ajax" title="Tableau de bord"  href="{{ url('/') }}"><i class="fa fa-desktop "></i>Tableau de bord</a>
            </li>
            <li>
                <a href="#" id="maersk"><i class="fa fa-institution"></i>MAERKS <span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                        <a href="#"> <i class="fa fa-codepen"></i> Invoices <span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level nav-3-level">
                            <li>
                                <a class="ajax" href="{{ url('ml/invoices') }}"  title="Invoices"> <i class="fa fa-file "></i> Invoices</a>
                            </li>
                            <li>
                                <a class="ajax" href="{{ url('ml/invoices/toices') }}" title="Types of invoices"> <i class="fa fa-code "></i> Types</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                       <a class="ajax" href="{{ url('ml/voyages') }}" title="Les voyages"> <i class="fa fa-ship "></i> Voyages</a>
                    </li>
                    <li>
                       <a href="#"> <i class="fa fa-codepen"></i> Services <span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level nav-3-level">
                            <li>
                                <a class="ajax" href="{{ url('ml/services/services') }}"  title="Services"> <i class="fa fa-codepen "></i> Services</a>
                            </li>
                            <li>
                                <a class="ajax" href="{{ url('ml/services/rubriques') }}" title="Services rubriques"> <i class="fa fa-code "></i> Rubriques</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            @if(Auth::user()->droit >= 10)
              <li>
                <a id="users" href="#"><i class="fa fa-users "></i> Utilisateurs <span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                       <a class="ajax" href="{{ url('users') }}" title="Utilisateurs"> <i class="fa fa-list "></i> Utilisateurs</a>
                    </li>
                    <li>
                       <a class="ajax" href="{{ url('users/edit') }}" title="Ajouter un utilisateur"> <i class="fa fa-pencil "></i> Ajouter</a>
                    </li>
                    <li>
                       <a class="ajax" href="{{url('users/edit/'.Auth::user()->id)}}" title="mon profils"> <i class="fa fa-pencil "></i> Profil</a>
                    </li>                                                    
                </ul>
             </li>
            @endif
        </ul>
    </div>
</nav>