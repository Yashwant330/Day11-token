const UserModel = require("../models/user.model");




// REGISTER CONTROLLER

let registerController = async (req, res) => {

    try {

        const { name, email, password, mobile } = req.body;


        // VALIDATION

        if (!email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // CHECK USER EXISTS

        const isExisted = await UserModel.findOne({ email });

        if (isExisted) {

            return res.status(409).json({
                message: "Email already registered"
            });
        }


        // CREATE USER

        const newUser = await UserModel.create({
            name,
            email,
            password,
            mobile,
        });


        // GENERATE TOKEN

        const token = newUser.generateJWT();


        // STORE COOKIE

        res.cookie("token", token, {
            httpOnly: true,
        });


        // RESPONSE

        return res.status(201).json({
            message: "User registered successfully",

            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                mobile: newUser.mobile
            }
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};






// LOGIN CONTROLLER

let loginController = async (req, res) => {

    try {

        const { email, password } = req.body;


        // VALIDATION

        if (!email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // CHECK USER

        const isExisted = await UserModel.findOne({ email });

        if (!isExisted) {

            return res.status(404).json({
                message: "User not found"
            });
        }


        // CHECK PASSWORD

        const comparePassword = isExisted.comparePassword(password);

        if (!comparePassword) {

            return res.status(401).json({
                message: "Invalid credentials"
            });
        }


        // GENERATE TOKEN

        const token = isExisted.generateJWT();


        // STORE COOKIE

        res.cookie("token", token, {
            httpOnly: true,
        });


        // RESPONSE

        return res.status(200).json({
            message: "User logged in successfully",

            user: {
                _id: isExisted._id,
                name: isExisted.name,
                email: isExisted.email,
                mobile: isExisted.mobile
            }
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};




module.exports = {
    registerController,
    loginController
};