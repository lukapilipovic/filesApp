class KlasaGlavna {

   constructor (){

       this.size = 100;
       this.color = "blue";
       this.itemsList = ["item1","item2","item3"];

   }



    funkcija1() {

        this.size = "10";
        //this.items.push(5);
        this.itemsList.push("item4");


        console.log(this.itemsList);
    }


    funkcija2(){

        this.color =  "red";

    }


   testPromise()
           {
               return new Promise(function (resolve, reject) {
                   funkcija1(function cb(good) {
                       if (good)
                           resolve();
                       else
                           reject();
                   });
               });

           }



}