<template>
    <div class="relative">
        <transition name="fade-left">
            <div v-if="!table">
                <h2>Home</h2>
                <div v-if="location.players" class="mb-30">
                    Welkom, {{location.players[0].name }} en {{location.players[1].name }}
                </div>
                <div class="w-full flex">
                    <button class="btn btn-primary" v-on:click="start">Start spel</button>
                </div>
                <div id="tables">
                    <button class="btn btn-primary" v-for="t in tables" v-on:click="join(t)">Sluit aan bij tafel {{ t.uuid }}</button>
                </div>
            </div>
        </transition>
        <transition name="fade-right">
            <div class="fixed left-0 pl-40 bottom-0 pb-40 z-1">
                <alert :message="m" v-for="(m, k) in alerts" :key="k"></alert>
            </div>
        </transition>
        <transition name="fade-right">
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
                tables:[]
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
                let self= this;
                axios.post('/start')
                    .then(response => {
                        if(response.data.success){
                            self.alerts.push('Je bent een nieuwe tafel gestart');
                            self.table = response.data.table;
                        }
                    });
            },
            alert(alert){
                this.alerts.push(alert);
            },
            join(t){
                let self = this;
                axios.post('/aansluiten/'+t.uuid)
                    .then(response => {
                        if(response.data.success){
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
