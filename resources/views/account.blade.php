@extends('layouts.app')

@section('title')
Account Management
@endsection

@section('page.css')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/dropzone.css" media="screen" title="no title" charset="utf-8">
@endsection

@section('content')
    <section class="row new-post">
        <div class="col-md-6 col-md-offset-3">
            <header><h3>Your Account</h3></header>
            <form action="{{ route('account.save') }}" method="post" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="first_name">First Name</label>
                    <input type="text" name="first_name" class="form-control" value="{{ $user->first_name }}" id="first_name">
                </div>
                <div class="form-group">
                    <label for="last_name">Last Name</label>
                    <input type="text" name="last_name" class="form-control" value="{{ $user->last_name }}" id="last_name">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" name="email" class="form-control" value="{{ $user->email }}" id="email">
                </div>
                <button type="submit" class="btn btn-primary">Save Account</button>
                {{  csrf_field() }}
            </form>
        </div>
    </section>
    <section class="dropzone-container" style="background-image: url('../images/account/{{$user->first_name}}-{{$user->id}}.jpg')">
        <form class="dropzone" id="dropzone" action="../user/{{ $user->id }}/image" method="post">
            {{  csrf_field() }}
        </form>
    </section>
    @if (Storage::disk('local')->has($user->first_name . '-' . $user->id . '.jpg'))
        <section class="row new-post">
            <div class="col-md-6 col-md-offset-3">
                <img src="../images/account/{{$user->first_name}}-{{$user->id}}.jpg" alt="" class="img-responsive">
            </div>
        </section>
    @endif
@endsection

@section('page.js')
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/dropzone.js"></script>
@endsection
