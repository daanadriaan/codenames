<?php

namespace App\Http\Middleware;

use Closure;

class CheckGame{

    public function handle($request, Closure $next)
    {
        if(false){
            return redirect('/');
        }
        return $next($request);
    }
}
