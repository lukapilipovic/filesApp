class Item {
    constructor(itemParent, itemUrl) {
        this.itemParent = itemParent;
        this.itemUrl = itemUrl;
    }





    static displayItem(item,i) {

        let fragment = document.createDocumentFragment();

        let y = document.createElement("div");
        y.id = "imgConatiner" + i;
        y.className = "imgContainer";
        let x = document.createElement("img");
        x.src = item.itemUrl;
        x.id = "img" + i;
        x.className = "icon";

        let dl = document.createElement('a');
        let dlImage = document.createElement("img");
        dlImage.src = "img/dl.png";
        dlImage.className = "dlButton";
        dl.href = item.itemUrl;
        dl.appendChild(dlImage);
        dl.download = item.itemUrl;
        y.appendChild(x);
        y.appendChild(dl);
        //y.appendChild(document.createTextNode(image));
        fragment.appendChild(y);
        //console.log(fragment1);

        return fragment;
    }


}



