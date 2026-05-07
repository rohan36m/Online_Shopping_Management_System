import { useEffect, useState } from "react"
import axios from 'axios'
import { useContext } from "react"
import { AuthContext } from "../App"
import { useParams } from "react-router"


function ProductDetails() {
  const auth = useContext( AuthContext )
  const [product,setProduct] = useState({})
  const {productId} = useParams()

  async function fetchProduct() {
    try{
      const res = await axios.get( `http://127.0.0.1:8000/product/retrieve/${productId}/`, 
                                    {withCredentials:true} 
                                )
      console.log( "res -->", res )
      setProduct( res.data )
    }
    catch(e){
      console.log( "error -->", e )
    }
  }


  useEffect( ()=>{ fetchProduct() }, [] )

  return (
    <div className="container mt-2 p-2">
        <div className="container">
          <div><img src={product.image} style={{height:'40vh'}} /></div>
          <div>
            <h5>{product.product_name}</h5>
          </div>
          <div>
            Price : {product.price}
          </div>
          
          <div>
            Details : {product.product_details}
          </div>
          <div>
            seller : {product.seller}
          </div>
        </div>
    </div>
  )
}

export default ProductDetails