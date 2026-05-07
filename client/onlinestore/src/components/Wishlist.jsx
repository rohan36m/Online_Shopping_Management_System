import { useEffect, useState } from "react"
import axios from 'axios'
import { useContext } from "react"
import { AuthContext } from "../App"


function Wishlist() {
  const auth = useContext( AuthContext )
  const [wishlistProducts,setWishlistProducts] = useState([])

  async function fetchWishlistProducts() {
    try{
      const res = await axios.get( 'http://127.0.0.1:8000/wishlist/list/', 
                                    {withCredentials:true} 
                                )
      console.log( "res -->", res )
      setWishlistProducts( res.data )
    }
    catch(e){
      console.log( "error -->", e )
    }
  }


  useEffect( ()=>{ fetchWishlistProducts() }, [] )


  
  async function removeFromWashlist( wishlistId ){
    try{
      const res = await axios.delete( `http://127.0.0.1:8000/wishlist/delete/${wishlistId}/`, 
                                    {withCredentials:true,
                                      headers: {
                                        'X-CSRFToken': `${auth.csrfToken}`
                                      }
                                    } 
                                )
      console.log( "res -->", res )
      await fetchWishlistProducts()
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
            wishlistProducts.map( e => <div className="card" style={{width: '18rem'}}>
                                  <img src={e.product.image} className="card-img-top" alt="..." />
                                  <div className="card-body">
                                    <h5 className="card-text"> {e.product.product_name}</h5>
                                    <p className="card-text">{e.product.price} 

                                      <i onClick={ ()=>{ removeFromWashlist( e.id ) } } className="bi bi-trash btn btn-danger btn-sm float-end"></i>
                                    </p>
                                  </div>
                                </div>

            )
          }
        </div>
      </div>

    </div>
  )
}

export default Wishlist