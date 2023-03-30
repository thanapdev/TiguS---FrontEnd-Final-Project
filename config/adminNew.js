const mongoose = require('mongoose');

exports.connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/TiguSDB')
      .then(() => console.log('Database is connected'))
      .catch((e) => console.log(e));
      const { MongoClient } = require('mongodb');
      const uri = 'mongodb://127.0.0.1:27017/TiguSDB'
      const client = new MongoClient(uri);

      async function run() {
        try {
            await client.connect();
            const db = client.db('TiguSDB');
            const coll = db.collection('admins');
            const docs = [
                {id:1,
                    name: 'Tiger',
                    username: 'HoiLodZ',
                    email: 'hrkfan321@gmail.com',
                    password: '1234'},
                {id:2,
                    name: 'Su',
                    username: 'SuZa',
                    email: 'Tanapong@gmail.com',
                    password: '4321'}
            ];

            const result = await coll.insertMany(docs);
            console.log('Documents were inserted');
            console.log(result.insertedIds);
        } catch (err) {
            console.error('Error:', err);
        } finally {
            await client.close();
        }
      }
      run().catch(console.dir);
}