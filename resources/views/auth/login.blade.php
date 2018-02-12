<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{{ config('application.name') }}   › Entrer</title>
        <!-- BOOTSTRAP STYLES-->
        <link href="{{ asset('css/all.css') }}" rel="stylesheet">
        <!--CUSTOM STYLES-->
    </head>
    <style>
       .redborder{border:2px solid #f96145;border-radius:2px}.hidden{display:none}.visible{display:normal}body{background-color:#F0EEEE}.row{padding:20px 0}.bigicon{font-size:97px;color:#f96145}.contcustom{text-align:center;width:300px;border-radius:.5rem;top:0;bottom:0;left:0;right:0;margin:10px auto;background-color:#fff;padding:20px}input{width:100%;margin-bottom:17px;padding:15px;background-color:#ECF4F4;border-radius:2px;border:none}h2{margin-bottom:20px;font-weight:700;color:#ABABAB}.btn{border-radius:2px;padding:10px}.med{font-size:27px;color:#fff}.medhidden{font-size:27px;color:#f96145;padding:10px;width:100%}.wide{background-color:#8EB7E4;width:100%;-webkit-border-top-right-radius:0;-webkit-border-bottom-right-radius:0;-moz-border-radius-topright:0;-moz-border-radius-bottomright:0;border-top-right-radius:0;border-bottom-right-radius:0}
    </style>
    <body>
        <div class="container">
            <div class="row colored">
                <div id="contentdiv" class="contcustom">
                    <span class="fa fa-spinner bigicon"></span>
                    <h2>Login</h2>
                     @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            @foreach ($errors->all() as $error)
                             <p class="message"> {{ $error }}.<br></p>
                            @endforeach
                        </div>
                    @endif
                    <form  method="post" action="{{ url('/auth/login') }}">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <div>
                            <input type="email" name="email" id="email" value="{{ old('email') }}" size="20" placeholder="adresse mail" >
                            <input type="password" name="password" id="password" placeholder="password" >
                            <div class="checkbox">
                                <label for="remember"><input name="remember" type="checkbox" id="remember" style="width:7%"> Se souvenir</label>
                            </div>
                            <button id="button1" class="btn btn-default wide">Entrer</button>
                        </div>
                     </form>
                    <div>
                        <br>
                        <p>
                            <a href="{{ url('/') }}" title="Perdu" class="btn btn-link" class="text-muted">← Retour à {{ config('application.name') }}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
