<!DOCTYPE html>
<html>
    <head>
        <base href='/'>
        <title>Book Manager {{ app('env') }}</title>
        @if (App::environment('production'))
            <link rel="stylesheet" type="text/css" href="{{ elixir('css/all.css') }}">
        @else
            <link rel="stylesheet" type="text/css" href="{{ elixir('css/app.css') }}">
        @endif
    </head>
    <body>
        <div class="container-fluid">
            <my-app>Loading...</my-app>
            @if (App::environment('production'))
                <script src="{{ elixir('js/all.js') }}"></script>
            @else
                <script src="{{ elixir('js/vendor.js') }}"></script>
                <script src="{{ elixir('js/app.js') }}"></script>
            @endif
        </div>
    </body>
</html>
