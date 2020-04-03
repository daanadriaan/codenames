<template>
    <div class="relative">
        <div class="fixed w-full left-0 top-0 h-full bg-black-transparent opacity-20 z-1 flex items-center" v-if="loading">
            <div id="spinner" class="text-white m-auto text-center text-22">Momentje geduld..<br>Jouw spel wordt geladen</div>
        </div>
        <transition name="fade">
            <div v-if="!table">
                <div class="p-40 border-2 border-blue-lighter rounded mb-20 text-center">
                    <div v-if="location.players">
                        Welkom, {{location.players[0].name }} en {{location.players[1].name }}.
                    </div>
                </div>
                <div class="w-full min-md:flex">
                    <div class="p-40 border-2 border-blue-lighter rounded mb-20 flex-1 text-center flex">
                        <div class="self-center m-auto">
                            <p class="mb-20">Start een nieuw spel:</p>
                            <button class="btn btn-blue" v-on:click="start">Start spel</button>
                        </div>
                    </div>
                    <div class="w-20 flex-none"></div>
                    <div id="tables" class="border-2 border-blue-lighter rounded mb-20 flex-1">
                        <p class="mb-20 border-b-2 border-blue-lighter p-20 pt-40 text-center">Of sluit je aan bij een bestaand spel:</p>
                        <div v-for="t in tables" v-on:click="join(t)" class="cursor-pointer p-20 text-blue text-center">Sluit aan bij tafel {{ t.uuid.substr(0,6) }} <i class="fa fa-angle-right"></i></div>
                        <p v-if="!tables.length" class="p-20 text-center text-blue-light">Er zijn momenteel geen spellen zoekend</p>
                    </div>
                </div>

            </div>
        </transition>

        <div class="fixed left-0 pl-40 bottom-0 pb-40 z-1">
            <alert :message="m" v-for="(m, k) in alerts" :key="k"></alert>
        </div>
        <transition name="fade">
            <game v-if="table" class="absolute w-full top-0 left-0" :table="table" v-on:stop="stop" v-on:alert="alert" v-on:refresh="getOrCreatePlayers"></game>
        </transition>
        <chat></chat>
    </div>
</template>

<script>
    import Pusher from "pusher-js";
    import Game from './Game.vue';
    import Chat from './Chat.vue';
    import Alert from './Alert.vue';

    export default {
        data() {
            return {
                alerts:[],
                messages:[],
                location:[],
                table: null,
                tables:[],
                loading:false
            }
        },
        components:{
            'game' : Game,
            'chat' : Chat,
            'alert': Alert
        },
        mounted(){
            this.initPusher();
            this.getOrCreatePlayers();
            this.getTables();
        },
        methods: {
            getOrCreatePlayers(){
                axios.post('/get-or-create-players')
                    .then(response => {
                        if(response.data.success){
                            this.location = response.data.location;
                        }else if(response.data.table){ // in game
                            this.table = response.data.table;
                        }
                    });
            },
            getTables(){
                let self = this;
                axios.post('/get-tables')
                    .then(response => {
                        if(response.data.success){
                            self.tables = response.data.tables;
                        }
                    });
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
                var channel = pusher.subscribe('global');
                channel.bind('new-table', function(data) {
                    self.alerts.push('Nieuwe tafel');
                    self.getTables();
                });
            },
            start(){
                this.loading = true;
                let self= this;
                axios.post('/start')
                    .then(response => {
                        if(response.data.success){
                            self.loading = false;
                            self.alerts.push('Je bent een nieuwe tafel gestart');
                            self.table = response.data.table;
                        }
                    });
            },
            alert(alert){
                this.alerts.push(alert);
            },
            join(t){
                this.loading = true;
                let self = this;
                axios.post('/aansluiten/'+t.uuid)
                    .then(response => {
                        if(response.data.success){
                            self.loading = false;
                            self.alerts.push('Je bent aangesloten');
                            self.table = response.data.table;
                        }
                    });
            },
            stop(){
                this.table = null;
                this.getTables();
            }
        }
    }
</script>
