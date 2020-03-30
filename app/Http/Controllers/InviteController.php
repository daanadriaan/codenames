<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\CardOnTable;
use App\Models\Chat;
use App\Models\Location;
use App\Models\Move;
use App\Models\Table;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
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
        $t->load('locations', 'moves');

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
            event(new \App\Events\Quit($t));
        }

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

        $t->load('locations', 'moves');

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

    public function words(Request $request){
        return response()->json([
            'success' => true,
            'words' => Card::orderBy('name')->get()
        ]);
    }

    public function setwords(Request $request){
        foreach($request->words as $w){
            if(isset($w['id'])){
                Card::where('id',$w['id'])->update(['name' => $w['name']]);
            }else{
                Card::insert(['name' => $w['name']]);
            }
        }

        return response()->json([
            'success' => true,
        ]);
    }

    public function tables(Request $request){
        return response()->json([
            'success' => true,
            'tables' => Table::today()
                ->withCount('locations')
                ->having('locations_count', '<', 2)
                ->orderByDesc('id')
                ->with('players')
                ->get()
        ]);
    }

    public function move(Request $request){
        $l = Location::getOrCreateWithPlayersBySession();

        // Get current move
        if(!$m = $l->table->moves()->orderByDesc('id')->first()){
            // First move
            $m = new Move;
            $m->table_id = $l->table_id;
        }elseif($m->turns_left == 0){
            $p = $m;
            // Next move
            $m = new Move;
            $m->is_blue = !$p->is_blue;
            $m->table_id = $l->table_id;
        }
        $m->message = $request->word;
        $m->turns_left = $request->amount;
        $m->save();

        event(new \App\Events\NewWord($l->table, $m));

        return response()->json([
            'success' => true,
            'move' => $m
        ]);
    }

    public function turn(Request $request, Card $card){
        $l = Location::getOrCreateWithPlayersBySession();

        // Get current move
        if($m = $l->table->moves()->where('turns_left','>',0)->orderByDesc('id')->first()){
            // Deal with this turn
            $pivot = CardOnTable::where('table_id', $l->table_id)
                ->where('card_id', $card->id)
                ->first();

            $pivot->turned_at = Carbon::now();
            $pivot->save();

            //Handle proper response
            if($pivot->role == 4){
                // Loses
                $m->turns_left = 0;

                return response()->json([
                    'success' => true,
                    'loses' => true
                ]);
            }elseif($pivot->role == 1){
                // Civilian: Stop
                $m->turns_left = 0;
            }elseif($pivot->role == 2){
                // Red
                if($m->is_blue){
                    // End turn
                    $m->turns_left = 0;
                }else{
                    // Next turn
                    $m->turns_left = $m->turns_left - 1;
                }
            }else{
                // Blue
                if(!$m->is_blue){
                    // End turn
                    $m->turns_left = 0;
                }else{
                    // Next turn
                    $m->turns_left = $m->turns_left - 1;
                }
            }

            // What's next?
            $m->save();

            if($m->turns_left == 0){
                $n = new Move;
                $n->is_blue = !$m->is_blue;
                $n->table_id = $l->table_id;
                $n->save();
            }

            $l->table->load('moves');

            event(new \App\Events\Move($l->table, $card, $pivot));
        }

        return response()->json([
            'success' => true,
            'move' => $m
        ]);
    }
}
