<template>
    <div>
        <div class="card" v-bind:class="{'flipped': turned, 'drop':ready}">
            <div class="card-inner shadow hover:shadow-lg ease-in-out cursor-pointer rounded">
                <div class="bg-blue-lighter front rounded w-full h-full overflow-hidden" v-on:click="turn">
                    <span class="p-30 z-1">{{ card ? card.name : '' }}</span>
                    <div class="top-0 absolute w-full h-full opacity-10" v-bind:class="{'bg-green-lighter': card.pivot.role === 1,'bg-red':  card.pivot.role === 2, 'bg-blue':  card.pivot.role === 3,'bg-black text-white': card.pivot.role === 4}" v-if="spy"></div>
                </div>
                <div class="back rounded w-full h-full"
                     v-bind:class="{'bg-green-lighter': card.pivot.role === 1,'bg-red':  card.pivot.role === 2, 'bg-blue':  card.pivot.role === 3,'bg-black text-white': card.pivot.role === 4}" v-if="turned > 0">
                    <strong class="p-40"></strong>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['card', 'spy', 'red'],
        data() {
            return {
                ready:false,
                turned: false
            }
        },
        watch: {
            // This would be called anytime the value of title changes
            card(newValue, oldValue) {
                if(this.card.pivot.turned_at) this.turned = true;
            }
        },
        mounted() {
            let self = this;
            if(this.card.pivot.turned_at) this.turned = true;
            setTimeout(function(){
                self.ready = true;
            }, 500);

        },
        methods: {
            turn(){
                this.turned = true;

                if(this.card.pivot.role === 4){
                    console.log('moordenaar');
                    this.$emit('killed');
                }else if(this.card.pivot.role === 1){
                    console.log('burger');
                    this.$emit('wrong');
                }else if(this.card.pivot.role === 2){
                    console.log('rood');
                    if(this.red){
                        // Yeeee!
                        this.$emit('right');
                    }else{
                        // Awwww!
                        this.$emit('wrong');
                    }
                }else{
                    console.log('blauw');
                    if(!this.red){
                        // Yeeee!
                        this.$emit('right');
                    }else{
                        // Awwww!
                        this.$emit('wrong');
                    }
                }

                let self = this;
                axios.post('/draai/'+self.card.id)
                    .then(response => {
                        if (!response.data.success) {
                            this.turned = false;
                        }
                    });

            }
        }
    }
</script>

<style type="text/scss">
    .card{
        background:transparent;
        min-height: 100px;
        height: 10vw;
        perspective: 1000px;
    }
    .card-inner{
        position:relative;
        width:100%;
        height:100%;
        transition:transform 1000ms, box-shadow 300ms; /*cubic-bezier(0.090, 0.410, 0.870, 0.590);*/
        transform-style: preserve-3d;
    }
    .card .front, .card .back{
        width: 100%;
        height: 100%;
        position:absolute;
        backface-visibility: hidden;
    }
    .card .back{
        transform: rotateY(180deg);
    }
    .card.flipped .card-inner{
        transform: rotateY(180deg);
    }
    .card span, .card strong{
        display:block;
        text-align:center;
    }
    @media (min-width:992px){
        .card span, .card strong{
            font-size:18px;
            padding-top:calc(4vw);
        }
    }
    @media (min-width:1200px){
        .card span, .card strong {
            font-size: 22px;
        }
    }

</style>
