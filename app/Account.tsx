import { supabase } from './supabaseClient'
import NavBar from './components/NavBar/NavBar'
import fetchUsersNumbers from './utils/fetchUsersNumber'
import { type Session } from '@supabase/gotrue-js/src/lib/types'
import React from 'react'
import UserHasNumbers from './components/UserHasNumbers/UserHasNumbers'
import UserHasNoNumbers from './components/UserHasNoNumbers/UserHasNoNumbers'

interface AccountProps {
  session: Session
}

export default function Account ({ session }: AccountProps) {
  const data = fetchUsersNumbers(session) || {
    phone_number: '',
    created_at: ''
  }
  return (
    <div className="flex flex-col h-screen">
      <NavBar session={session} supabase={supabase} />
      {data && data.length > 0
        ? (
        <div className="flex pt-8 justify-center flex-grow">
          <UserHasNumbers data={data} session={session} />
        </div>
          )
        : (
        <div className="flex justify-center items-center pt-32">
          <UserHasNoNumbers session={session} />
        </div>
          )}
    </div>
  )
}
