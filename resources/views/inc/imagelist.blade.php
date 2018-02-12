<?php
  function filename($f) {
      return \App\Http\Models\Help::basename($f);
  }
  ?>
<div class="row">
    @foreach($images as $image)
        <div class="col-md-2">
            <figure id="{{filename($image)}}" class="{{filename($image)}}">
                <!--<label for="">{{filename($image)}}</label>-->
                <img src="{{asset((string)$image)}}" style="width: 98%;max-height: 82px;" onclick="insertToUne('{{filename($image)}}')">
                <figcaption>
                    <input type="text" style="font-size: 11px;width: 100%" readonly value="{{ asset('uploads/images/'.filename($image)) }}"/>
                    <a class="delete-tag" onclick="removeImage('{{filename($image)}}')" href="#">Supprimer </a>
                </figcaption>
            </figure>
        </div>
    @endforeach
</div>