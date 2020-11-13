import {  useEffect, useState } from "react"
import { Link } from "react-router-dom"
import M from 'materialize-css'

const Home=()=>{
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch('/myReservation',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setData(result)
        })
    },[])


    const deleteReservation=(reservationId)=>{
        M.toast({html:"Please wait , Deleting..."})
        fetch(`/deleteReservation/${reservationId}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id!==result._id
            })
            setData(newData)
            M.toast({html:"Reservation Deleted Successfully!",classes:"#00c853 green accent-4"})
        })
    }
        return(
            <div>
                <div>
                <Link to="/newReservation" className="btn waves-effect waves-light">Add New Reservation
                <i className="material-icons right">add</i>
                </Link>
                </div>
                <div className="home">
                <table>
                    <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Mobile Number</th>
                        <th>Customer Email</th>
                        <th>Customer Address</th>
                        <th>Table Number</th>
                        <th>Reserved Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            
                            data.map(item=>{
                                return(
                                    <tr key={item._id}>
                                        <td>{item.customer_name}</td>
                                        <td>{item.customer_mobile}</td>
                                        <td>{item.customer_email}</td>
                                        <td>{item.customer_address}</td>
                                        <td>{item.table_number}</td>
                                        <td>{item.reserved_date}</td>
                                        <Link to={"/editReservation/"+item._id}><td className="material-icons">edit</td></Link>
                                        <td className="material-icons" onClick={()=>deleteReservation(item._id)} style={{color:"red"}}>delete</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                </div>
            </div>
        )
    
}

export default Home