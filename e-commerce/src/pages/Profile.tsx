import { Heading } from "@components/shared"
import { useAppSelector } from "@redux/hook"


const Profile = () => {
  const accountInfo=useAppSelector((state)=>state.auth.user)
  return (
    <>
      <Heading title="Account Info"></Heading>
      <ul>
        <li>FirstName:{accountInfo?.firstName}</li>
        <li>Last Name:{accountInfo?.lastName}</li>
        <li>Email:{accountInfo?.email}</li>
      </ul>
    </>
  )
}

export default Profile
