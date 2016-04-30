<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>@yield('title')</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        <link rel="stylesheet" href="{{ URL::to('src/css/main.css') }}" media="screen" title="no title" charset="utf-8">
    </head>
    <body>
        @include('includes.header')
        <div class="container">
            @yield('content')
        </div>
    </body>
</html>
