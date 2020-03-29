<?php

namespace App\Models;

use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Model;

class Move extends Model{

    use UsesUuid;

    public $timestamps = false;

    public function table(){
        return $this->belongsTo(Table::class);
    }
}
