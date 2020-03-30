<template>
    <div>
        <div id="header" class="flex mb-20 min-w-800">
            <div id="red" class="flex-1 border-2 bg-white border-red rounded px-20  mb-5 pt-10 flex items-center" v-bind:class="{'opacity-25': !red }">
                <div class="flex-1 mb-10">
                    <div v-bind:class="{'font-bold': table.locations[0].me}">{{ table.locations[0].players[0].name }} <span v-if="table.locations[0].spy"><i class="fa fa-user-secret ml-10 text-blue-light"></i> {{ redMessage }}</span></div>
                    <div v-bind:class="{'font-bold': table.locations[1].me}" v-if="table.locations[1]">{{ table.locations[1].players[0].name }} <span v-if="table.locations[1].spy"><i class="fa fa-user-secret ml-10 text-blue-light"></i> {{ redMessage }}</span></div>
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
                        <div v-bind:class="{'font-bold': table.locations[0].me}"><span v-if="table.locations[0].spy">{{ blueMessage }} <i class="fa fa-user-secret mr-10 text-blue-light"></i></span> {{ table.locations[0].players[1].name }}</div>
                        <div v-bind:class="{'font-bold': table.locations[1].me}" v-if="table.locations[1]"><span v-if="table.locations[1].spy">{{ blueMessage }} <i class="fa fa-user-secret mr-10 text-blue-light"></i></span> {{ table.locations[1].players[1].name }}</div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="grow-y">
            <div id="form" class="relative rounded border-blue-lighter border-2 px-30 py-30 mb-30 min-w-800" v-if="modal">
                <div class="arrow" v-bind="{'right': !red}"></div>
                Jij bent aan zet. Wat gaat het worden?
                <div class="min-sm:flex mt-20">
                    <input class="border-2 rounded border-blue-lighter py-10 px-20 flex-1 min-sm:mr-20" placeholder="woord" v-model="word">
                    <input type=number class="border-2 rounded border-blue-lighter py-10 px-20 flex-1 min-sm:mr-20" placeholder="aantal" v-model="amount">
                    <button class="border-2 rounded border-blue-lighter py-10 px-20 flex-none" v-on:click="sendWord">Let's go!</button>
                </div>
            </div>
        </transition>
        <transition name="grow-y">
            <div id="won" class="relative rounded border-blue-lighter border-2 px-30 py-30 mb-30 min-w-800" v-if="won">
                <div class="arrow" v-bind="{'right': won === 'blue'}"></div>
                <span v-if="won === 'red'">Rood</span><span v-else>Blauw</span> heeft gewonnen!!!
            </div>
        </transition>
        <div id=board class="w-full grid grid-cols-5 gap-4 min-w-800" v-if="table.locations && table.locations.length > 1" v-bind:class="{'pointer-events-none': !unlock}">
            <card v-for="(c, k) in table.cards" :key="c.id" :card="c" :spy="spy" :red="red" v-on:wrong="wrong" v-on:right="right" v-on:killed="killed"></card>
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
                won: false
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
                if(this.table.moves.length > 0){
                    if(this.currentMove.message){
                        if(!this.table.locations[0].me) {
                            return true;
                        }
                    }
                }
                return false;
            },
            red: function(){
                return this.table.moves && (this.table.moves.length == 0 || !this.table.moves[this.table.moves.length - 1].is_blue);
            },
            redMessage:function(){
                return this.red && this.currentMove ? (this.currentMove.message ? this.currentMove.message : 'aan het bedenken..') : '';
            },
            blueMessage:function(){
                return !this.red && this.currentMove ? (this.currentMove.message ? this.currentMove.message : 'aan het bedenken..') : '';
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
                                console.log(response.data);
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
                    bootbox.alert(data.move.message+' '+data.move.turns_left);
                    //self.$emit('alert', 'Het nieuwe woord is '+data.move.message);
                });
            },
            wrong(){
                bootbox.alert('Awwwwwww');
            },
            right(){
                bootbox.alert('Yeeeaaaa');
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
