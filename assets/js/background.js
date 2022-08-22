console.log("extension running!");
// chrome.storage.sync.set({'extensionsFolderId': ''}); uncomment to RESET storage.
let space = '';
let collection = '';
let otherBookmarks = '';
let tabways = {};
let canContinue;

// https://stackoverflow.com/questions/15329271/how-do-i-get-the-id-of-an-added-bookmarks-folder
// might need callbacks for this. get root folder id?? is this even necessary
// https://bugs.chromium.org/p/chromium/issues/detail?id=29190
// onTree() - can put return somewhere to optimize. other ways to optimize
function onTree(bookmarks) {
    let tabwaysExists = false;
    for (var i = 0; i < bookmarks[0].children.length; i++) {
        if (bookmarks[0].children[i].title === "Other bookmarks") { // looking for "Other bookmarks" folder (through direct children of main Bookmarks folder)
            otherBookmarks = bookmarks[0].children[i].id;
            for (var j = 0; j < bookmarks[0].children[i].children.length; j++) { // look through direct children of "Other bookmarks"
                if (!bookmarks[0].children[i].children[j].url && bookmarks[0].children[i].children[j].title === "Tabways") { // if there is no url (it's a folder), then we've found a folder.
                    let newFolder = (bookmarks[0].children[i].children[j].id); // put the ID in NewFolder var. Of already created Extensions folder
                    console.log("folder name is " + newFolder + bookmarks[0].children[i].children[j].title);
                    saveFolderId(newFolder); //save folder ID to Chrome storage.
                    tabwaysExists = true;
                    tabways = bookmarks[0].children[i].children[j]; // put the extension folder Object in a global variable for later use.
                }
                else {
                    !tabwaysExists;
                }

                    }
                }
        }
    // to fix the async set/get thing -
    // put the other code in a function, and run it from here.
    if (!tabwaysExists) {
        // create Tabways folder!
        console.log("Tabways folder will be created in" +otherBookmarks.id)
        chrome.bookmarks.create({
            'parentId': otherBookmarks.id,
            'title': "Tabways"},
            function(tabwaysFolder) {
                tabways = tabwaysFolder; // put the extension folder Object in a global variable for later use.
                console.log("added folder: " + tabwaysFolder.title);
                saveFolderId(tabwaysFolder.id);
            }
        );
    }
}

// can't save bookmarks in root folders.
// CHECK if bookmark folder exists, so as not to create it x2.
function checkIfExists(parent, newitemtitle) {
    for (var i = 0; i < parent.children.length; i++){
        if (!parent.children[i].url && parent.children[i].title === newitemtitle) { // if the new item (bookm./folder) has the same name another item in the folder
            console.log ("Checked if it exists - "+canContinue);
            console.log (parent.children[i].title +"vs"+newitemtitle);
            return canContinue = false;
        }
        else {
            console.log ("It doesn't exist - "+canContinue);
            console.log (parent.children[i].title +"vs"+newitemtitle);
        }
    }
    return canContinue;

}


function createBookmark(extensionsFolderId, tabs) {
    canContinue = true;
    console.log(typeof (extensionsFolderId)); // it's a str
    //console.log('space name is' + space);
    //console.log(tabways.children[1]);
    //console.log(tabways.children.length);
    canContinue = checkIfExists(tabways, space);
    console.log ("we can continue"+canContinue);
    // if space folder doesn't exist, create it and then bookmark the link.
    if (canContinue === true) {
        console.log(canContinue + "We'll make a space folder");
        chrome.bookmarks.create({ // create space folder
                'parentId': extensionsFolderId,
                'title': space
            },
            function (spaceFolder) {
                console.log("added folder: " + spaceFolder.title);
                chrome.bookmarks.create({ // create bookmark
                    'parentId': spaceFolder.id,
                    'title': tabs[0].title,
                    'url': tabs[0].url
                });
            }
        );
        console.log(tabs[0].title + 'bookmark created in ' + extensionsFolderId);
    }
    else {

        console.log(canContinue + "We'll make a bookmark just");
        // if space folder exists, find its ID and only bookmark the link.
            console.log("already exists, just added the bookmark. "+canContinue );
            for (var i = 0; i < tabways.children.length; i++){
                if (tabways.children[i].title === space) {
                    chrome.bookmarks.create({ // create bookmark
                        'parentId': tabways.children[i].id,
                        'title': tabs[0].title,
                        'url': tabs[0].url
                    });
                }
        }
    }
}

function startBookmarking(tabs) {
// console.log(Object.keys(currentTab));
//console.log(JSON.stringify(currentTab));
    console.log("start bookmarking!");

    // onTree() loops through it, finding "Other bookmarks", and then the extension folder
    // then it calls saveFolderId() which saves the extension folder id to Chrome storage via the API.
    chrome.storage.sync.get(['folderId'], function (result) { // look for "Extensions folder" saved id.

        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {  // if "Extensions folder exists, create the bookmark.
            console.log("ran query!");
            createBookmark(result.folderId, tabs);
        });

        // console.log('Value currently is ' + result.folderId); // this is running before the callback comes through. might  create issues.
        //
        // let test = result.folderId;  // save the "Extensions folder" saved id to a test variable.
        // console.log('Test variable says folder is ' + test + 'here' + tabs);
        //
        // if (test === undefined) {  // if "Extensions folder" saved id doesn't exist.
        //
        //     chrome.storage.sync.get(['otherBookmarksID'], function () {
        //         console.log('otherBookmark retrieved, equals  ' + otherBookmarksID);
        //
        //     });
        //     chrome.bookmarks.create({
        //             'parentId': otherBookmarksID,
        //             'title': 'Extension bookmarks'
        //         },
        //         function (newFolder) {
        //             console.log("added folder: " + newFolder.title);
        //             createBookmark(newFolder.id, tabs);
        //             saveFolderId(newFolder.id);
        //         });
        // } else {
        // }

    });
}


function saveFolderId(extensionsFolderId) {
    chrome.storage.sync.set({'folderId': extensionsFolderId}, function () {
        console.log('Value is set to ' + extensionsFolderId);
        startBookmarking();
    });
}

// function getFolderId(tabs) {
//   chrome.storage.sync.get(['folderId'], function(result) {
//   console.log('Value currently is ' + result.folderId);
//   createBookmark( result.folderId, tabs);
//   console.log('tabs is '+tabs + ' at folderID' +result.folderId);
//   });
// }


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("Got message from popup script: ", request.message);
    // let currentTab = askCurrentTab();
    space = request.message.space;
    collection = request.message.collection;
    sendResponse('OK');
    // EDIT - remove edit later. uncomment the onTree in start Bookmarking.
    // use promises with .then
    chrome.bookmarks.getTree(onTree); // callback to get bookmark tree via Chrome API
})
