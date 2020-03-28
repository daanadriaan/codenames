<template>
    <div class="card" v-bind:class="{'flipped': turned}">
        <div class="card-inner shadow hover:shadow-lg duration-150 ease-in-out cursor-pointer">
            <div class="bg-blue-lighter front rounded w-full h-full" v-on:click="turn">
                <span class="p-40">{{ card ? card.name : '' }}</span>
            </div>
            <div class="back rounded w-full h-full"
                 v-bind:class="{'bg-green-lighter': card.pivot.role === 1,'bg-red':  card.pivot.role === 2, 'bg-blue':  card.pivot.role === 3,'bg-black text-white': card.pivot.role === 4}" v-if="turned">
                <strong class="p-40"></strong>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['card'],
        data() {
            return {
                turned: false
            }
        },
        mounted() {

        },
        methods: {
            turn(){
                this.turned = true;
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
        transition:transform 1000ms; /*cubic-bezier(0.090, 0.410, 0.870, 0.590);*/
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
            padding-top:calc(4vw);
        }
    }

</style>
