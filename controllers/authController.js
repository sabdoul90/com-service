const { signupValidator } = require("../middlewares/validator");
const User = require('../models/userModel');
const { hasherPWD } = require("../utils/hashing");

exports.signup = async (req, res)=>{
    const {nom, prenom, email, password } = req.body;
    try{
       const {error} = signupValidator.validate({email, password});

       if(error){
        return res.status(401).json({success:false, message:error.details[0].message});
       }

       const existingUser = await User.findOne({where:{email}});
       if(existingUser){
        return res.status(401).json({success:false, message:"L'utilisateur existe déjà !"});
       }

       const pwghassed = await hasherPWD(password, 12);

       const newUser = await User.create({
        nom,
        prenom,
        email,
        password : pwghassed,
       });

       const result = await newUser.save();
       result.password = undefined;
       res.status(200).json({
        success:true,
        message:"Utilisateur crééé avec succès",
        result,
       });
       
    }catch(e){
        res.status(500).json({success:false, message:"Creation de l'utilisateur echouée !"});
        //console.log("Creation de l'utilisateur echouée ", e);
    }
};