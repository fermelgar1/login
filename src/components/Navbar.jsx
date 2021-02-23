import React from 'react'
import { Link, NavLink, withRouter } from "react-router-dom";
import { auth } from '../firebase';

const Navbar = (props) => {

    const logOut = async() => {
        try {
            await auth.signOut()
            props.history.push('/')
        } catch (error) {
            console.log('error', error)
        }  
    }
    

    return (
        <div className='navbar navbar-dark bg-dark'>
            <Link className='navbar-brand ms-2' to='/'>Auth</Link>
            <div className="">
                <div className="d-flex">
                    <NavLink className='btn btn-dark me-2' to='/' exact>
                        Inicio
                    </NavLink>
                    {props.user &&
                        <NavLink className='btn btn-dark me-2' to='/admin'>
                            Admin
                        </NavLink>
                    }
                    {
                        props.user ? 
                        <button  onClick={ logOut } className="btn btn-dark me-2">signOut</button> 
                        :
                        <NavLink className='btn btn-dark me-2' to='/login'>
                            Login
                        </NavLink>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
