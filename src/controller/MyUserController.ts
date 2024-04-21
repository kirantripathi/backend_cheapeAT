import { Request, Response } from "express";
import User from "../model/user.model";


const getCurrentUser = async (req: Request, res: Response) => {

  
  try {
   
      //   const currentUser = await User.findOne({ _id: req.userId });
    //   if (!currentUser) {
    //     return res.status(404).json({ message: "User not found" });
    //   }
  
    //   res.json(currentUser);

   

         const currentUser = await User.findOne({ auth0Id: req.query.id });
      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(currentUser);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

const createCurrentUser = async (req: Request, res: Response) => {

    

    try {
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id });

       
    
        if (existingUser) {
          return res.status(200).json({message:"user already present"});
        }
    
       
        const newUser = new User(req.body);
        await newUser.save();
      
    
        res.status(201).json(newUser.toObject());
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
      }
}

const updateCurrentUser = async (req: Request, res: Response) => {

  try {
   
        const updatedData= {
            name:req.body.name,
            addressLine1:req.body.addressLine1,
            city:req.body.city,
            country:req.body.country
        }

        const foundCurrentUser = await User.findOneAndUpdate({ auth0Id:req.body.auth0Id },updatedData,{new:true});
    
        if (!foundCurrentUser) {
          return res.status(500).json({message:"User not found with the given id to update"});
        }
        else {

            res.status(201).json(foundCurrentUser.toObject());
        }
     
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating user" });
      }
}


export default {getCurrentUser,createCurrentUser,updateCurrentUser}