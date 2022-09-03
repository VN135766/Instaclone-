import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Table } from "react-bootstrap"
import Button from 'react-bootstrap/Button'

const Users = (props) => {
  const [ allUsers, setAllUsers ] = useState([
    {
      id: 1,
      username: 'placeholder',
    },
    {
      id: 2,
      username: 'Placeholder 2'
    }
  ])

  const fetchUsers = async () => {
    const lookupQuery = await fetch("/api/user")
    const parsedResponse = await lookupQuery.json()
    if( parsedResponse.result === "success" ){
      setAllUsers(parsedResponse.payload)
    }
  }

  useEffect( () => {
    fetchUsers()
  }, [])

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          { allUsers.map( user => (
            <tr key={user.id}>
              <td>
                <Link to={`/user/${user.id}`}>
                  {user.username}
                </Link>
              </td>
              <td><Button variant="outline-danger">Unfollow</Button>{' '}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Users