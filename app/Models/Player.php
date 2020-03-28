<?php

namespace App\Models;

use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Model;

class Player extends Model{
    use UsesUuid;

    public function tables(){
        return $this->belongsToMany(Table::class)
            ->withPivot('team_id', 'wins_at');
    }

    public function getNameAttribute($val){
        return $val ?? 'Speler '.substr($this->uuid, 0, 2);
    }
}
