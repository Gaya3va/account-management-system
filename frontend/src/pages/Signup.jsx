import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Signup(){

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [error,setError]=useState("")
const [loading,setLoading]=useState(false)

const navigate = useNavigate()

const handleSubmit = async(e)=>{

e.preventDefault()

setLoading(true)

try{

await API.post("/auth/signup",{name,email,password})

alert("Account created")

navigate("/login")

}catch(err){
const message = err.response?.data?.message
if (message==="User already exists") {
alert("User already exists")
navigate("/login")
}else{
setError(err.response?.data?.message || "User already exists")
}
}

setLoading(false)

}

return(

<div className="container">

<h2>Signup</h2>

<form onSubmit={handleSubmit}>

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button disabled={loading}>
{loading ? "Creating..." : "Signup"}
</button>

{error && <p style={{color:"red"}}>{error}</p>}

</form>

</div>

)

}