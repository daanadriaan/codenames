<template>
    <div class="alert bg-green-lighter border-1 rounded px-20 py-10 mb-5">
        {{ message }}
    </div>
</template>

<script>
    export default {
        props: ['message'],
        data() {
            return {}
        },
        mounted() {

        },
        methods: {

        }
    }
</script>

<style>
    .alert{
        animation: short 4s;
        animation-fill-mode: forwards;
    }

    @keyframes short {
        0%{transform: translateX(-120%); opacity:.5}
        10%{transform: translateX(0%); opacity:1}
        90%{transform: translateX(0%); opacity:1}
        100%{transform: translateX(-120%); opacity:0}
    }
</style>
