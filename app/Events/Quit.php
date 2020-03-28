<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class Quit implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $table;

    public function __construct($table)
    {
        $this->table = $table;
    }

    public function broadcastOn()
    {
        return [$this->table->uuid];
    }

    public function broadcastAs()
    {
        return 'quit';
    }
}
