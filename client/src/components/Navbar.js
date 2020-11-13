import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Navbar=()=>{

    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)

    const RenderList=()=>{
        
        if(state){
            return[
            <Link to="/" className="brand-logo">{state.restaurant_name} Restaurant</Link>,
                <ul id="nav-mobile" className="right">,
                <li>Welcome , {state.owner_name}</li>,
                    <li><a onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/login')
                    }}>Logout</a></li>
                </ul>
            ]
        }else{
            return[
                <Link to="/" className="brand-logo">Restaurant</Link>,
                <ul id="nav-mobile" className="right">,
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/register">Register</Link></li>
                </ul>
            ]
        }

    }

    return(
        <nav className="#212121 grey darken-4">
            <div className="nav-wrapper">
               {RenderList()}
            </div>
        </nav>
    )
    
}

export default Navbar;