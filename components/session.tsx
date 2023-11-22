import { useAuthDispatch, useAuthState, getSession } from 'context/auth'
import { useEffect } from 'react'

export default function Session() {
  const authDispatch = useAuthDispatch()
  const { isLoggedIn } = useAuthState()

  useEffect(() => {
    if(isLoggedIn) {
      return
    }

    getSession(authDispatch)
  }, [isLoggedIn, authDispatch])

  return <></>

}
