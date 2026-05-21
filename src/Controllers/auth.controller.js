const UserModel = require("../models/user.model");

let registerController = async()=>{
    try {
        let {name,email,password,mobile}=requestAnimationFrame.body;

        if(!email || !password)
            return res.status(400).json({
            message:"All fields are required"
            })

     let isExisted= await UserModel.findOne({
        email
     })

     if(isExisted)
        return res.status(409).json({
        message:"Email already registered"
        })


        let newUser = await UserModel.create({
            name,
            email,
            password,
            mobile,
        })




    } catch (error) {
        return res.status(500).json({
            message:"Internal serverr error",
        })
    }
}

let loginController = async()=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal serverr error",
        })
    }
}

module.exports={registerController,loginController}