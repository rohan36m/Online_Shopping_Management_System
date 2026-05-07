import { useEffect, useState } from "react"
import axios from 'axios'
import { useContext } from "react"
import { AuthContext } from "../App"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"


function Cart() {
  const auth = useContext( AuthContext )
  const [cartProducts,setCartProducts] = useState([])
  const {handleSubmit,register} = useForm()
  const nav = useNavigate()

  async function fetchCartProducts() {
    try{
      const res = await axios.get( 'http://127.0.0.1:8000/cart/list/', 
                                    {withCredentials:true} 
                                )
      console.log( "res -->", res )
      setCartProducts( res.data )
    }
    catch(e){
      console.log( "error -->", e )
    }
  }


  useEffect( ()=>{ fetchCartProducts() }, [] )


  async function removeFromCart( cartId ){
    try{
      const res = await axios.delete( `http://127.0.0.1:8000/cart/delete/${cartId}/`, 
                                    {withCredentials:true,
                                      headers: {
                                        'X-CSRFToken': `${auth.csrfToken}`
                                      }
                                    } 
                                )
      console.log( "res -->", res )
      await fetchCartProducts()
    }
    catch(e){
      console.log( "error -->", e )
    }
  }

  async function placeOrder(data) {
    try{
      const res = await axios.post( `http://127.0.0.1:8000/order/create/`, data, 
                                    {withCredentials:true,
                                      headers: {
                                        'X-CSRFToken': `${auth.csrfToken}`
                                      }
                                    } 
                                )
      console.log( "res -->", res )
      nav('/orders')
    }
    catch(e){
      console.log( "error -->", e )
    }
  }


  return (
    <div className='container mt-3 p-3'>
      <h3>Products</h3>
      <div className="d-flex gap-3">
        <div className="d-flex gap-3">
          {
            cartProducts.map( e => <div className="card" style={{width: '18rem'}}>
                                  <img src={e.product.image} className="card-img-top" alt="..." />
                                  <div className="card-body">
                                    <h5 className="card-text"> {e.product.product_name}</h5>
                                    <span className="card-text">{e.product.price}</span>


                                    <div className="float-end">

                                      <div className="btn-group" role="group" aria-label="Basic outlined example">
                                        <i onClick={ ()=>{ removeFromCart( e.id ) } } className="bi bi-cart-dash btn btn-danger btn-sm"></i>
                                        <button type="button" className="btn btn-outline-primary">-</button>
                                        <button type="button" className="btn btn-outline-primary"><i className="bi bi-cart"></i> {e.quantity} </button>
                                        <button type="button" className="btn btn-outline-primary">+</button>
                                      </div>

                                    </div>
                                  
                                  </div>
                                </div>
            )
          }
        </div>
      </div>


      {
        cartProducts.length > 0 ?
          <div className="container w-50 mt-5 p-2">
            <form onSubmit={handleSubmit(placeOrder)}>
              <label>Address :</label>
              <textarea {...register('address')} className="form-control mb-2"></textarea>
              <button className="btn btn-outline-success">Place Order</button>
            </form>
          </div>
        :
        <></>
      }



    </div>
  )
}

export default Cart