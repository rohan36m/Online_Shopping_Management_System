import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useContext } from "react"
import { AuthContext } from "../App"


function ProductForm() {
  const auth = useContext( AuthContext )
  const {handleSubmit,register} = useForm()


  async function addProduct( data ){
    try{
      data.image = data.image[0]
      const res = await axios.post( 'http://127.0.0.1:8000/product/create/',data, 
                                    { withCredentials:true,
                                      headers: {
                                        'Content-Type': 'multipart/form-data',
                                        'X-CSRFToken': `${auth.csrfToken}`
                                      }
                                    } 
                                )
      console.log( "res -->", res )
      
    }
    catch(e){
      console.log( "error -->", e )
    }
  }


  return (
    <div className='container mt-3 p-3'>
      <h3 className='text-center'>Product Form</h3>
      <form className='w-50 mx-auto' onSubmit={handleSubmit( addProduct )}>
        
        <label>Product Name :</label>
        <input type="text" {...register('product_name')} className='form-control mb-3 mt-1' />

        <label>Product Details :</label>
        <textarea {...register('product_details')} className='form-control mb-3 mt-1' ></textarea>


        <label>Price :</label>
        <input type="number" step={'0.001'} {...register('price')} className='form-control mb-3 mt-1' />

        <label>Product image :</label>
        <input type="file" {...register('image')} className='form-control mb-3 mt-1' />

        <label>Product stock :</label>
        <input type="number" {...register('stock')} className='form-control mb-3 mt-1' />

        <button className='btn btn-outline-success'>Add Product</button>
      </form>
    </div>
  )
}

export default ProductForm

