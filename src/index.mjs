import express from "express";
import {query,validationResult,body,matchedData,checkSchema} from "express-validator";
import { validateUserSchema } from "./utils/validationSchemas.mjs";


const app=express();
app.use(express.json()); 

const PORT= process.env.PORT || 3000;

const allUsers=[
        {id:1, username:"Aqsa", displayName:"aqsa"},
        {id:2, username:"Laiba", displayName:"laiba"},
        {id:3, username:"Irum", displayName:"irum"},
        {id:4, username:"Zani", displayName:"zani"},
        {id:5, username:"Shamir", displayName:"shamir"},
        {id:6, username:"Pakiza", displayName:"pakiza"}
        ];


app.get("/", (request,response)=>{
    response.status(201).send({msg:"Hello!"});
});

////////////////////////////////////////

//Route Parameters

app.get('/api/users/:id', (request,response)=>{
console.log(request.params);
const parsedID=parseInt(request.params.id);
console.log(parsedID); 

if (isNaN(parsedID)) return response.status(400).send({msg: "Bad Request. Invalid ID"});

const findUser=allUsers.find((user) => user.id===parsedID);
if(!findUser) return response.sendStatus(404); 
return response.send(findUser);
});



///////////////////////////////////////

//Query Parameters

//query fun like isstring wont throw errors, they just validate, so we need to do that by ourselves
app.get("/api/users", query('filter').isString().notEmpty().withMessage('Must not be Empty').isLength({min:3,max:10}).withMessage('Must be atleast 3-10 characters'),(request,response)=>{
    //wihtMessage is for custom error message
    
    const result=validationResult(request); //inbuilt validaiton function
console.log(result);

    const {query: {filter, value},}=request; //destructured query from request

if (filter && value){ 
    const filteredUsers= allUsers.filter((user)=>user[filter].includes(value));  
return response.send(filteredUsers);
}
   response.send(allUsers);
});

//////////////////////////////////////

//POST Request

// Query parameters : body is used to validate request body 

////////////body middleware function first////////////

//app.post('/api/users',body('username').notEmpty().withMessage('Must not be Empty').isString().withMessage('Must be String'),(request,response)=>{
    
// to validate multiple fields, we will pass array

/*
app.post('/api/users',[
    body('username').notEmpty().withMessage('Must not be Empty').isString().withMessage('Must be String'),
body('displayName').notEmpty().withMessage('Displayname must not be Empty')],
(request,response)=>{

    const result=validationResult(request);
    console.log(result);

if(!result.isEmpty())
 return response.status(400).send({errors:result.array()}); //array method to give all the validation errors as array

//to get the validate data 
//using matched data function
const data=matchedData(request);
//console.log(data);
;
    const newUser= {id:allUsers[allUsers.length-1].id+1,...data}; //validation is done thought data so no need of body object
    allUsers.push(newUser);
    return response.status(201).send(newUser);
});
*/


//using schema for validation as the above one is clustered up 

app.post('/api/users',checkSchema(validateUserSchema),
(request,response)=>{

    const result=validationResult(request);
    console.log(result);

if(!result.isEmpty())
 return response.status(400).send({errors:result.array()}); //array method to give all the validation errors as array

//to get the validate data 
//using matched data function
const data=matchedData(request);
//console.log(data);
;
    const newUser= {id:allUsers[allUsers.length-1].id+1,...data}; //validation is done thought data so no need of body object
    allUsers.push(newUser);
    return response.status(201).send(newUser);
});






///////////////////////////////









app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
});

