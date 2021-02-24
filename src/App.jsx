import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from './components/Admin';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Reset from './components/Reset';
import { auth } from './firebase';

function App() {

  const [firebaseUser, setFirebaseUser] = useState(false)

  useEffect(()=>{
    auth.onAuthStateChanged(user =>{
      console.log('user', user)
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null) 
      }
    })
  },[])

  return firebaseUser !== false ?(
    <Router>
      <div className="container">
        <Navbar user = { firebaseUser }/>
        <Switch>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/admin'>
            <Admin user = { firebaseUser }/>
          </Route>
          <Route path='/reset'>
            <>
              <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                  <Reset/>
                </div>
              </div>
            </>
          </Route>
          <Route path='/' exact>
            inicio
          </Route>
        </Switch>
      </div>
    </Router>
  ): <p>cargando...</p>
}

export default App;
