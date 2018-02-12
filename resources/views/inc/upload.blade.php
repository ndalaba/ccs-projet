<link href="{{asset('admin/css/upload.css')}}" rel="stylesheet" />
<div class="modal fade" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" style="width: 300px">
        <div class="modal-content">
            <div class="modal-body" style="overflow: auto;padding: 0px">
                <button type="button" class="close closeUpload" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <form id="upload" method="post" action="{{url('admin/medias/upload-image')}}" enctype="multipart/form-data">
                    <input type="hidden" name="_token" value="{{csrf_token()}}"/>
                    <div id="drop">
                        Drop Here

                        <a>Browse</a>
                        <input type="file" name="upl" multiple />
                    </div>

                    <ul>
                        <!-- The file uploads will be shown here -->
                    </ul>

                </form>
            </div>
        </div>
    </div>
</div>