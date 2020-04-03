<template>
    <div>
        <div class="text-grey-light text-center -mt-50 mb-10">Tafel {{ table.uuid.substr(0,6) }}</div>
        <div id="header" class="flex mb-20 min-w-800">
            <div id="red" class="flex-1 border-2 bg-white border-red rounded px-20  mb-5 pt-10 flex items-center" v-bind:class="{'opacity-25': !red }">
                <div class="flex-1 mb-10">
                    <div v-bind:class="{'font-bold': table.locations[0].me}">{{ table.locations[0].players[0].name }} <span v-if="table.locations[0].spy"><i class="fa fa-user-secret ml-10 text-blue-light"></i></span></div>
                    <div v-bind:class="{'font-bold': table.locations[1].me}" v-if="table.locations[1]">{{ table.locations[1].players[0].name }} <span v-if="table.locations[1].spy"><i class="fa fa-user-secret ml-10 text-blue-light"></i></span></div>
                </div>
                <ul class="flex-none dots">
                    <li class="bg-red" v-for="dot in redLeft"></li>
                </ul>
            </div>
            <div clas="flex-none" style="width:30px"></div>
            <div id="blue" class="flex-1 border-2 border-blue rounded px-20  mb-5 pt-10 flex bg-white items-center" v-bind:class="{'opacity-25': red }">
                <ul class="dots flex-1">
                    <li class="bg-blue" v-for="dot in blueLeft"></li>
                </ul>
                <div class="flex-none mb-10 flex">
                    <div class="flex-1"></div>
                    <div class="text-right">
                        <div v-bind:class="{'font-bold': table.locations[0].me}"><span v-if="table.locations[0].spy"><i class="fa fa-user-secret mr-10 text-blue-light"></i></span> {{ table.locations[0].players[1].name }}</div>
                        <div v-bind:class="{'font-bold': table.locations[1].me}" v-if="table.locations[1]"><span v-if="table.locations[1].spy"><i class="fa fa-user-secret mr-10 text-blue-light"></i></span> {{ table.locations[1].players[1].name }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="table.locations && table.locations.length > 1">
            <transition name="grow-y">
                <div id="form" class="relative rounded border-blue-lighter border-2 px-30 py-30 mb-30 min-w-800" v-if="modal">
                    <div class="arrow" v-bind:class="{'right': !red}"></div>
                    Jij bent aan zet. Wat gaat het worden?
                    <div class="min-sm:flex mt-20">
                        <input class="border-2 rounded border-blue-lighter py-10 px-20 flex-1 min-sm:mr-20" placeholder="woord" v-model="word">
                        <input type=number class="border-2 rounded border-blue-lighter py-10 px-20 flex-1 min-sm:mr-20" placeholder="aantal" v-model="amount">
                        <button class="border-2 rounded border-blue-lighter py-10 px-20 flex-none" v-on:click="sendWord">Let's go!</button>
                    </div>
                </div>
            </transition>
            <transition name="grow-y">
                <div class="relative rounded border-blue-lighter border-2 px-30 py-30 mb-30 min-w-800" v-if="status && !modal">
                    <div class="arrow" v-bind:class="{'right': !red}"></div>
                    <span v-html="status"></span>
                </div>
            </transition>
            <transition name="fade-up">
                <img v-if="gif" :src="gif" class="fixed bottom-0 z-1">
            </transition>
            <transition name="grow-y">
                <div id="won" class="relative rounded border-blue-lighter border-2 px-30 py-30 mb-30 min-w-800" v-if="won">
                    <div class="arrow" v-bind:class="{'right': won === 'blue'}"></div>
                    <span v-if="won === 'red'">Rood</span><span v-else>Blauw</span> heeft gewonnen!!!
                </div>
            </transition>
            <div id=board class="w-full grid grid-cols-5 gap-4 min-w-800" v-bind:class="{'pointer-events-none': !unlock}">
                <card v-for="(c, k) in table.cards" :key="c.id" :card="c" :spy="spy" :red="red" v-on:wrong="wrong" v-on:right="right" v-on:killed="killed"></card>
            </div>
        </div>
        <div v-else>
            Wachten op andere locatie..<br>
        </div>
        <button class="pt-10 pr-10 mt-50" v-on:click="stop">Stop</button>
    </div>
</template>

<script>
    import Pusher from "pusher-js";
    import bootbox from './../bootbox';
    import Card from "./Card";
    import Vue from 'vue';

    export default {
        props: ['table'],
        data() {
            return {
                messages:[],
                modal:false,
                word:'',
                amount:'',
                won: false,
                gif: null,
                gif_yes:[
                    'https://i.giphy.com/media/1rRSUboqI9xHFrcuYg/giphy.webp',
                    'https://media.giphy.com/media/1APhFC9uvva4NLvKnJ/giphy.gif',
                    'https://media.giphy.com/media/3oKIPmQFtQBzRN23hS/giphy.gif',
                    'https://media.giphy.com/media/3o7bucLZDhMRLwvQs0/giphy.gif',
                    'https://media.giphy.com/media/3o7btQH8h0237ix7J6/giphy.gif',
                    'https://media.giphy.com/media/iFPNdg1jMgtxrpgdyZ/giphy.gif',
                    'https://media.giphy.com/media/W5NqY4XmJhwMhpSIE1/giphy.gif',
                    'https://media.giphy.com/media/3ohzdIf977CYNXLECk/giphy.gif',
                    'https://media.giphy.com/media/Xg5PXpBFiBAHuLWEm1/giphy_s.gif',
                    'https://media.giphy.com/media/UqpyIO8Mg9OhBJva13/giphy_s.gif',
                ],
                gif_no:[
                    'https://i.giphy.com/media/1rRSUboqI9xHFrcuYg/giphy.webp',
                    'https://media.giphy.com/media/xT9IggW502xAw99e00/giphy.gif',
                    'https://media.giphy.com/media/l4FGwr6Vu2EDXhz0I/giphy.gif',
                    'https://media.giphy.com/media/BMtYWthbHwzatb1ses/giphy.gif',
                    'https://media.giphy.com/media/xUPGcGuuC115IcDwIg/giphy.gif',
                    'https://media.giphy.com/media/l0Iy3fdlWBTM7CFEI/giphy.gif',
                    'https://media.giphy.com/media/26gR2lRjcT37ROvyE/giphy.gif',
                    'https://media.giphy.com/media/3ohzdYDKUSkwOeXtrW/giphy.gif',
                    'https://media2.giphy.com/media/l4FGKKRzl7d3Yd50Q/giphy.gif?cid=ecf05e47d87624f4e5d9e850982a673822c3c02734dbe917&rid=giphy.gif',
                    'https://media0.giphy.com/media/3ohzdEJyWyi9kfCEAE/giphy.gif?cid=ecf05e47293e52f6b3208b6b6c60cafa1eb1a0d0e70f659c&rid=giphy.gif',
                    'https://media.giphy.com/media/tOgmuwLv6pP7a/giphy_s.gif',
                    'https://media.giphy.com/media/Y3faOvdOcRdKg/giphy_s.gif',
                    'https://media.giphy.com/media/xUA7bbu3ddi0rdETwQ/giphy.gif'
                ],
            }
        },
        filters:{},
        computed: {
            redLeft: function(){
                let length = this.table.cards ? this.table.cards.filter(function (el) {
                    return el.pivot.role === 2 && !el.pivot.turned_at
                }).length : 9;
                if(!length) this.won = 'red';
                return length;
            },
            blueLeft: function(){
                let length = this.table.cards ? this.table.cards.filter(function (el) {
                    return el.pivot.role === 3 && !el.pivot.turned_at
                }).length : 8;
                if(!length) this.won = 'blue';
                return length;
            },
            currentMove: function(){
                return this.table.moves.length > 0 ? this.table.moves[this.table.moves.length - 1] : null;
            },
            spy: function () {
                return this.table.locations[0].me && this.table.locations[0].spy;
            },
            unlock: function(){
                if(this.table.moves.length > 0 && this.currentMove.message){
                    if(!this.table.locations[0].me) {
                        return true;
                    }
                }
                return false;
            },
            red: function(){
                return this.table.moves && (this.table.moves.length == 0 || !this.table.moves[this.table.moves.length - 1].is_blue);
            },
            status:function(){
                if(this.currentMove && this.currentMove.message){
                    return 'Het woord is <strong>'+this.currentMove.message+'</strong>. '+(this.red ? 'Rood' : 'Blauw')+' mag nog '+this.currentMove.turns_left+' keer kiezen';
                }
                return (this.red ? 'Rood' : 'Blauw')+' is aan het bedenken';
            }
        },
        mounted(){
            let self = this;
            this.initPusher();
            if(this.table.locations && this.table.locations.length > 1) self.checkMoves();
        },
        components:{
            'card' : Card,
        },
        methods: {
            checkMoves(){
                if(this.table.moves && this.table.moves.length === 0){
                    if(this.table.locations[0].me && this.table.locations[0].spy) {
                        this.openModal();
                    }
                }
                if(this.table.moves.length > 0){
                    let move = this.table.moves[this.table.moves.length - 1];
                    if(!move.message){
                        if(this.table.locations[0].me) { // And im the spy
                            this.openModal();
                        }
                    }
                    console.log(move.message);
                }
            },
            openModal(){
                this.modal = true;
            },
            sendWord(){
                console.log(this.word);
                this.modal = false;
                let self = this;
                axios.post('/zet', {
                        word: self.word,
                        amount: self.amount
                    }).then(response => {
                        if (response.data.success){
                            self.table.moves.push(response.data.move);
                            self.word = '';
                            self.amount = '';
                        }
                        self.checkMoves();
                    });
            },
            stop(){
                let self = this;
                bootbox.confirm('Weet je het zeker?',function(result){
                    if(result) {
                        self.$emit('stop');
                        axios.post('/stop')
                            .then(response => {
                                if (response.data.success) {

                                }
                            });
                    }
                })
            },
            initPusher() {
                let self = this;

                // Enable pusher logging - don't include this in production
                Pusher.logToConsole = true;

                var pusher = new Pusher('607d2fd507aff039d620', {
                    cluster: 'eu',
                    forceTLS: true
                });

                // Listening to events
                var channel = pusher.subscribe(this.table.uuid);
                channel.bind('joined', function(data) {
                    self.checkMoves();
                    self.$emit('refresh');
                    self.$emit('alert', 'Nieuwe speler is aangesloten');
                });
                channel.bind('quit', function(data) {
                    self.$emit('stop');
                    self.$emit('alert', 'Een speler is gestopt');
                });
                channel.bind('move', function(data) {
                    self.table.moves = data.table.moves;
                    setTimeout(function(){
                        self.checkMoves();
                    }, 2000);
                    self.table.cards.forEach(function(c, i){
                        if(c.id === data.card.id){
                            data.card.pivot = data.pivot;
                            self.$set(self.table.cards, i, data.card);
                            return;
                        }
                    });
                    self.$emit('alert', 'Er is een kaart gekozen');
                });
                channel.bind('new-word', function(data) {
                    self.table.moves.push(data.move);
                    self.$emit('alert', 'Het nieuwe woord is '+data.move.message+' met '+data.move.turns_left+' zetten');
                });
            },
            wrong(){
                let self = this;
                this.gif = this.gif_no[Math.floor(Math.random() * this.gif_no.length)];
                setTimeout(function(){self.gif = null;}, 5000);
            },
            right(){
                let self = this;
                this.gif = this.gif_yes[Math.floor(Math.random() * this.gif_yes.length)];
                setTimeout(function(){self.gif = null;}, 5000);
            },
            killed(){
                this.won = this.red ? 'blue' : 'red';
            }
        }
    }
</script>

<style>
    ul.dots{
        display:flex;
    }
    ul.dots li{
        width:10px; height:10px; margin-right:5px; border-radius:100%;
    }
</style>
