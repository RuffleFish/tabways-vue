<template>
  <div class="container-wrapper">
    <div class="sidebar">
      <div id="workspaces" ref="workspaces"></div>
      <!--  <h2>Workspaces</h2>-->
      <ButtonSpace @clicked="openSpace()" text="Work" iconSpace="../../images/laptop.png"/>
      <ButtonSpace @clicked="openSpace()" text="Music" iconSpace="../../images/cube.png"/>
      <ButtonSpace @clicked="openSpace()" text="Rest" iconSpace="../../images/coffee.png"/>
      <Button @clicked="closeAllTabs()" text="close all tabs" color="red"/>
      <!--    <a id="workspace" href="#" ">Work</a>-->
      <!--    <a id="close-all" href="#" @click="closeAllTabs()">x - Close all</a>-->
    </div>
    <div ref="container" class="dashboard"> <!-- when do I use sections? -->
      <Header title="Tabways dashboard"/>
      <AddCollection @clicked="addCollection()" />
<!--      <div id="open-tabs" ref="opentabs"></div>-->
      <Collection :collection="collection" :icon="icon"/>
    </div>
    <RewardSpace/>
  </div>
</template>

<script>
import Vue from 'vue' // added so addCollection would work well.
import Collection from './Collection'
import Button from './Button'
import Header from './Header'
import ButtonSpace from './ButtonSpace'
import RewardSpace from './RewardSpace'
import AddCollection from './AddCollection'

export default {
  name: 'Dashboard',
  components: {
    Collection,
    Button,
    Header,
    ButtonSpace,
    RewardSpace,
    AddCollection
  },
  data() {
    return {
      collection: [],
      // active: true,
      // list: "example.com",
      // icons: {
      //   active: 'images/icon-48x48.png',
      //   inactive: 'images/icon-48x48-off.png'
      // }
      icon: '../../images/doc-48x48.png',
      spaceName: '',
      collectionName: ''
    }
  },
  created() {
    this.currentTabs();
    this.getSpaceAndCollection();
  },
  mounted() {

  },
  methods: {
    addCollection() {
      // https://css-tricks.com/creating-vue-js-component-instances-programmatically/
      console.log("collection added");
      var ComponentClass = Vue.extend(Collection);
      var instance = new ComponentClass()({ // create a new component class and pass data into it
        propsData: { collectionName: 'primary' }
      });
      instance.$slots.default = [ 'Click me!' ] //pass a string to the component
      instance.$mount(); // pass nothing
      this.$refs.container.appendChild(instance.$el);
    },
    openSpace() {
      //also disable button after first click?
      // https://dev.to/midhunz/how-to-create-a-simple-chrome-extension-ijk
      this.currentTabs();
      chrome.tabs.create({}, function (newTab) {
        let querying = chrome.tabs.query({}, function (tabs) {
          for (let tab of tabs) {
            if (tab.id !== newTab.id) chrome.tabs.remove(tab.id);
          }
          chrome.tabs.update(newTab.id, {active: true}) // make new tab active again. make sure this works well with callbacks.
        });
      });
      chrome.bookmarks.getTree(this.findAndOpen);
    },
    closeAllTabs() {
      // save? or something.
      this.currentTabs();
      chrome.tabs.create({}, function (newTab) {
        let querying = chrome.tabs.query({}, function (tabs) {
          for (let tab of tabs) {
            if (tab.id !== newTab.id) chrome.tabs.remove(tab.id);
          }
        });
      });
    },
    findAndOpen(bookmarks) {
      // save current ones in currently open space
      // close current ones
      // loop through and open bookmarks in button-indicated space
      console.log('this is the bookmarks object' + bookmarks);
      for (var i = 0; i < bookmarks[0].children.length; i++) {
        if (bookmarks[0].children[i].title === "Other bookmarks") { // looking for "Other bookmarks" folder (through direct children of main Bookmarks folder)
          for (var j = 0; j < bookmarks[0].children[i].children.length; j++) { // look through direct children of "Other bookmarks"
            if (!bookmarks[0].children[i].children[j].url) {          // if there is no url (it's a folder), then we've found a folder.
              if (bookmarks[0].children[i].children[j].title === "Tabways"){ // check if it's the extension folder.
                let newFolder = (bookmarks[0].children[i].children[j]); // save Extension folder id.
                console.log("folder is " + newFolder);
                for (var k = 0; k < bookmarks[0].children[i].children[j].children.length; k++) { //loop through bookmarks in Extension folder.
                  console.log("Opening bookmark " + k + "is" + bookmarks[0].children[i].children[j].children[k].title);
                  chrome.tabs.create({'url': bookmarks[0].children[i].children[j].children[k].url}, function (tab) { // open each of the bookmarks in the folder.
                    // Tab opened.
                  });
                }
              }
              else {
                // create Tabways folder!
                console.log("The collection or space doesn't exist.");
              }
            }
          }
        }
      }
      // this.currentTabs();
      //
    },
    currentTabs() {
      let vm = this; // pass "this" to a variable. Otherwise wouldn't be able to access Vue "this" inside of query function.
      console.log('querying current tabs');
      chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
        vm.collection = tabs;
        console.log(vm.collection[0]);
        console.log(vm.collection);
        console.log(vm.collection[0].title);
        saveCollection(tabs);
        /*
        let div = document.createElement("div");
        let p = document.createElement("p");
        this.$refs.opentabs.append("The tabs you're on are:", p);
        console.log("the open tabs are"+ tabs[0] + tabs.length);

        this.$refs.opentabs.innerHTML += ('<ul>');
        for (let i = 0; i < tabs.length; i++) {
          this.$refs.opentabs.innerHTML += (`<li><a href="${tabs[i].url}"> ${tabs[i].title} </a></li>`);

        }
        this.$refs.opentabs.innerHTML += ('</ul>');

         */
      });

      function saveCollection() {
        // vm.collection = tabs;
        console.log(vm.collection+ "save collection")
      }
    },
    getSpaceAndCollection() {

    }
  }
}
</script>

<style>
body {
  background-color: #f2f2f2;
}

btn {
  font-family: 'Titillium Web', Arial, Helvetica, sans-serif;
  background-color: green;
  padding: 1rem 2rem 1rem 2rem;
}

div.container-wrapper {
  display: flex;
}

div.sidebar {
  flex: 1 1 20%;
  min-width: 120px;
}

div.dashboard {
  flex: 1 1 80%;
  margin-left: 2rem;
}
div.addCollection {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>