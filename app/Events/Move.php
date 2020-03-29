<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class Move implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $table;
    public $card;
    public $pivot;

    public function __construct($table, $card, $pivot)
    {
        $this->table = $table;
        $this->card = $card;
        $this->pivot = $pivot;
    }

    public function broadcastOn()
    {
        return [$this->table->uuid];
    }

    public function broadcastAs()
    {
        return 'move';
    }
}
