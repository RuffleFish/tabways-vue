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
    <div class="dashboard"> <!-- when do I use sections? -->
      <Header title="Tabways dashboard" />
      <Button text="Add Collection" color="green" />
      <h2>Open tabs</h2>
      <div id="open-tabs" ref="opentabs"> </div>
      <Collection :collection="collection" :icon="icon" />
    </div>
  </div>
</template>

<script>
import Collection from './Collection'
import Button from './Button'
import Header from './Header'
import ButtonSpace from './ButtonSpace'

export default {
  name: 'Dashboard',
  components: {
    Collection,
    Button,
    Header,
    ButtonSpace
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
        icon: '../../images/doc-48x48.png'
    }
  },
  created() {
    this.currentTabs();
  },
  mounted(){

  },
  methods: {
    openSpace() {
      //also disable button after first click?
      //this.style = "background-color:green;" what?
      console.log("opening space");
      // https://dev.to/midhunz/how-to-create-a-simple-chrome-extension-ijk
      chrome.tabs.create({}, function (newTab) {
        let querying = chrome.tabs.query({}, function (tabs) {
          for (let tab of tabs) {
            if (tab.id !== newTab.id) chrome.tabs.remove(tab.id);
          }
        });
      });
      chrome.bookmarks.getTree(this.findAndOpen);
      chrome.tabs.update(newTab.id, {active: true}) // make new tab active again. make sure this works well with callbacks.
      this.currentTabs();
    },
    closeAllTabs() {
      // save? or something.
      chrome.tabs.create({}, function (newTab) {
        let querying = chrome.tabs.query({}, function (tabs) {
          for (let tab of tabs) {
            if (tab.id !== newTab.id) chrome.tabs.remove(tab.id);
          }
        });
      });
      this.currentTabs();
    },
    findAndOpen(bookmarks) {
      console.log('this is the bookmarks object'+bookmarks);
      for (var i = 0; i < bookmarks[0].children.length; i++) {
        if (bookmarks[0].children[i].title === "Other bookmarks") { // looking for "Other bookmarks" folder (through direct children of main Bookmarks folder)
          for (var j = 0; j < bookmarks[0].children[i].children.length; j++) { // look through direct children of "Other bookmarks"
            if (!bookmarks[0].children[i].children[j].url) {          // if there is no url (it's a folder), then we've found the extension folder.
              let newFolder = (bookmarks[0].children[i].children[j]); // save Extension folder id.
              console.log("folder is " + newFolder);
              for (var k = 0; k < bookmarks[0].children[i].children[j].children.length; k++) { //loop through bookmarks in Extension folder.
                console.log("Opening bookmark " + k + "is" + bookmarks[0].children[i].children[j].children[k].title);
                chrome.tabs.create({'url': bookmarks[0].children[i].children[j].children[k].url}, function (tab) { // open each of the bookmarks in the folder.
                  // Tab opened.
                });
              }
            }
          }
        }
      }
      this.currentTabs();
      //
    },
    currentTabs() {
      let vm = this;
      console.log('querying current tabs');
      chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (tabs)  {
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
      function saveCollection(tabs) {
        vm.collection = tabs;
        console.log(vm.collection + "save Colleciton funcion ran")
      }
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
  display:flex;
}
div.sidebar {
  flex: 1 1 20%;
  min-width: 120px;
}
div.dashboard {
  flex: 1 1 80%;
  margin-left: 2rem;
}
</style>