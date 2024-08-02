import express, { request, response } from "express";

const app=express();

//Express Middleware (use to parse incoming request bodies in JSON format)
//regiester middleware (app.use) before using routes other wise those routes wont work (Order matters)
app.use(express.json()); 



const loggingMiddleware=(request,response,next)=>{
    console.log(`${request.method}- ${request.url}`);
next();
}

//for using globally
//app.use(loggingMiddleware); //will work only for the routes it is called before

////////////////////////

//pasing 2 or more middlewares in app use
// app.use (loggingMiddleware,(request,response,next)=>{
//     console.log(`Finished Log..`);
// next();
// });


///////////////////////////////

// Middleware
const handleUserByIndex=(request,response,next)=>{
const { params:{id},}=request;

const parsedID=parseInt(id);
if(isNaN(parsedID)) return response.sendStatus(400);

const findUserIndex=allUsers.findIndex((user)=>user.id===parsedID);
if (findUserIndex===-1) return response.sendStatus(404);
//no direct method to pass this info from one middleware to other so 
//Dynamically attaching properties to request object
request.findUserIndex=findUserIndex;
next();

};


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


//passing middleware as arg for just particular
// app.get("/",loggingMiddleware, (request,response)=>{
//     response.status(201).send({msg:"Hello!"});
// });

//instead of variable, direct use

app.get("/",(request,response,next)=>{
// 2 or more middlewares so we send back a response (Allows writing additional logic)
console.log('Base URL');
next();
}, (request,response,next)=>{
console.log('Base URL1');
next();
},(request,response,next)=>{
console.log('Base URL2');
next();
},(request,response)=>{ 
    response.status(201).send({msg:"Hello!"});
});


////////////////////////////////////////

//Route Parameters


//GET Request

app.get('/api/users/:id',handleUserByIndex, (request,response)=>{
const {findUserIndex}=request;

const findUser=allUsers[findUserIndex];

if(!findUser) return response.sendStatus(404); 
return response.send(findUser);
});



//////////////////////////////////////

//POST Request


app.post('/api/users', (request,response)=>{
    const{body}=request;
    const newUser= {id:allUsers[allUsers.length-1].id+1,...body}; 
    allUsers.push(newUser);
    return response.status(201).send(newUser);
});



///////////////////////



//PUT Request (updating enture resource)

app.put('/api/users/:id',handleUserByIndex,(request,response)=>{
const { body, findUserIndex}=request; // body and index needed here , so destructured it

allUsers[findUserIndex]={id:allUsers[findUserIndex].id,...body};// returns id

return response.sendStatus(200);

});


////////////////////////

//PATCH Request


app.patch('/api/users/:id', handleUserByIndex,(request,response)=>{
const {body, findUserIndex }=request;

allUsers[findUserIndex]={...allUsers[findUserIndex],...body}; 
return response.sendStatus(200);
});


//////////////////////////

//DELETE Request

app.delete('/api/users/:id',handleUserByIndex,(request,response)=>{
const { findUserIndex}=request;

allUsers.splice(findUserIndex,1); 
return response.sendStatus(200);
});




app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
});

