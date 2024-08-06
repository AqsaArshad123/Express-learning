import { Router } from "express";
import { query,validationResult,checkSchema,matchedData} from "express-validator";
import { allUsers } from "../utils/constants.mjs";
import { validateUserSchema } from "../utils/validationSchemas.mjs";
import {handleUserByIndex} from "../utils/middlewares.mjs";


const router=Router();


//router is a mini application where we can group together all our requests accoring to domains

router.get("/api/users", query('filter').isString().notEmpty().withMessage('Must not be Empty').isLength({min:3,max:10}).withMessage('Must be atleast 3-10 characters'),(request,response)=>{
    const result=validationResult(request); 
console.log(result);
    const {query: {filter, value},}=request; 
if (filter && value){ 
    const filteredUsers= allUsers.filter((user)=>user[filter].includes(value));  
return response.send(filteredUsers);
}
   response.send(allUsers);
});

router.post('/api/users',checkSchema(validateUserSchema),
(request,response)=>{

    const result=validationResult(request);
    console.log(result);

if(!result.isEmpty())
 return response.status(400).send({errors:result.array()}); 
const data=matchedData(request);
//console.log(data);

    const newUser= {id:allUsers[allUsers.length-1].id+1,...data}; 
    return response.status(201).send(newUser);
});

router.get('/api/users/:id',handleUserByIndex,(request,response)=>{
const {findUserIndex}=request;

const findUser=allUsers[findUserIndex];

if(!findUser) return response.sendStatus(404); 
return response.send(findUser);
});


//PUT Request (updating enture resource)

router.put('/api/users/:id',handleUserByIndex,(request,response)=>{
const { body, findUserIndex}=request; // body and index needed here , so destructured it

allUsers[findUserIndex]={id:allUsers[findUserIndex].id,...body};// returns id

return response.sendStatus(200);

});


////////////////////////

//PATCH Request


router.patch('/api/users/:id', handleUserByIndex,(request,response)=>{
const {body, findUserIndex }=request;

allUsers[findUserIndex]={...allUsers[findUserIndex],...body}; 
return response.sendStatus(200);
});


//////////////////////////

//DELETE Request

router.delete('/api/users/:id',handleUserByIndex,(request,response)=>{
const { findUserIndex}=request;

allUsers.splice(findUserIndex,1); 
return response.sendStatus(200);
});





export default router;