import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Login(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [error,setError]=useState("")
const navigate = useNavigate()

const handleLogin = async(e)=>{

e.preventDefault()

try{

const {data} = await API.post("/auth/login",{email,password})

localStorage.setItem("token",data.token)

navigate("/dashboard")

}catch(err){

setError("Invalid credentials")

}

}

return(

<div className="container">

<h2>Login</h2>

<form onSubmit={handleLogin}>

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

<button>Login</button>

{error && <p style={{color:"red"}}>{error}</p>}

</form>

</div>

)

}