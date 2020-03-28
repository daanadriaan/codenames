<?php

namespace App\Http\Middleware;

class CheckGame{
    public function handle($request, Closure $next, ...$guards)
    {
        if(false){
            return redirect('/');
        }
        return $next($request);
    }
}
