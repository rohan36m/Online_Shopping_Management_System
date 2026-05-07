import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router'
import { useContext } from "react"
import { AuthContext } from "../App"


function Login() {
  const auth = useContext( AuthContext )
  const {handleSubmit,register} = useForm()
  const nav = useNavigate()

  async function loginUser( data ){
    try{
      // login user

      const res = await axios.post( 'http://127.0.0.1:8000/login/', data, 
                                    {withCredentials:true} 
                                )
      console.log( "res -->", res, res.headers[ 'x-csrftoken' ] )

      // set csrt token in state
      auth.setCsrfToken( res.headers[ 'x-csrftoken' ] )

                                
      // before navigating to home page , fetch current user's data
      const response = await axios.get( 'http://127.0.0.1:8000/user/info/', 
                                    {withCredentials:true} 
                                )

      // set current user's data in state
      auth.setUser( response.data )


      // set loggedIn state to true
      auth.setLoggedIn( true )

      // navigating to home page
      nav( '/' )
    }
    catch(e){
      console.log( "error -->", e )
    }
  }

  return (
    <div className='container mt-3 p-3'>

      <form onSubmit={handleSubmit( loginUser )}>
        <label className='form-label'>Username :</label>
        <input type='text' className='form-control mb-3' {...register('username')}/>

        <label className='form-label'>Password :</label>
        <input type='password' className='form-control mb-3' {...register('password')}/>

        <button className='btn btn-success'>Login</button>
      </form>

    </div>
  )
}

export default Login



