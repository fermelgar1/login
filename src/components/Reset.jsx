import React, { useCallback, useState } from 'react'
import { auth } from '../firebase'

const Reset = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [confirmacion, setConfirmacion] = useState(null)

    const validarDatos = (e) => {
        e.preventDefault()
        if (!email.trim()) {
            setError('llena todos los campos')
            return
        }
        setError(null)
        recuperar()
    }
    
    const recuperar = useCallback(async () => {
        try {
            await auth.sendPasswordResetEmail(email)
            console.log('correo enviado')
            setConfirmacion('cooreo enviado')
            setEmail('')
        } catch (errord) {
            setError(errord.message)
        }
    },[email])
    

    return (
        <div className='mt-5'>
            <h3 className="text-center">reiniciar contraseña</h3>
            <br/>
            <form onSubmit={ validarDatos }>
                { error && 
                    <div className="alert alert-danger">
                        { error }
                    </div>
                }
                <input 
                onChange={ (e)=> { setEmail(e.target.value) } }
                value={ email }
                type="email" 
                className="form-control mb-2" 
                placeholder='ingresa tu correo' />
                <button type='submit' className="btn btn-lg btn-dark w-100">
                    reiniciar contraseña
                </button>
                { confirmacion && 
                    <div className="alert">
                        { error }
                    </div>
                }
            </form>
        </div>
    )
}

export default Reset
