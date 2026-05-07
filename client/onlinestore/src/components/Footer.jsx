import { NavLink } from 'react-router'

function Footer() {
  return (
    <div className='border'>

      <div className='d-flex p-2'>

          <div className='col d-flex flex-column text-center'>
            <NavLink>Pages</NavLink>
            <NavLink to="/" >Products</NavLink>
            <NavLink to="/" >---</NavLink>
            <NavLink to="/" >---</NavLink>
          </div>

          <div className='col d-flex flex-column text-center'>
            <NavLink>Account</NavLink>
            <NavLink to="/" >Signup</NavLink>
            <NavLink to="/" >Login</NavLink>
            <NavLink to="/" >Logout</NavLink>
          </div>

          <div className='col d-flex flex-column text-center'>
            <NavLink>Other</NavLink>
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/about" >About</NavLink>
            <NavLink to="/contact" >Contact</NavLink>
          </div>

      </div>

    </div>
  )
}

export default Footer