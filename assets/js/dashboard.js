import Vue from 'vue';

import Dashboard from './components/dashboard.vue';
const app = new Vue({
    el: '#app',
    render: createElement => createElement(Dashboard)
});
