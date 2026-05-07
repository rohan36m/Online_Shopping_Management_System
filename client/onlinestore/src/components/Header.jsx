import {NavLink,useNavigate} from 'react-router'
import { useContext } from "react"
import { AuthContext } from "../App"
import axios from 'axios'

function Header() {
  const auth = useContext( AuthContext )
  const nav = useNavigate()

  async function logoutUser(){
    try{
      const res = await axios.post( 'http://127.0.0.1:8000/logout/',{}, 
                                    { withCredentials:true,
                                      headers: {
                                        'X-CSRFToken': `${auth.csrfToken}`
                                      }
                                    } 
                                )
      console.log( "res -->", res )

      auth.setUser({ username: null, role: null })
      auth.setCsrfToken( null )
      auth.setLoggedIn( false )
      nav( '/login' )
    }
    catch(e){
      console.log( "error -->", e )
    }
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">OnlineStore</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-link active" aria-current="page" to="/"><i className="bi bi-house"></i> Home</NavLink>
              <NavLink className="nav-link" to="/products"><i className="bi bi-bag"></i> Products</NavLink>

              {
                auth.user.role === "buyer" ? 

                <>
                  <NavLink className="nav-link" to="/cart"><i className="bi bi-cart"></i> Cart</NavLink>
                  <NavLink className="nav-link" to="/wishlist"><i className="bi bi-bag-heart"></i> Wishlist</NavLink>
                  <NavLink className="nav-link" to="/orders"><i className="bi bi-bag-fill"></i> Orders</NavLink>
                </>
                
                :
                auth.user.role === "seller" ?
                
                <>
                  <NavLink className="nav-link" to="/products/add"><i className="bi bi-bag-plus"></i> Add Products</NavLink>
                </>

                :

                <></>

              }
              

            
            
            </div>

            <div className="navbar-nav ms-auto">
              {
                auth.loggedIn ?
                <>
                  <NavLink className="nav-link" to="#"><i className="bi bi-person-circle"></i> {auth.user.username}</NavLink>
                  <NavLink className="nav-link" onClick={ logoutUser }><i className="bi bi-box-arrow-in-right"></i> Logout</NavLink>
                </>
                :

                <>
                  <NavLink className="nav-link" to="/signup"><i className="bi bi-person-circle"></i> Signup</NavLink>
                  <NavLink className="nav-link" to="/login"><i className="bi bi-box-arrow-in-left"></i> Login</NavLink>
                </>
              }
              
            </div>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header