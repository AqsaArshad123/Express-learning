import express from "express";

import usersRouter from "./routes/users.mjs";



const app=express();
app.use(express.json()); 
//Registering Router
app.use(usersRouter);

const PORT= process.env.PORT || 3000;



app.get("/", (request,response)=>{
    response.status(201).send({msg:"Hello!"});
});

////////////////////////////////////////




app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
});

