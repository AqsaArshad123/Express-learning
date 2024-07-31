import express from "express";

const app=express();

//Express Middleware (use to parse incoming request bodies in JSON format)
app.use(express.json()); 

const PORT= process.env.PORT || 3000;


//for ID params
const allUsers=[
        {id:1, username:"Aqsa", displayName:"aqsa"},
        {id:2, username:"Laiba", displayName:"laiba"},
        {id:3, username:"Irum", displayName:"irum"},
        {id:4, username:"Zani", displayName:"zani"},
        {id:5, username:"Shamir", displayName:"shamir"},
        {id:6, username:"Pakiza", displayName:"pakiza"}
        ];

// app.get("/", (request,response)=>{
//     response.send("Hello");
// })


app.get("/", (request,response)=>{
    response.status(201).send({msg:"Hello!"});
});

//Array used
// app.get('/api/users', (request,response)=>{
//     response.send(allUsers)
// });


////////////////////////////////////////

//Route Parameters

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



///////////////////////////////////////

//Query Parameters
app.get("/api/users", (request,response)=>{
    console.log(request.query);
    const {query: {filter, value},}=request; //destructured query from request


//Assigning filtered data to a specific variable

if (filter && value){ // // to check if filter and value are undefined
    const filteredUsers= allUsers.filter((user)=>user[filter].includes(value));  
return response.send(filteredUsers);
}
   response.send(allUsers);
});

//////////////////////////////////////

//POST Request


app.post('/api/users', (request,response)=>{
    const{body}=request;
    const newUser= {id:allUsers[allUsers.length-1].id+1,...body}; //spread operator on body object to take all the fields from body object
    allUsers.push(newUser);
    return response.status(201).send(newUser);
})

///////////////////////















app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
});

