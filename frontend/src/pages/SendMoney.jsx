import { useState,useEffect } from "react"
import API from "../services/api"

export default function SendMoney(){

const [users,setUsers]=useState([])
const [receiverId,setReceiverId]=useState("")
const [amount,setAmount]=useState("")
const [message,setMessage]=useState("")

const token = localStorage.getItem("token")

useEffect(()=>{

const fetchUsers = async()=>{

const {data} = await API.get("/users")

setUsers(data)

}

fetchUsers()

},[])

const handleTransfer = async(e)=>{

e.preventDefault()

try{

await API.post("/account/transfer",

{receiverId,amount},

{
headers:{
Authorization:`Bearer ${token}`
}
}

)

setMessage("Transfer successful")

}catch{

setMessage("Transfer failed")

}

}

return(

<div>

<h2>Send Money</h2>

<form onSubmit={handleTransfer}>

<select onChange={(e)=>setReceiverId(e.target.value)}>

<option>Select User</option>

{users.map(u=>(
<option key={u.id} value={u.id}>{u.name}</option>
))}

</select>

<input
placeholder="Amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

<button>Send</button>

</form>

<p>{message}</p>

</div>

)

}