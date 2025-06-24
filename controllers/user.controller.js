let User = require('../models/user.model.js')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcryptjs')
require('dotenv').config()


let signupController = async (req,res)=>{
    let {name,email,password} = req.body;
    try{
        let userExists = await User.findOne({email})
        if(userExists){
            return res.status(403).json({message: 'Email already exists, you can login', auth: false})
        }
        let hashedPassword = await bcrypt.hash(password, 10)

        let user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save()
        return res.status(201).json({message: 'Signup Successful', auth: true})
    }catch(e){
        let error = {
            status: 500,
            message: 'Internal Server Isssue'
        }
        return res.status(500).json({message: error.message})
    }
}
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(403).json({ message: 'Wrong Email', auth: false });
    }

    const comparePassword = await bcrypt.compare(password, userExists.password);
    if (!comparePassword) {
      return res.status(403).json({ message: 'Wrong Password', auth: false });
    }

    const token = jwt.sign(
      { _id: userExists._id, name: userExists.name, email: userExists.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
        secure: true,
        samsite: true
    });

    return res.status(200).json({
      _id: userExists._id,
      name: userExists.name,
      message: 'Login Successfully',
      auth: true
    });

  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Issue' });
  }
};

module.exports = { loginController, signupController }
