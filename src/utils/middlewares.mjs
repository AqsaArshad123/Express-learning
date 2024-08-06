import { allUsers } from "./constants.mjs"

// Middleware
export const handleUserByIndex=(request,response,next)=>{
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

export default handleUserByIndex;