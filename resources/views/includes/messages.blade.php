@if(count($errors) > 0)
    <div class="row">
        <div class="col-md-4 col-md-4-offset-4 error">
            <ul>
                @foreach($errors->all() as $error)
                    <li>{{$error}}</li>
                @endforeach
            </ul>
        </div>
    </div>
@endif
@if(Session::has('message'))
<div class="row">
    <div class="col-md-4 col-md-4-offset-4 success">
        <ul>
            <li>{{ Session::get('message') }}</li>
        </ul>
    </div>
</div>
@endif
