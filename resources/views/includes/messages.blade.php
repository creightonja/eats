@if(count($errors) > 0)
    <div class="row">
        <div class="col-md-12">
            <ul>
                @foreach($errors->all() as $error)
                    <li class="error">{{$error}}</li>
                @endforeach
            </ul>
        </div>
    </div>
@endif
@if(Session::has('message'))
<div class="row">
    <div class="col-md-12">
        <ul>
            <li class="success">{{ Session::get('message') }}</li>
        </ul>
    </div>
</div>
@endif
