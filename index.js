const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.weqbi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const port = 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json())
app.get('/', (req, res) =>{
    res.send('Welcome')
})
client.connect(err => {
  const collection = client.db("volunteerstore").collection("events");
  const adminCollection = client.db("volunteerstore").collection("admin");
  app.post('/addEvents',(req,res) =>{
    const event = req.body;
    collection.insertOne(event)
    .then(result =>{
      res.send()
    })
})
app.post('/addAdmin',(req,res)=>{
  const admin=req.body;
  adminCollection.insertOne(admin)
  .then(res=>{
    res.send()
  })
})
app.get('/admin',(req,res)=>{
  adminCollection.find({}).toArray((err,documents)=>{
    res.send(documents)
  })
})
app.get('/events',(req,res)=>{
  collection.find({}).toArray((err,documents)=>{
    res.send(documents)
  })

})
app.get('/event/:name',(req,res)=>{
  collection.find({name:req.params.name}).toArray((err,documents)=>{
    res.send(documents)
  })
})
app.delete('/admin/:id',(req,res)=>{
  adminCollection.deleteOne({_id:ObjectID(req.params.id)})
})
  console.log('connected');
});
app.listen(process.env.PORT || port);