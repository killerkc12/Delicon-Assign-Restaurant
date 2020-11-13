import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import M from 'materialize-css'


const NewReservation=()=>{

    const history = useHistory()
    const [customer_name,setCustomerName] = useState("")
    const [customer_mobile,setCustomerMobile] = useState("")
    const [customer_email,setCustomerEmail] = useState("")
    const [customer_address,setCustomerAddress] = useState("")
    const [table_number,setTableNumber] = useState("")
    const [reserved_date,setReservedDate] = useState("")
    const [reserved_timing,setReservedTiming] = useState("")

    const uploadFields=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(customer_email)){
            M.toast({html:'Invalid Email',classes:"#f44336 red"})
            return
        }
        M.toast({html:"Please wait , Reservaton Creating..."})
        fetch('/addReservation',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                customer_name,customer_mobile,customer_email,customer_address,table_number,reserved_date,reserved_timing
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"#f44336 red"})
            }else{
                M.toast({html:"New Reservation Added Successfully!",classes:"#00c853 green accent-4"})
                history.push("/")
            }
        })
        .then(err=>{
            console.log(err)
        })
    }

    return(
        <div>
            <div className="mycard">
                <div className="card new-reservation-card">
                    <h1 className="brand-logo">Add New Reservation</h1>
                    <input type="text" placeholder="Enter Customer Name" value={customer_name} onChange={(e)=>setCustomerName(e.target.value)} />
                    <input type="text" placeholder="Enter Customer Mobile Number" value={customer_mobile} onChange={(e)=>setCustomerMobile(e.target.value)} />
                    <input type="email" placeholder="Enter Customer Email" value={customer_email} onChange={(e)=>setCustomerEmail(e.target.value)} />
                    <input type="text" placeholder="Enter Customer Address" value={customer_address} onChange={(e)=>setCustomerAddress(e.target.value)} />
                    <input type="text" placeholder="Enter Table Number" value={table_number} onChange={(e)=>setTableNumber(e.target.value)} />
                    <input type="datetime-local" placeholder="Choose Date and Time" value={reserved_date} onChange={(e)=>setReservedDate(e.target.value)} />
                    <button className="btn waves-effetc waves-light" onClick={uploadFields}>Add New Reservation</button>
                </div>
            </div>
        </div>
    )
}

export default NewReservation