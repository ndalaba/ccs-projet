<div class="panel panel-default">
    <div class="panel-heading">Image à la Une</div>
    <div class="panel-body">
        <a title="Mettre une image à la Une" href="#" id="set-post-thumbnail" class="thickbox">
            <input type='text' name="image" onchange="readURL(this);" style="display: none" id="imgFile" @if($val->image) value="{{ $val->image }}" @endif/>
        </a>
        <img id="img"  @if($val->image) src="{{ asset('uploads/images/'.$val->image) }}" style="width: 100%" @else style="width: 228px;display: none" @endif alt="your image"  />
        <a href="#"  style="display: inline; float: left; @if($val->image) display: none;  @endif position: relative; z-index: 1;padding: 10px;" data-toggle="modal" data-target="#imageModal" id="imgUneBtn">Mettre une image à la Une</a>
        <a href="#" id="remove-post-thumbnail" onclick="removeImg();return false;" @if(!$val->image)  style="display: none;float: left" @endif>Supprimer l’image à la Une</a>
    </div>
</div>

