import Vue from 'vue';
import Popup from './components/Popup.vue';

const app = new Vue({
    el: '#app',
    render: createElement => createElement(Popup)
});

chrome.runtime.sendMessage({message: "hi"}, (response) => {
  console.log(response);
});
