import {useForm} from 'react-hook-form'
import axios from 'axios'

function Signup() {
  const {handleSubmit,register} = useForm()

  async function registerUser( data ){
    try{
      const res = await axios.post( 'http://127.0.0.1:8000/signup/', data )
      console.log( "res -->", res )
    }
    catch(e){
      console.log( "error -->", e )
    }
  }


  return (
    <div className='container mt-3 p-3'>

      <form onSubmit={handleSubmit( registerUser )}>
        <label className='form-label'>Username :</label>
        <input type='text' className='form-control mb-3' {...register('username')}/>

        <label className='form-label'>Password :</label>
        <input type='password' className='form-control mb-3' {...register('password')}/>

        <button className='btn btn-success'>SignUp</button>
      </form>

    </div>
  )
}

export default Signup

