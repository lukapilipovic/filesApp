class Folder {

    constructor(folderName, folderUrl = "",  folderParent = null, folderItems = []) {
        this.folderName = folderName;
        this.folderUrl = folderUrl;
        this.folderParent = folderParent;
        this.folderItems = folderItems;
    }


    static displayFolder(folder) {


        //prepare for output

        let fragment = document.createDocumentFragment();

        let newSection = document.createElement("div");
        newSection.id = folder.folderName;
        newSection.className = "folder";

        let h = document.createElement("H1");
        let t = document.createTextNode(folder.folderName);
        h.appendChild(t);

        newSection.appendChild(h);



        // prepare all items

        for (let item of Object.keys(folder.folderItems)) {

            newSection.appendChild(Item.displayItem(folder.folderItems[item]));


        }

        fragment.appendChild(newSection);


        return fragment;
    }



}