import { useEffect,useState } from "react"
import API from "../services/api"

export default function Statement(){

const [transactions,setTransactions]=useState([])

const token = localStorage.getItem("token")

useEffect(()=>{

const fetchTx = async()=>{

const {data} = await API.get("/account/statement",{

headers:{
Authorization:`Bearer ${token}`
}

})

setTransactions(data)

}

fetchTx()

},[])

return(

<div>

<h2>Account Statement</h2>

<table border="1">

<thead>

<tr>

<th>Date</th>
<th>Type</th>
<th>Amount</th>
<th>Sender</th>
<th>Receiver</th>

</tr>

</thead>

<tbody>

{transactions.map(tx=>(

<tr
key={tx.id}
style={{
color: tx.transaction_type === "credit" ? "green":"red"
}}
>

<td>{tx.created_at}</td>
<td>{tx.transaction_type}</td>
<td>₹{tx.amount}</td>
<td>{tx.sender_id}</td>
<td>{tx.receiver_id}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}