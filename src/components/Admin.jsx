import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Listas from './Listas'

const Admin = (props) => {
    
    const usuario = props.user

    useEffect(()=>{
        if (usuario) {
            console.log('existe un usuario')
        }else{
            console.log('no existe un usuario')
            props.history.push('/')
        }
    },[props.history, usuario])

    return usuario ? (
        <div>
            <Listas
                user={usuario}
            />
        </div>
    ):<p>inicio</p>
}

export default withRouter(Admin)
