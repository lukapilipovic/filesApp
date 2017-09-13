class FileManager {

    constructor() {
        this.content = [];
        this.indexMap = new Map();
    }


    loadStructure(url) {


        //prepare output array


        //get JSON with folder structure


        fetch(url).then(
            function (response) {
                return response.json();
            }).then(
            function (jsonData) {

                let aPos = 0;
                //get root element
                for (let itemKey of Object.keys(jsonData)) {

                    //get children, which are <folder> elements
                    let itemsList = jsonData[itemKey];
                    // console.log(itemsList);




                    //for each <folder> go inside
                    for (let itemKey of Object.keys(itemsList)) {


                        let item = itemsList[itemKey];

                        //create new instance of empty folder
                        let folder = new Folder("emptyFolder");


                        //for each child inside <folder>
                        for (let key of Object.keys(item)) {


                            //if child is folder name
                            if (key === "folderName") {
                                folder.folderName = item[key];

                            }

                            //if child is folderUrl
                            else if (key === "folderUrl") {
                                folder.folderUrl = item[key];

                            }

                            //if it is element
                            else if (key === "folderElements") {


                                for (let im of Object.keys(item[key])) {

                                    let imageUrl = folder.folderUrl + "/svg/" + item[key][im];

                                    //create new Item and add to array of items
                                    let newItem = new Item(folder, imageUrl, aPos);
                                    folder.folderItems.push(newItem);
                                    this.indexMap.set(aPos,newItem.itemUrl);
                                    aPos++;
                                }
                            }
                        }


                        //add current folder to array
                        this.content.push(folder);


                    }

                    this.sortContents();
                    this.displayFolders(this.content);


                }


            }.bind(this));



    }


    sortContents(cond = "ASC") {

        let condition = (cond === "ASC") ? 1 : -1;

        this.content.sort(function (a, b) {

            if (a.folderName < b.folderName) { //sort string ascending
                return (-1 * condition);
            }
            else if (a.folderName > b.folderName) {
                return (1 * condition);
            }
            return 0;
        });

    }


    displayFolders(foldersArray) {


        for (let folder of Object.keys(foldersArray)) {


            document.getElementById("demo").appendChild(Folder.displayFolder(foldersArray[folder]));
        }


    }

    filterIcons(keyword){

        this.indexMap.forEach(

            (value, key) => {
                if (value.includes(keyword)){
                    let id = "imgContainer" + key;
                    //console.log(key, value);

                    document.getElementById('searchResults').appendChild(document.getElementById(id).cloneNode(true));

                }

            });








    }


}








