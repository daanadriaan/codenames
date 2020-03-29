<?php
namespace App\Models;

use App\Traits\UsesUuid;
use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;

class Location extends Model{

    use UsesUuid;

    public $with = ['players'];
    public $appends = ['me', 'spy'];

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

    public function getMeAttribute(){
        return $this->uuid == session('location');
    }

    public function getSpyAttribute(){
        return Location::where('table_id', $this->table_id)->first()->id === $this->id;
    }
}
