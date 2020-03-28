<?php
namespace App\Models;

use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;

class Location extends Model{

    use UsesUuid;

    public static function getOrCreateWithPlayersByIp(){
        if($l = Location::where('ip',Request::ip())->with('players')->first()){
            return $l;
        }

        $l = new Location;
        $l->ip = Request::ip();
        $l->save();

        foreach([1,2] as $i){
            $p = new Player;
            $p->location_id = $l->id;
            $p->save();
        }

        $l->load('players');

        return $l;
    }
    public static function getOrCreateWithPlayersBySession(){
        if(session('location')){
            if($l = Location::where('uuid', session('location'))->with('players')->first()){
                return $l;
            }
        }

        $l = new Location;
        $l->ip = Request::ip();
        $l->save();

        foreach([1,2] as $i){
            $p = new Player;
            $p->location_id = $l->id;
            $p->save();
        }

        session(['location' => $l->uuid]);

        $l->load('players');

        return $l;
    }

    public function players(){
        return $this->hasMany(Player::class);
    }

    public function table(){
        return $this->belongsTo(Table::class);
    }
}
