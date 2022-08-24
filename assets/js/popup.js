import Vue from 'vue';
import Popup from './components/Popup.vue';

const app = new Vue({
    el: '#app',
    render: createElement => createElement(Popup)
});

let spaceName = 'work';
let select = document.getElementById('space');
let spaceValue = select.options[select.selectedIndex].value; //get the current space (or goal, down the line) from the dropdown
console.log(spaceValue); // en
let collectionValue = "Open tabs"; // hardcoded for now. get the current collection value.

chrome.runtime.sendMessage({message: {space: spaceValue, collection: collectionValue}}, (response) => {
  console.log(response);
});
