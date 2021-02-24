import React, { useCallback, useState } from 'react'
import { withRouter } from 'react-router-dom';
import { auth, provider, db } from "../firebase";

const Login = (props) => {
    
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(null)
    const [esRegistro, setEsRegistro] = useState(false)

    const procesarDatos = (e) => {
        e.preventDefault()
        if (!pass.trim() || !email.trim() || pass.length < 6) {
            const errord = !pass.trim() || !email.trim() ? 'complete los campos' : pass.length < 6 && ('contraseña muy corta')
            console.log(`${errord}`)
            setError(errord)
            return
        }
        setError(null)
        if (esRegistro) {
            registrar()
        } else {
            login()   
        }
    }

    const registrar = useCallback(async()=>{
        try {
           const res =  await auth.createUserWithEmailAndPassword(email,pass)
           await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })
            // await db.collection(res.user.uid).add({
            //     name:'primer tarea',
            //     date: Date.now()
            // })
            setError(null)
            setPass('')
            setEmail('')
            props.history.push('/admin')
        } catch (errord) {
            setError(errord.message)
        }
    },[email,pass, props])

    const registroPop = async() => {
        try { 
           const res =  await auth.signInWithPopup(provider)
           await db.collection('usuarios').doc(res.user.email).set({
               email: res.user.email,
               uid: res.user.uid
           })
        //    await db.collection(res.user.uid).add({
        //         name:'primer tarea',
        //         date: Date.now()
        //     })
           setError(null)            
           setPass('')
           setEmail('')
           props.history.push('/admin')
        } catch (errord) {
            setError(errord)
        }
    }
    
    const login = useCallback(async() => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log('res', res)
            setError(null)            
            setPass('')
            setEmail('')
            props.history.push('/admin')
        } catch (errord) {
            console.log('errord', errord.message)
            setError(errord.message)
        }
    },[email, pass, props.history])
    

    return (
        <div className='mt-5'>
            <h3 className="text-center">
                { esRegistro ? `Registro de usuarios` : `Login de acceso` }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={ procesarDatos }>
                    {
                        error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )
                    }
                        <input type='email' 
                            className="form-control mb-2"
                            placeholder='ingrese un email'
                            value={ email }
                            onChange={ (e) => setEmail(e.target.value) }
                        />
                        <input type='password' 
                            className="form-control mb-2"
                            placeholder='ingrese un password'
                            value={ pass }
                            onChange={ e => setPass(e.target.value) }
                        />
                        <button className="btn btn-dark btn-lg w-100" type='submit'>
                            { esRegistro ? `Registrar` : `Login` }
                        </button>
                        <button
                        type='button'
                        onClick={ registroPop } 
                        className="btn btn-sm w-100 mt-2 btn-secondary">
                            Google
                        </button>
                        <button 
                        onClick={ ()=> setEsRegistro(!esRegistro)}
                        type='button' 
                        className="btn btn-info btn-sm w-100 mt-2">
                             { esRegistro ? `¿Ya tienes una cuenta?` : `Crea una cuenta` }
                        </button>
                        { !esRegistro && 
                            <button 
                            onClick={ ()=> props.history.push('/reset')}
                            type='button' 
                            className="btn btn-danger btn-sm w-100 mt-2">
                                olvide mi contraseña
                            </button>
                            }
                    
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
