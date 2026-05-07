import { useEffect, useState } from "react"
import axios from 'axios'
import { useContext } from "react"
import { AuthContext } from "../App"
import { NavLink } from "react-router"

function Orders() {
  const auth = useContext( AuthContext )
  const [orders,setOrders] = useState([])

  async function fetchOrders() {
    try{
      const res = await axios.get( 'http://127.0.0.1:8000/order/list/', 
                                    {withCredentials:true} 
                                )
      console.log( "res -->", res )
      setOrders( res.data )
    }
    catch(e){
      console.log( "error -->", e )
    }
  }


  useEffect( ()=>{ fetchOrders() }, [] )



  return (
    <div className="container mt-3 p-3">
      <h1>Orders</h1>

      {
        orders.map( e=> <div className="mb-5">
                          <div className="d-flex border p-2 bg-light"> 
                            <div className="col">{e.id}</div>
                            <div className="col">{e.created_at}</div>
                            <div className="col">{e.status}</div> 
                            <div className="col">{e.address}</div> 
                          </div>
                          
                          {
                            e.order_items.map( item=> <div className="d-flex p-2 border">
                                                        <div className="col">{item.product_name}</div>
                                                        <div className="col">{item.price}</div>
                                                        <div className="col">{item.quantity}</div>
                                                        <div className="col">
                                                          <NavLink to={`/products/${item.product}`} className="btn btn-outline-info btn-sm" >product details</NavLink>
                                                        </div>
                                                      </div>
                            )
                          }

                        </div>
        )
      }


    </div>
  )
}

export default Orders


