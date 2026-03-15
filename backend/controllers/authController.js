import { supabase } from "../config/supabaseClient.js"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"
import { generateToken } from "../utils/generateToken.js"

export const signup = async(req,res)=>{

try{

const {name,email,password} = req.body
const{data:existingUser} = await supabase
.from("users").select("*")
.eq("email",email)


if(existingUser){
return res.status(400).json({error:"User already exists"})
}

const hashedPassword = await bcrypt.hash(password,10)

const {error} = await supabase
.from("users")
.insert([
{
id:uuidv4(),
name,
email,
password:hashedPassword,
balance:10000
}
])

if(error){
return res.status(400).json({error:error.message})
}

res.json({message:"User created successfully"})

}catch(err){
res.status(500).json({error:err.message})
}

}

export const login = async(req,res)=>{

try{

const {email,password} = req.body

const {data:user,error} = await supabase
.from("users")
.select("*")
.eq("email",email)
.single()

if(!user){
return res.status(404).json({message:"User not found"})
}

const valid = await bcrypt.compare(password,user.password)

if(!valid){
return res.status(401).json({message:"Invalid password"})
}

const token = generateToken(user.id)

res.json({
token,
user:{
id:user.id,
name:user.name,
email:user.email
}
})

}catch(err){
res.status(500).json({error:err.message})
}

}