class FileManager {

    constructor(fileContents = []) {

        this.fileContents = fileContents;
    }




    loadStructure(url){


        //prepare output array
        let contentArray = [];

        //get JSON with folder structure
        fetch(url).then(
            function (response) {
                return response.json();
            }).then(function (jsonData) {


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
                                let newItem = new Item(folder, imageUrl);
                                folder.folderItems.push(newItem);
                            }
                        }
                    }
                    //add current folder to array
                    contentArray.push(folder);
                }
            }

            FileManager.sortContents(contentArray);

        });

        return contentArray;


    }

    static sortContents(arr,cond = "ASC"){

            let condition = (cond=="ASC") ? 1 : -1;


            arr.sort(function (a, b) {

                if (a.folderName < b.folderName) { //sort string ascending
                    return (-1 * condition);
                }
                else if (a.folderName > b.folderName) {
                    return (1 * condition);
                }
                return 0;
            });

            return arr;

    }


    displayFolders(){

          //console.log(this.fileContents);
          for (let folder of this.fileContents) {

             console.log(folder);
             //folder.showContents();
        }
    }




}


class Folder {

    constructor(folderName, folderUrl = "",  folderParent = null, folderItems = []) {
        this.folderName = folderName;
        this.folderUrl = folderUrl;
        this.folderParent = folderParent;
        this.folderItems = folderItems;
    }


    showContents(){
       console.log(this.folderName);
    }

}

class Item {
     constructor(itemParent, itemUrl){
         this.itemParent = itemParent;
         this.itemUrl = itemUrl;
     }





}


