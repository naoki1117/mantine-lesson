import type { NextPage } from 'next'
import { useEffect } from 'react'
import { supabase } from '../utills/supabase'
import useStore from '../store'
import { Auth } from '../components/Auth'
import { DashBord } from '../components/DashBord'

const Home: NextPage = () => {
  const session = useStore((state) => state.session )
  const setSession = useStore((state) => state.setSession)
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event,session) => {
      setSession(session)
    })
  },[setSession])
  return (
    <>{session ? <DashBord />:<Auth />}</>
  )
}

export default Home
