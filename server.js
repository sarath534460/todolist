let express=require('express')
let cors=require("cors")
let {MongoClient}=require("mongodb")
let app=express();
app.use(cors())
app.use(express.json())
let database;
var uri="mongodb+srv://sarath:mongodb@sarath.pwemxqm.mongodb.net/?retryWrites=true&w=majority";

let client=new MongoClient(uri);

client.connect().then(()=>{

    console.log("connected successfully")
    database=client.db("todolist")
    database.collection("entry").createIndex({ name: 1 }, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Index created on 'name' field");
        
        // You can proceed with other operations here
    });
})



app.post('/test',(req,res)=>{

    console.log(req.body)


    database.collection("entry").insertOne({name:req.body.name},(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
    })
})

app.delete('/deletename/:k',(req,res)=>{

    console.log(req.params)
    database.collection("entry").deleteOne({name:req.params.k},(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
    })
    res.send("hjl")
    
})

app.get('/findall',async(req,res)=>{

   
   let s= await database.collection("entry").find({}).toArray();
    
       console.log(s)
       res.json(s)
    
    
})


app.put('/updatename/:k',(req,res)=>{

    console.log(req.params)
    database.collection("entry").updateOne({name:req.params.k},{$set:{name:req.body.updatename}},(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
    })
    res.send("hjl")
    
})

app.listen(3000,(err)=>{
    if(err){
        console.log(err)
    }

    else{
        console.log("running on server 3000")
    }
})