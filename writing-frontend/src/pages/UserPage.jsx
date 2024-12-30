import { useParams } from 'react-router-dom'
import MyProfile from '../components/page/MyProfile'
import FollowList from '../components/page/FollowList'
import { Container } from '@mui/material'

function UserPage({ auth }) {
   const { id } = useParams()

   return (
      <Container>
         <MyProfile auth={auth} id={id} />
         <FollowList />
      </Container>
   )
}

export default UserPage
