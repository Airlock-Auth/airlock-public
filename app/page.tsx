'use client'
import React, { useState, useEffect } from 'react'
import './globals.css'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'
import { type Session } from '@supabase/gotrue-js/src/lib/types'

function App () {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div>
      {!session
        ? (
        <Auth />
          )
        : (
        <Account key={session.user.id} session={session} />
          )}
    </div>
  )
}

export default App
