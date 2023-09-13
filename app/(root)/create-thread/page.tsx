import PostThread from '@/components/forms/PostThread'
import { fetchUser } from '@/lib/actions/user.actions'
import { userData } from '@/types'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function CreateThread() {
    const user = await currentUser()
  
    if(!user) {
        redirect('/sign-in')
    }
    const userInfo: userData = await fetchUser(user.id)
    if(!userInfo.onboarded) {
        redirect('/onboarding')
    }
    

    // console.log(userInfo, 'user info')

  return (
    <>
      <h1 className='head-text'>create thread</h1>
      <PostThread userId={userInfo._id.toString()}/>
    </>
  )
}