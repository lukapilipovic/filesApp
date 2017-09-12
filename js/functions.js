fetch(url).then(
        function (response) {
            return response.json();
        }).then(function (jsonData) {


        let a = 0;
        let b = 0;
        for (let itemKey of Object.keys(jsonData)) {

            console.log("itemList: ");
            let itemsList = jsonData[itemKey];
            console.log(itemsList);


            for (let itemKey of Object.keys(itemsList)) {

                a++;
                let item = itemsList[itemKey];
                console.log("item" + a + ": ");
                console.log(item);

                let folderUrl = "";
                let folderName = "";

                let fragment = document.createDocumentFragment();

                for (let key of Object.keys(item)) {


                    let newSection;

                    if (key == "folderName") {
                        newSection = document.createElement("div");
                        newSection.innerHTML = "<h1>" + item[key] + "</h1>";
                        newSection.id = item[key];
                        newSection.className = "folder";
                        fragment.appendChild(newSection);

                        document.getElementById("demo").appendChild(fragment);
                    }

                    else if (key == "folderUrl") {
                        folderUrl = item[key];

                    }






                    //console.log(key, jsonData[key]);
                    else if (key == "folderElements") {

                        let i = 0;
                        let fragment1 = document.createDocumentFragment();
                        for (let im of Object.keys(item[key])) {
                            let image = item[key][im];

                            let y = document.createElement("div");
                            y.id = "imgConatiner" + i;
                            y.className = "imgContainer";
                            let x = document.createElement("img");
                            x.src = folderUrl + "/svg/" + image;
                            x.id = "img" + i;
                            x.className = "icon";

                            let dl = document.createElement('a');
                            let dlImage = document.createElement("img");
                            dlImage.src = "img/dl.png";
                            dlImage.className = "dlButton";
                            dl.href = folderUrl + "/svg/" + image;
                            dl.appendChild(dlImage);
                            dl.download = image;
                            y.appendChild(x);
                            y.appendChild(dl);
                            //y.appendChild(document.createTextNode(image));
                            fragment1.appendChild(y);

                            i++

                        }

                        document.getElementById("demo").lastChild.appendChild(fragment1);

                    }

                }


            }


        }


    });


sortFoldersASC = function (param) {
    let main = document.getElementById('demo');


    [].map.call(main.children, Object).sort(function (a, b) {
        //return +a.id.match( /\d+/ ) - +b.id.match( /\d+/ );
        return +a.id.match(/\d+/) - +b.id.match(/\d+/);
    }).forEach(function (elem) {
        main.appendChild(elem);
    });


};