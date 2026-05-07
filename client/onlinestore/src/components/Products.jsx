import { useEffect, useState } from "react"
import axios from 'axios'
import { useContext } from "react"
import { AuthContext } from "../App"
import { NavLink } from "react-router"


function Products() {
  const auth = useContext( AuthContext )
  const [products,setProducts] = useState([])

  async function fetchProducts() {
    try{
      const res = await axios.get( 'http://127.0.0.1:8000/product/list/',{}, 
                                    {withCredentials:true} 
                                )
      console.log( "res -->", res )
      setProducts( res.data )
    }
    catch(e){
      console.log( "error -->", e )
    }
  }


  useEffect( ()=>{ fetchProducts() }, [] )



  async function addToCart( productId ) {
    try{
      const res = await axios.post( 'http://127.0.0.1:8000/cart/create/',{ product : productId }, 
                                    {withCredentials:true,
                                      headers: {
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


  async function addToWishlist( productId ) {
    try{
      const res = await axios.post( 'http://127.0.0.1:8000/wishlist/create/',{ product : productId }, 
                                    {withCredentials:true,
                                      headers: {
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
      <h3>Products</h3>
      <div className="d-flex gap-3">
        {
          products.map( e => <div className="card" style={{width: '18rem'}}>
                                <NavLink to={`/products/${e.id}`}><img src={e.image} className="card-img-top" alt="..." /></NavLink>
                                <div className="card-body">
                                  <h5 className="card-text"> 
                                    {e.product_name}

                                  </h5>
                                  <p className="card-text">{e.price}
                                    <div className="float-end">
                                      <i onClick={ ()=>{ addToCart( e.id )  } } className="bi bi-cart-plus btn btn-sm btn-success ms-2"></i>
                                      <i onClick={ ()=>{ addToWishlist( e.id )  } } className="bi bi-bag-heart btn btn-sm btn-info ms-2"></i>
                                    </div>
                                  </p>
                                </div>
                              </div>

          )
        }
      </div>

    </div>
  )
}

export default Products