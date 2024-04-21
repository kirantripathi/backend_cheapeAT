import express from "express";
import MyUserController from "../controller/MyUserController";
import { jwtCheck,jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";


const router = express.Router();

router.get('/',MyUserController.getCurrentUser)

router.post('/'
// ,jwtCheck 
,MyUserController.createCurrentUser)

router.put('/',
// jwtParse ,
validateMyUserRequest,
MyUserController.updateCurrentUser)

export default router