import { useEffect,useState } from "react"
import API from "../services/api"
import { Link } from "react-router-dom"

export default function Dashboard(){

const [balance,setBalance]=useState(0)

useEffect(()=>{

const fetchBalance = async()=>{

const token = localStorage.getItem("token")

const {data} = await API.get("/account/balance",{
headers:{Authorization:`Bearer ${token}`}
})

setBalance(data.balance)

}

fetchBalance()

},[])

return(

<div className="container">

<h2>Account Dashboard</h2>

<div className="balance-card">
<h3>Current Balance</h3>
<h1>₹{balance}</h1>
</div>

<Link className="link-btn" to="/send">
Send Money
</Link>

<Link className="link-btn" to="/statement">
View Statement
</Link>

</div>

)

}