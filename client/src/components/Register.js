import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css'

const Register=()=>{

    const history = useHistory()
    const [restaurant_name,setRestaurantName] = useState("")
    const [owner_name,setOwnerName] = useState("")
    const [email,setEmail] = useState("")
    const [address,setAddress] = useState("")
    const [password,setPassword] = useState("")


    const uploadFields=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:'Invalid Email',classes:"#f44336 red"})
            return
        }
        M.toast({html:"Restaurant is Registering..."})
        fetch("/register",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                restaurant_name,owner_name,email,address,password
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"#f44336 red"})
            }else{
                M.toast({html:data.message,classes:"#00c853 green accent-4"})
                history.push('/login')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <div>
            <div className="mycard">
                <div className="card auth-card">
                    <h1 className="brand-logo">Restaurant Registration</h1>
                    <input type="text" placeholder="Enter Restaurant Name" value={restaurant_name} onChange={(e)=>setRestaurantName(e.target.value)} />
                    <input type="text" placeholder="Enter Restaurant Owner Name" value={owner_name} onChange={(e)=>setOwnerName(e.target.value)} />
                    <input type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="email" placeholder="Enter Address" value={address} onChange={(e)=>setAddress(e.target.value)} />
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button className="btn waves-effetc waves-light" onClick={uploadFields}>Register</button>
                    <h6><Link to="/login">Already have an Account?</Link></h6>
                </div>
            </div>       
        </div>
    )
}
 
export default Register;