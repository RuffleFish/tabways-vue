<template>
  <div class="wrapper">
    <h1>Dashboard Tabways</h1>
    <div id="workspaces" ref="workspaces"></div>
    <h2>Workspaces</h2>
    <a id="workspace" href="#" style="border: 2px solid green; padding: 2px;" @click="openSpace()">Work</a>
    <a id="close-all" href="#" style="border: 2px solid orange; padding: 2px;" @click="closeAllTabs()">x - Close all</a>
    <div class="dashboard"> <!-- when do I use sections? -->
      <h2>Hello there!</h2>
      <p>If you let it, this can be a new tab page.</p>
      <h2>Open tabs</h2>
      <div id="open-tabs" ref="opentabs"> </div>
    </div>
    <Collection :collection="collection" />
  </div>
</template>

<script>
import Collection from './Collection'

export default {
  name: 'Dashboard',
  components: {
    Collection
  },
  data() {
    return {
         collection: []
      // active: true,
      // list: "example.com",
      // icons: {
      //   active: 'images/icon-48x48.png',
      //   inactive: 'images/icon-48x48-off.png'
      // }
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
      for (var i = 0; i < bookmarks[0].children.length; i++) {
        if (bookmarks[0].children[i].title === "Other bookmarks") {
          for (var j = 0; j < bookmarks[0].children[i].children.length; j++) {
            if (!bookmarks[0].children[i].children[j].url) {
              let newFolder = (bookmarks[0].children[i].children[j]); //find extension folder
              console.log("folder is " + newFolder);
              for (var k = 0; k < bookmarks[0].children[i].children[j].children.length; k++) { //loop through bookmarks in Extension folder.
                console.log("Opening bookmark " + k + "is" + bookmarks[0].children[i].children[j].children[k].title);
                chrome.tabs.create({'url': bookmarks[0].children[i].children[j].children[k].url}, function (tab) {
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
        console.log(collection[0]);
        console.log(collection);
        console.log(collection[0].title);
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
