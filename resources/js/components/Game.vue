<template>
    <div>
        <h2>Spel</h2>
        <button class="fixed top-0 right-0 pt-10 pr-10 mr-20 mt-30" v-on:click="stop">Stop</button>
        <div id=board class="w-full grid grid-cols-5 gap-4 min-w-800" v-if="table.locations && table.locations.length > 1">
            <card v-for="(c, k) in table.cards" :key="k" :card="c"></card>
        </div>
        <div v-else>
            Wachten op andere locatie..<br>
        </div>
    </div>
</template>

<script>
    import Pusher from "pusher-js";
    import bootbox from './../bootbox';
    import Card from "./Card";

    export default {
        props: ['table'],
        data() {
            return {
                messages:[],
                location:[],
            }
        },
        mounted() {
            this.initPusher();
        },
        components:{
            'card' : Card,
        },
        methods: {
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
                    self.$emit('refresh');
                    self.$emit('alert', 'Nieuwe speler is aangesloten');
                });
                channel.bind('quit', function(data) {
                    self.$emit('stop');
                    self.$emit('alert', 'Een speler is gestopt');
                });
            }
        }
    }
</script>
