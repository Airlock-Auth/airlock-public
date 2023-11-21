import { type Session } from '@supabase/gotrue-js/src/lib/types'
import React from 'react'

const NavBar: React.FC<{ session: Session | null, supabase: any }> = ({
  session,
  supabase
}) => {
  return (
    <div>
      <nav className="flex items-center justify-between p-4 pl-16 pr-16 pt-8 text-white border-b border-gray-300">
        <img
          className="pb-4"
          src="/images/logo.png"
          alt="Airlock Logo"
          width="100"
          height="100"
        />
        <div>
          {session?.user
            ? (
            <>
              <button
                className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => supabase.auth.signOut()}
              >
                Sign Out
              </button>
            </>
              )
            : (
            <div></div>
              )}
        </div>
      </nav>
    </div>
  )
}

export default NavBar
