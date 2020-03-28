<?php

namespace App\Models;

use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Table extends Model{
    use UsesUuid;

    public $with = ['locations', 'cards'];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($table) {
            $table->cards()->attach(Card::inRandomOrder()->take(25)->pluck('id')->toArray());
        });

        static::addGlobalScope('open', function (Builder $builder) {
            $builder->where('finished_at',null);
        });
    }

    public function players(){
        return $this->belongsToMany(Player::class)
            ->withPivot('team_id', 'wins_at');
    }

    public function cards(){
        return $this->belongsToMany(Card::class)
            ->withPivot('index', 'role');
    }

    public function locations(){
        return $this->hasMany(Location::class);
    }
}
