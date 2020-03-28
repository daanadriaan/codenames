<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Location;
use App\Models\Table;
use Carbon\Carbon;
use Illuminate\Support\Facades\Request;
use Log;

class InviteController extends Controller
{
    public function getOrCreatePlayers(Request $request){

        $l = Location::getOrCreateWithPlayersBySession();

        if($t = $l->table){
            return response()->json([
                'success' => false,
                'table' => $t
            ]);
        }

        return response()->json([
            'success' => true,
            'location' => $l
        ]);
    }
    public function start(){
        $l = Location::getOrCreateWithPlayersBySession();

        if(!$t = $l->table){
            $t = new Table;
            $t->save();

            $l->table_id = $t->id;
            $l->save();
        }

        event(new \App\Events\NewTable);

        return response()->json([
            'success' => true,
            'table' => $t
        ]);
    }
    public function stop(){
        $l = Location::getOrCreateWithPlayersBySession();

        if($t = $l->table){
            $t->finished_at = Carbon::now();
            $t->save();
        }

        event(new \App\Events\Quit($t));

        return response()->json([
            'success' => true,
        ]);
    }

//    public function accept($uuid){
//        if(!$l = Location::where('uuid', $uuid)->first()){
//            return redirect('/');
//        }
//        $l = Location::getOrCreateWithPlayersBySession();
//
//        if($t = $l->table()){
//            $t->finished_at = Carbon::now();
//            $t->save();
//        }
//    }

    public function join(Request $request, $uuid){
        if(!$t = Table::where('uuid', $uuid)->first()){
            return response()->json(['success' => false]);
        }
        $l = Location::getOrCreateWithPlayersBySession();

        if($l->table){
            return response()->json(['success' => false]);
        }

        $l->table_id = $t->id;
        $l->save();

        $t->load('locations');

        event(new \App\Events\Joined($t));

        return response()->json([
            'success' => true,
            'table' => $t
        ]);
    }

    public function chats(Request $request){
        return response()->json([
            'success' => true,
            'chats' => Chat::orderByDesc('id')->get()
        ]);
    }

    public function tables(Request $request){
        return response()->json([
            'success' => true,
            'tables' => Table::orderByDesc('id')->with('players')->get()
        ]);
    }
}
