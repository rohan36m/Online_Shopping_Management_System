import { useContext } from "react"
import { AuthContext } from "../App"


function Home() {
  const auth = useContext( AuthContext )

  console.log( "auth -->", auth )

  return (
    <div>Home</div>
  )
}

export default Home