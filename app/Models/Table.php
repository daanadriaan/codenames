<?php

namespace App\Models;

use App\Helpers\Helper;
use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Table extends Model{
    use UsesUuid;

    public $with = ['locations', 'cards', 'moves'];

    public $fillable = ['finished_at'];

    const ROLES = [
        1 => 'Burger', // 7
        2 => 'Starter', // 9 Rood
        3 => 'Volger', // 8 Blauw
        4 => 'Moordenaar' // 1
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($table) {
            $roles = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,4];
            shuffle($roles);
            $ids = Card::inRandomOrder()->take(25)->pluck('id')->toArray();
            foreach($ids as $k => $id){
                $table->cards()->attach($id, ['role' => $roles[$k]]);
            }

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
            ->withPivot('index', 'role', 'turned_at');
    }

    public function locations(){
        return $this->hasMany(Location::class)->orderBy('updated_at');
    }
    public function moves(){
        return $this->hasMany(Move::class);
    }

    public function scopeToday($q){
        return $q->where('created_at','>', \Carbon\Carbon::now()->subDay());
    }
}
