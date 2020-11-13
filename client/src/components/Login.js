import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from 'materialize-css'

const Login=()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const PostData=()=>{
        M.toast({html:"Please wait... , Restaurant Loging!"})
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:'Invalid Email',classes:"#f44336 red"})
            return
        }
        fetch('/login',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html:data.error,classes:"#f44336 red"})
            }else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("restaurant",JSON.stringify(data.restaurant))
                dispatch({type:"RESTAURANT",payload:data.restaurant})
                M.toast({html:"Login Successfully!",classes:"#00c853 green accent-4"})
                history.push('/')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="mycard">
            <div className="card auth-card">
                <h1 className="brand-logo">Restaurant Login</h1>
                <input type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button className="btn waves-effetc waves-light" onClick={PostData}>Login</button>
                <h6><Link to="/signup">Don't have an Account?</Link></h6>
            </div>
        </div>
    )
}
export default Login;