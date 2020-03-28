<template>
    <div class="card shadow hover:shadow-lg hover:scale-105 duration-150 ease-in-out cursor-pointer rounded"
        v-bind:class="{'bg-blue-lighter': card}">
        <span class="p-40">{{ card ? card.name : '' }}</span>
    </div>
</template>

<script>
    export default {
        props: ['card'],
        data() {
            return {}
        },
        mounted() {

        },
        methods: {

        }
    }
</script>

<style type="text/scss">
    .card{
        position:relative;
        min-height: 100px;
        height: 10vw;
    }
    .card span{
        position:absolute;
        width:100%;
        text-align:center;
        top: 50%;
        transform:translateY(-50%);
    }

</style>
