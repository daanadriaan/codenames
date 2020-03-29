<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Codenames</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
        <link href="{{ asset(mix('/css/app.css')) }}" rel="stylesheet">
    </head>
    <body>
        <div id="app" class="flex h-screen">
            <div id=sidebar class="flex-none bg-blue-lighter h-full p-30 w-200 z-1">
                <router-link exact to="/" class="block py-20 flex">
                    <span class="nav-icon pr-10"><i data-feather='home'></i></span>
                    <span class="nav-text">Home</span>
                </router-link>
                <router-link exact to="/settings" class="block py-20 flex">
                    <span class="nav-icon pr-10"><i data-feather='settings'></i></span>
                    <span class="nav-text">Settings</span>
                </router-link>
            </div>
            <div id="window" class="flex-1 p-40 overflow-x-scroll">
                <router-view></router-view>
            </div>
        </div>
    <script src="{{ asset(mix('/js/app.js')) }}"></script>
    </body>
</html>
