import React, { useState } from 'react'
import { supabase } from './supabaseClient'
import NavBar from './components/NavBar/NavBar'

export default function Auth () {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()

    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email.')
    }
    setLoading(false)
  }
  return (
    <div className="flex flex-col h-screen">
      <NavBar session={null} supabase={null} />
      <div className="flex flex-col mt-32 items-center justify-center text-center">
        <img
          className="pb-4"
          src="/images/logo.png"
          alt="Airlock Logo"
          width="200"
          height="200"
        />
        <h3 className="text-1xl font-bold">
          2FA SMS anywhere. Even on a plane.
        </h3>
      </div>
      <div className="flex justify-center">
        <div className="w-64 p-4 bg-white mt-16 rounded-lg shadow-md">
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                className="inputField w-full px-3 py-2 border border-gray-300 rounded"
                type="email"
                placeholder="Your email"
                value={email}
                required={true}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div>
              <button
                className="button w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
              >
                {loading ? <span>Loading</span> : <span>Continue</span>}
              </button>
            </div>
          </form>
          {message && (
            <div className="mt-4 text-center text-black-500">{message}</div>
          )}
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="pb-4"></div>
    </div>
  )
}
