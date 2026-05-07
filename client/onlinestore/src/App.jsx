import { createContext, useState, useEffect } from 'react'
import {About,Contact,Footer,Header,Home,Login,Signup,
  Error404,Products,Cart,Wishlist,ProductDetails,ProductForm,
  Orders} from './components'
import {BrowserRouter,Routes,Route} from 'react-router'
import axios from 'axios'

export const AuthContext = createContext()


function App() {
  const [user,setUser] = useState({ username: null, role: null })
  const [csrfToken,setCsrfToken] = useState(null)
  const [loggedIn,setLoggedIn] = useState(false)

  async function fetchCurrentUser(){
    try{
      const response = await axios.get( 'http://127.0.0.1:8000/user/info/', 
                                      {withCredentials:true} 
                                  )

      // set current user's data in state
      console.log( response )
      setUser( response.data )
      setCsrfToken( response.headers[ 'x-csrftoken' ] )
      setLoggedIn( true )
    }
    catch(e){
      console.log( "error -->", e )
    }
  }

  useEffect( ()=>{ fetchCurrentUser() }, [] )



  return (
    <AuthContext value={{ user:user,setUser:setUser,
                          csrfToken:csrfToken,setCsrfToken:setCsrfToken,
                          loggedIn:loggedIn,setLoggedIn:setLoggedIn
                        }}
    >
      <div className='main'>
        <BrowserRouter>

          <div className='header'>
            <Header/>
          </div>

          <div className='content'>
            <Routes>
              <Route path={'/'} element={<Home/>} />
              <Route path={'/about'} element={<About/>} />
              <Route path={'/contact'} element={<Contact/>} />
              <Route path={'/signup'} element={<Signup/>} />
              <Route path={'/login'} element={<Login/>} />
              <Route path={'/products'} element={<Products/>} />
              <Route path={'/products/add'} element={<ProductForm/>} />
              <Route path={'/cart'} element={<Cart/>} />
              <Route path={'/wishlist'} element={<Wishlist/>} />
              <Route path={'/products/:productId'} element={<ProductDetails/>} />
              <Route path={'/orders'} element={<Orders/>} />
              <Route path={'*'} element={<Error404/>} />
            </Routes>
          </div>

          <div className='footer'>
            <Footer/>
          </div>
        </BrowserRouter>

      </div>
    </AuthContext>
  )
}

export default App
