import express from "express";

const app=express();

const PORT= process.env.PORT || 3000;


//fpr ID params
const allUsers=[
        {id:1, username:"Aqsa", displayName:"aqsa"},
        {id:2, username:"Laiba", displayName:"laiba"},
        {id:3, username:"Irum", displayName:"irum"}
    ];

// app.get("/", (request,response)=>{
//     response.send("Hello");
// })


//return status 201 is all correct status (response json object)
app.get("/", (request,response)=>{
    response.status(201).send({msg:"Hello!"});
});

//Array used
app.get('/api/users', (request,response)=>{
    response.send(allUsers)
});

//Within route array
app.get('/api/products', (request,response)=>{
    response.send([
        {id:345, name:"concealer", price:"2000"}
    ])
});

//getting based on one unique identifier
//route Parameters
app.get('/api/users/:id', (request,response)=>{
console.log(request.params);

//we see that id is int and the user requested in string format so for this converted to integer
const parsedID=parseInt(request.params.id);
console.log(parsedID); 

//if user enters any invalid thing like string of alphabets(non-numeric), then it will give 'NaN' so applying condition
if (isNaN(parsedID)) return response.status(400).send({msg: "Bad Request. Invalid ID"});

//logic to find user (passing in call back function)
const findUser=allUsers.find((user) => user.id===parsedID);

//if user does not exist
if(!findUser) return response.sendStatus(404); //for not found status
//if(!findUser) return response.status(404).send({msg: "User not found"});

//otherwise
return response.send(findUser);
});



app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
});

