let express = require ('express')
const authmiddleware = require('../middleware/auth.middleware')

let router = express.Router()

router.get("/",authmiddleware,(req,res)=>{

    try {
        console.log(req.user);
        
     return   res.send("ok mai home ke andar huu ")
    } catch (error) {
       
        return res.status(500).json({
            message:"Internal server error"
        })
    }

})

module.exports = router