<script>
    var host='{{ url('') }}';
</script>
@yield('content')
<footer class="footer">
    &copy; {{ date('Y')}} {{ config('application.name') }} | Par : <a href="http://guinee-webdev.com" target="_blank">GUINEE-WEBDEV</a>
</footer>