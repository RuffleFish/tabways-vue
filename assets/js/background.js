console.log("background running!");
// chrome.storage.sync.set({'extensionsFolderId': ''}); uncomment to RESET storage.
let space = '';
let collection = '';
let otherBookmarks = '';
let tabways = {}; // extension folder bookmark object returned by Chrome API
let canContinue; // if true, there is no repeating bookmark/folder entries and saving a bookmark/folder can continue.
let ifCreateBookmark = true;
let allBookmarks = {}; // whole bookmark tree object returned by Chrome API
let spaceFolderID = ''; // id of space folder
let tabwaysExists = false; // does the extension folder exist? default, no.

// chrome.bookmarks.getTree(getFromID);
//
// function getFromID(bookmarks) {
//
// }


// https://stackoverflow.com/questions/15329271/how-do-i-get-the-id-of-an-added-bookmarks-folder
// might need callbacks for this. get root folder id?? is this even necessary
// https://bugs.chromium.org/p/chromium/issues/detail?id=29190
// onTree() - can put return somewhere to optimize. other ways to optimize
function exploreTree(bookmarks) {

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
}

function onTree(bookmarks) {
    allBookmarks = bookmarks; // put the bookmark tree, returned by onTree(bookmarks) in a global variable
    exploreTree(allBookmarks); // call a function to explore the tree and bookmark/create folders.

    if (!tabwaysExists) {
        // create Tabways folder (extension folder) if it doesn't exist yet!
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
            console.log (parent.children[i].title +"vs" +newitemtitle);
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
    canContinue = true; //reset variable
    canContinue = checkIfExists(tabways, space); // check if folder (space) already exists
    //console.log(tabways.children[1]);
    //console.log(tabways.children.length);

    if (canContinue === true) { // if space folder doesn't exist, create it and then bookmark the link.
        console.log(canContinue + "We'll make a space folder");
        chrome.bookmarks.create({ // create space folder
                'parentId': extensionsFolderId,
                'title': space
            },
            function (spaceFolder) {
                console.log("added folder: " + spaceFolder.title);
                // save space folder!

                if (ifCreateBookmark) { // check whether to create a bookmark or a collection folder.
                    chrome.bookmarks.create({ // create bookmark
                        'parentId': spaceFolder.id,
                        'title': tabs[0].title,
                        'url': tabs[0].url
                    });
                }
                else { // if creating collection folder
                    console.log("will create collection folder." +collection)

                    chrome.bookmarks.create({
                        'parentId': spaceFolder.id,
                        'title': collection
                    });
                }
            }
        );
        console.log(tabs[0].title + 'bookmark created in ' + extensionsFolderId);
    }
    else {

        console.log(canContinue + "We'll make a bookmark only");
        // if space folder exists, find its ID and only bookmark the link.
        // CREATE BOOKMARK in space folder directly
        for (var i = 0; i < tabways.children.length; i++){
            if (tabways.children[i].title === space) {
                chrome.bookmarks.create({ // create bookmark
                    'parentId': tabways.children[i].id,
                    'title': tabs[0].title,
                    'url': tabs[0].url
                });
            }
        }

        if (!ifCreateBookmark) {   // if goal is to create collection:
            // do an additional check: is there another collection with the same name?

            // get space folder id from tabways obj from space name.
            for (var i = 0; i < tabways.children.length; i++) {
                if (tabways.children[i].title === space) {
                    console.log("space already exists")
                    spaceFolderID = tabways.children[i].id // put id of space folder into a global variable
                }
            }

            for (var i = 0; i < tabways.children.length; i++){
                if (tabways.children[i].title === space) {
                    console.log("creating " + collection + " in " + spaceFolderID)
                    chrome.bookmarks.create({ // create collectionfolder
                        'parentId': spaceFolderID,
                        'title': collection
                    });
                }
            }


            // canContinue = checkIfExists(tabways, spaceFolderID[0].title);
            // console.log ("we can continue with the collection"+canContinue);
            //
            // chrome.bookmarks.create({ // create bookmark
            //     'parentId': spaceFolderID.children[0].id,
            //     'title': tabs[0].title,
            //     'url': tabs[0].url
            // });
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
    if (request.message.origin === 'background') {
    console.log("Got message from dashboard script: ", request.message, sender.title);
    sendResponse("heard you, background!");
    space = request.message.space;
    collection = request.message.collection;
    // console.log("here are the names"+space+collection);
    ifCreateBookmark = false;
    chrome.bookmarks.getTree(onTree);
    }
    else {
        console.log("Got message from popup script: ", request.message, sender.title);
        // let currentTab = askCurrentTab();
        space = request.message.space;
        collection = request.message.collection;
        sendResponse('OK, popup');
        // EDIT - remove edit later. uncomment the onTree in start Bookmarking.
        // use promises with .then
        chrome.bookmarks.getTree(onTree); // callback to get bookmark tree via Chrome API
    }
    return true; // this helps the listener works well when there's multiple messages and scripts
})
