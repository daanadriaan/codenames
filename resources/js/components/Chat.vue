<template>
    <div>
        <div class="fixed bottom-0 right-0 mr-20">
            <div v-if="chats.length > 0">
                <p>Berichten:</p>
                <ul>
                    <li v-for="chat in chats">
                        {{ chat }}
                    </li>
                </ul>
            </div>
            <button class="btn">Chat</button>
        </div>
    </div>
</template>

<script>
    import Pusher from "pusher-js";

    export default {
        data() {
            return {
                chats:[],
            }
        },
        mounted() {
            this.getChats();
        },
        methods: {
            getChats(){
                axios.post('/get-chats')
                    .then(response => {
                        if(response.data.success){
                            this.chats = response.data.chats;
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
                var channel = pusher.subscribe('chats');
                channel.bind('my-event', function(data) {
                    self.messages.push(JSON.stringify(data));
                });
            }
        }
    }
</script>
