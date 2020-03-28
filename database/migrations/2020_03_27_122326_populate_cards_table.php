<?php

use App\Models\Card;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PopulateCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $words = [
            'zout',
            'zwart',
            'lavendel',
            'blank',
            'grijs',
            'zilver',
            'zalm',
            'chili',
            'schuim',
            'spek',
            'koffie',
            'tong',
            'worst',
            'jasmijn',
            'marine',
            'driehoek',
            'zwanger',
            'manege',
            'boerenkool',
            'confetti',
            'smaragd',
            'cowboy',
            'circuit',
            'trein',
            'kathedraal',
            'landkaart',
            'moestuin',
            'pluto',
            'scout',
            'mandarijn',
            'kathedraal',
            'koets',
            'harnas',
            'honkbal',
            'aquarium',
            'vlaai',
            'paprika',
            'goulash',
            'kaars',
            'zandloper',
            'snor',
            'drol',
            'ruimte',
            'beurs',
            'staf',
            'film',
            'podium',
            'gas',
            'parijs',
            'weegschaal',
            'revolutie',
            'wedstrijd',
            'bron',
            'spijker',
            'model',
            'bestand',
            'netwerk',
            'amazone',
            'asiel',
            'piano',
            'gerecht',
            'taart',
            'kaart',
            'kraan',
            'pasta',
            'single',
            'aanval',
            'schijf'
        ];

        foreach($words as $w){
            $c = new Card;
            $c->name = $w;
            $c->save();
        }
    }
}
