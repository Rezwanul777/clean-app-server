const express = require('express')
require("dotenv").config()
const cors=require('cors')
const port =process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const app = express()
app.use(express.json())

//! Warning: Do not use in production
app.use(
   cors({
     origin: "*",
   })
 );

// database coonection check

//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zkzhc7a.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zkzhc7a.mongodb.net/test`
//console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//console.log(client);
async function run() {
   try {
      await client.connect();
 
      const servicesCollection = client.db("users").collection("services");
      console.log('Db connected');
      app.get('/service', async(req, res) => {
        const services=await servicesCollection.find({}).toArray()
       
        res.send(services)
       });
       //ad- service route section
       app.post("/add-service", async (req, res) => {
        const data = req.body;
        const result = await servicesCollection.insertOne(data);
        res.send(result);
      });

      app.delete("/delete-service/:id", async (req, res) => {
        const { id } = req.params;
        const query = { _id: ObjectId(id) };
        const result = await servicesCollection.deleteOne(query);
  
        res.send(result);
      });
  
   } finally {
     // Ensures that the client will close when you finish/error
   
   }
 }
 run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})

//prince777
//AnuFC8505Tu1bMhf