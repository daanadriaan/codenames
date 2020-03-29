<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NewWord implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $table;
    public $move;

    public function __construct($table, $move)
    {
        $this->table = $table;
        $this->move = $move;
    }

    public function broadcastOn()
    {
        return [$this->table->uuid];
    }

    public function broadcastAs()
    {
        return 'new-word';
    }
}
