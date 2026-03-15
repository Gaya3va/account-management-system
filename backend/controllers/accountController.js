import { supabase } from "../config/supabaseClient.js"

export const getBalance = async(req,res)=>{

const {data,error} = await supabase
.from("users")
.select("balance")
.eq("id",req.userId)
.single()

if(error){
return res.status(400).json({error:error.message})
}

res.json(data)

}
export const transferMoney = async(req,res)=>{

try{

const {receiverId,amount} = req.body
const transferAmount = Number(amount)

const {data:sender} = await supabase
.from("users")
.select("*")
.eq("id",req.userId)
.single()

if(sender.balance < transferAmount){
return res.status(400).json({message:"Insufficient balance"})
}

const {data:receiver} = await supabase
.from("users")
.select("*")
.eq("id",receiverId)
.single()

if(!receiver){
return res.status(404).json({message:"Receiver not found"})
}

await supabase
.from("users")
.update({balance: sender.balance - transferAmount})
.eq("id",req.userId)

await supabase
.from("users")
.update({balance: receiver.balance + transferAmount})
.eq("id",receiverId)

await supabase
.from("transactions")
.insert([
{
sender_id:req.userId,
receiver_id:receiverId,
amount:transferAmount,
transaction_type:"debit"
},
{
sender_id:receiverId,
receiver_id:req.userId,
amount:transferAmount,
transaction_type:"credit"
}
])

res.json({message:"Transfer successful"})

}catch(err){
res.status(500).json({error:err.message})
}

}
export const getStatement = async(req,res)=>{

const {data,error} = await supabase
.from("transactions")
.select("amount, transaction_type, created_at, sender_id, receiver_id")
.or(`sender_id.eq.${req.userId},receiver_id.eq.${req.userId}`)
.order("created_at",{ascending:false})
if(error){
return res.status(400).json({error:error.message})
}

res.json(data)

}