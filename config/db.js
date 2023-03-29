const mongoose = require('mongoose');


exports.connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/TiguSDB')
      .then(() => console.log('Database is connected'))
      .catch((e) => console.log(e));
     //add items to food database in mongodb
const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017/TiguSDB';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('TiguSDB');
    const coll = db.collection('foods');
    const docs = [
      //Main Dishes
       {id:1,
          img:('/img/hero3.png') ,
          name:"Kaw Mun Kai",
          price:40,
          descrpition:"Normal Kaw Mun Kai that is Hainanese rice with boiled chicken",
          type:"mainDish"},
        {id:2,
          img:('/img/hero2.jpeg') ,
          name:"Kaw Mun Kai-Tod",
          price:45,
          descrpition:"Normal Kaw Mun Kai that is Hainanese rice with fried chicken",
          type:"mainDish"},
        {id:3,
          img:('/img/hero4.jpg') ,
          name:"Kaw Mun Kai-Tome-Tod",
          price:50,
          descrpition:"Normal Kaw Mun Kai that is Hainanese rice with boiled chicken and fried chicken",
          type:"mainDish"},
        {id:4,
          img:('/img/hero5.jpg') ,
          name:"fried chicken (Kai-Tod)",
          price:55,
          descrpition:"fried chicken",
          type:"mainDish"},
        {id:5,
          img:('/img/hero6.jpg') ,
          name:"boiled chicken (Kai-Tome)",
          price:55,
          descrpition:"boiled chicken",
          type:"mainDish"},
        // Side Dishes
        {id:6,
          img:('/img/hero7.jpg') ,
          name:"Tub (liver)",
          price:40,
          descrpition:"boiled liver",
          type:"sideDish"},
        {id:7,
          img:('/img/hero8.jpg') ,
          name:"Tome-Jeud (Soup)",
          price:45,
          descrpition:"boiled liver",
          type:"sideDish"},
        {id:8,
          img:('/img/hero9.jpg') ,
          name:"Rice",
          price:30,
          descrpition:"Rice",
          type:"sideDish"},
        {id:9,
          img:('/img/hero10.jpg') ,
          name:"Spicy Dipping Sauce",
          price:20,
          descrpition:"Spicy Dipping Sauce",
          type:"sideDish"},
        {id:10,
          img:('/img/hero11.jpg') ,
          name:"Dipping Sauce",
          price:55,
          descrpition:"Normal Dipping Sauce",
          type:"sideDish"},
        //Beverages
        {id:11,
          img:('/img/hero12.jpeg') ,
          name:"Water",
          price:20,
          descrpition:"Normal Warter",
          type:"beverage"},
        {id:12,
          img:('/img/hero13.png') ,
          name:"CoCaCola (Coke)",
          price:25,
          descrpition:"Can of Coke",
          type:"beverage"},
        {id:13,
          img:('/img/hero14.jpg') ,
          name:"Schweppes",
          price:25,
          descrpition:"Can of Schweppes",
          type:"beverage"},
        {id:14,
          img:('/img/hero15.jpg') ,
          name:"Orange Juice",
          price:35,
          descrpition:"fresh orange juice",
          type:"beverage"},
        {id:15,
          img:('/img/hero16.jpg') ,
          name:"Apple Juice",
          price:35,
          descrpition:"fresh apple juice",
          type:"beverage"},
        {id:16,
          img:('/img/hero17.jpg') ,
          name:"Kiwi Juice",
          price:35,
          descrpition:"fresh kiwi juice",
          type:"beverage"},
        {id:17,
          img:('/img/hero18.png') ,
          name:"Water melon Juice",
          price:35,
          descrpition:"fresh water melon juice",
          type:"beverage"}
    ];
    

    
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
  
};
