import React, { useState } from 'react'
import { handlePurchaseNumber } from '@/app/utils/handlePurchaseNumber'
import { type Session } from '@supabase/gotrue-js/src/lib/types'

interface UserHasNoNumbersProps {
  session: Session
}

const UserHasNoNumbers: React.FC<UserHasNoNumbersProps> = ({ session }) => {
  const [selectedCountry, setSelectedCountry] = useState('US')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex justify-center items-center pt-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>
        <h2 className="mb-4 pt-4 ">
          Create a number for each country you need:
        </h2>
        <div className="flex items-center justify-center">
          <label htmlFor="numberRegion" className="mr-4 text-gray-600">
            Select region:
          </label>
          <select
            id="numberRegion"
            onChange={(e) => {
              setSelectedCountry(e.target.value)
            }}
            value={selectedCountry}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="US">US</option>
            <option value="GB">UK</option>
          </select>

          <button
            onClick={async () => {
              await handlePurchaseNumber(
                selectedCountry,
                session.user.email,
                setIsLoading
              )
            }}
            disabled={isLoading}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isLoading ? 'Purchasing...' : 'Create Number'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserHasNoNumbers
