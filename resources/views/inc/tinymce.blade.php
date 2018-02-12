<script src="{{asset('admin/js/tinymce/tinymce.min.js')}}"></script>
    <script type="text/javascript">

        tinymce.init({
            selector: "#contenu",
            menubar:true,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code ",
                "insertdatetime media table contextmenu paste"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image youtube"
        });
    </script>