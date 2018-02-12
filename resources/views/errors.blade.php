@if($errors->any())
    <div class="alert alert-danger">
        <p>
            @foreach($errors->all() as $error)
                {{ $error }} <br/>
            @endforeach
        </p>
    </div>
@endif