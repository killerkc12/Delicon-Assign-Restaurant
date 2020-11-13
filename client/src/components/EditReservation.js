import { Component, useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import M from 'materialize-css'
import axios from 'axios'

class EditReservation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            customer_name:'',
            customer_mobile:'',
            customer_email:'',
            customer_address:'',
            table_number:'',
            reserved_date:''
         }
         this.onNameChange = this.onNameChange.bind(this);
         this.onMobileChange = this.onMobileChange.bind(this);
         this.onEmailChange = this.onEmailChange.bind(this);
         this.onAddressChange = this.onAddressChange.bind(this);
         this.onTableChange = this.onTableChange.bind(this);
         this.onDateChange = this.onDateChange.bind(this);
         this.onHandleUpdate = this.onHandleUpdate.bind(this);
    }

    componentDidMount(){
        let id = this.props.match.params.id
        fetch(`/getReservation/${id}`,{
                        method:"get",
                        headers:{
                            "Authorization":"Bearer "+localStorage.getItem("jwt")
                        }
                    })
                    .then(res=>res.json())
                    .then(result=>{
                        console.log(result)
                        this.setState(result)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
    }

    onNameChange(e){
        this.setState({
            customer_name:e.target.value
        })
    }

    onMobileChange(e){
        this.setState({
            customer_mobile:e.target.value
        })
    }

    onEmailChange(e){
        this.setState({
            customer_email:e.target.value
        })
    }

    onAddressChange(e){
        this.setState({
            customer_address:e.target.value
        })
    }

    onTableChange(e){
        this.setState({
            table_number:e.target.value
        })
    }

    onDateChange(e){
        this.setState({
            reserved_date:e.target.value
        })
    }

    onHandleUpdate(e){

        M.toast({html:"Reservation Updating..."})
        const updateReserve = {
            customer_name : this.state.customer_name,
            customer_mobile : this.state.customer_mobile,
            customer_email : this.state.customer_email,
            customer_address : this.state.customer_address,
            table_number : this.state.table_number,
            reserved_date : this.state.reserved_date
        };

        axios.put('/editReservation/'+this.props.match.params.id,updateReserve)
        .then((res)=>{
            console.log(res.data)
            M.toast({html:"Reservation Updated Successfully!",classes:"#00c853 green accent-4"})
        })
        .catch(err=>{
            console.log(err)
        })

        this.props.history.push('/')

    }

    render() { 
        return ( 
            <div>
             <div className="mycard">
                 <div className="card new-reservation-card">
                     <h1 className="brand-logo">Edit Reservation</h1>
                     <form onSubmit={this.onHandleUpdate}>
                     <input type="text" onChange={this.onNameChange} ref="customer_name" placeholder="Enter Customer Name" value={this.state.customer_name} />
                     <input type="text" onChange={this.onMobileChange} ref="customer_mobile" placeholder="Enter Customer Mobile Number" value={this.state.customer_mobile}/>
                     <input type="email" onChange={this.onEmailChange} ref="customer_email" placeholder="Enter Customer Email" value={this.state.customer_email}  />
                     <input type="text" onChange={this.onAddressChange} ref="customer_address" placeholder="Enter Customer Address" value={this.state.customer_address} />
                     <input type="text" onChange={this.onTableChange} ref="table_number" placeholder="Enter Table Number" value={this.state.table_number}  />
                     <input type="datetime-local" onChange={this.onDateChange} ref="reserved_date" placeholder="Choose Date and Time" value={this.state.reserved_date}/>
                     <button type="submit" className="btn waves-effetc waves-light">Update Reservation</button>
                     </form>
                 </div>
             </div>       
         </div>
         );
    }
}
 
export default EditReservation;