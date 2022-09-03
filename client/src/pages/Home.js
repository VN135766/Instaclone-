import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Post from './Post'

const Home = (props) => {
  
  return (
    <div>
      <h1 className="text-center">Welcome to Instaclone!</h1>

      { props.authUser && props.authUser.email !== undefined && (
        <p>We have a logged in user: { props.authUser.email } </p>
      )}
      <section>

        <Post username={'Placeholder'} caption={"Placeholder caption"} imageurl={"https://cdn-media-1.freecodecamp.org/images/1*qUlxDdY3T-rDtJ4LhLGkEg.png"}/>
        <Post username={'Placeholder'} caption={"Placeholder caption"} imageurl={"https://cdn-media-1.freecodecamp.org/images/1*qUlxDdY3T-rDtJ4LhLGkEg.png"}/>
        <Post username={'Placeholder'} caption={"Placeholder caption"} imageurl={"https://cdn-media-1.freecodecamp.org/images/1*qUlxDdY3T-rDtJ4LhLGkEg.png"}/>
        
      </section>
    </div>
  )
}

export default Home