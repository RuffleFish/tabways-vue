import Vue from 'vue';
import Popup from './components/Popup.vue';

const app = new Vue({
    el: '#app',
    render: createElement => createElement(Popup)
});

let spaceName = 'work';
let select = document.getElementById('space');
let spaceValue = select.options[select.selectedIndex].value;
console.log(spaceValue); // en
let collectionValue = "Open tabs";

chrome.runtime.sendMessage({message: {space: spaceValue, collection: collectionValue}}, (response) => {
  console.log(response);
});
