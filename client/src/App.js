import { createContext, useContext, useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import EditReservation from './components/EditReservation';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import NewReservation from './components/NewReservation';
import Register from './components/Register';
import { initialState, reducer } from './components/userReducer';

export const UserContext = createContext()

const Routing=()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const restaurant = JSON.parse(localStorage.getItem('restaurant'))
    if(restaurant){
      dispatch({type:"RESTAURANT",payload:restaurant})
    }else{
      history.push('/login')
    }
  },[])

  return(
    <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route path="/login" component={Login} exact></Route>
        <Route path="/register" component={Register} exact></Route>
        <Route path="/newReservation" component={NewReservation} exact></Route>
        <Route path="/editReservation/:id" component={EditReservation} exact></Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
      <UserContext.Provider value={{state,dispatch}}>
          <BrowserRouter>
          <Navbar/>
          <Routing/>
          </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
