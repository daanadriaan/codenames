require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import feather from 'feather-icons';
import VueFeather from 'vue-feather';
import Vuex from 'vuex';
import VuePageTransition from 'vue-page-transition';
import $ from 'jquery';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueFeather);
Vue.use(VuePageTransition);

const app = new Vue({
    el: '#app',
    router: new VueRouter(routes)
});

$(function () {
    //All href="#something" will animate
    var $root = $('html, body');
    $('a[href^="#"]').click(function () {
        var href = $.attr(this, 'href');

        $root.animate({
            scrollTop: $(href).offset().top - 150
        }, 500);

        return false;
    });

    feather.replace();
});
