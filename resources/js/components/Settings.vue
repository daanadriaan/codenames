<template>
    <div class="border-blue-lighter border-2 rounded absolute min-w-400 mb-50" style="width:calc(100% - 80px)">
        <div class="border-b-2 border-blue-lighter p-40 text-center text-blue-dull">Woordenlijst</div>
        <transition-group name="fade-up">
            <div v-for="(word,k) in words" :key="word.id" class="relative">
                <input v-model="word.name" max="30" class="text-center border-b-2 border-blue-lighter px-40 max-md:px-20 py-20 w-full" placeholder="Type een woord + enter" v-on:blur="setWords">
                <div class="absolute top-0 right-0 p-20 cursor-pointer" v-on:click="remove(word)">x</div>
            </div>
        </transition-group>
        <div class="px-40 max-md:px-20 py-20 w-full text-blue-dull text-center cursor-pointer" v-on:click="addWord"><i class="fa fa-plus"></i> toevoegen</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                words:[]
            }
        },
        mounted() {
            this.getWords();
        },
        methods: {
            getWords(){
                let self = this;
                axios.post('/get-words')
                    .then(response => {
                        if(response.data.success){
                            self.words = response.data.words;
                        }
                    });
            },
            addWord(){
                this.words.push({id:'x'+Math.random()});
            },
            setWords(){
                let self = this;
                axios.post('/set-words', {words: self.words})
                    .then(response => {});
            },
            remove(word){
                this.words.splice(this.words.indexOf(word), 1);
                axios.post('/remove-word', {word: word})
                    .then(response => {});
            }
        }
    }
</script>
