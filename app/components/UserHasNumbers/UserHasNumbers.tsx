import React, { useEffect, useState } from 'react'
import { formatDateToShortenedString } from '@/app/utils/dateUtils'
import { handlePurchaseNumber } from '@/app/utils/handlePurchaseNumber'
import { type Session } from '@supabase/gotrue-js/src/lib/types'
import { fetchMessagesForNumber } from '@/app/utils/fetchMessagesForNumber'
import formatPhoneNumber from '@/app/utils/formatPhoneNumber'

interface NumberListProps {
  data: any[]
  session: Session
}

interface Message {
  body: string
  from: string
  created_at: string
}

type MessagesMap = Record<string, Message[]>

const UserHasNumbers: React.FC<NumberListProps> = ({ data, session }) => {
  const [selectedCountry, setSelectedCountry] = useState('US')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<MessagesMap>({})

  useEffect(() => {
    data.forEach((item) => {
      fetchAndSetMessages(item.phone_number)
    })
  }, [data])

  const fetchAndSetMessages = async (phoneNumber: string) => {
    const messagesData = await fetchMessagesForNumber(phoneNumber)
    setMessages((prevMessages) => ({
      ...prevMessages,
      [phoneNumber]: messagesData
    }))
  }

  return (
    <div className="flex pb-32 justify-left pl-40 flex-grow">
      <div>
        <h3 className="text-2xl font-bold pb-2">Your Airlock:</h3>

        <div className="gradient-line mb-8"></div>

        <ul className="space-y-4">
          {data.map((item, index) => (
            <li key={index} className="p-4 border border-gray-200 rounded-lg">
              <p className="text-lg font-bold">
                Number:{' '}
                <span className="text-blue-600">
                  {formatPhoneNumber(item.phone_number)}
                </span>
              </p>

              <p className="text-sm text-gray-600 mt-2">
                Region:
                {item.phone_number.startsWith('+1') && (
                  <span> United States 🇺🇸</span>
                )}
                {item.phone_number.startsWith('+44') && (
                  <span> United Kingdom 🇬🇧</span>
                )}
              </p>

              <p className="text-sm text-gray-500">
                Registered: {formatDateToShortenedString(item.created_at)}
              </p>

              <div>
                <h3 className="pt-4 font-bold">Recent Messages:</h3>
                <ul className="list-inside space-y-2 mt-2">
                  {messages[item.phone_number] &&
                  messages[item.phone_number].length > 0
                    ? (
                        messages[item.phone_number].map((message, messageIndex) => (
                      <li key={messageIndex} className="text-sm text-gray-700">
                        <p>
                          Received:{' '}
                          {formatDateToShortenedString(message.created_at)}
                        </p>
                        <p>From: {formatPhoneNumber(message.from)}</p>
                        <p className="break-words">Body: {message.body}</p>
                      </li>
                        ))
                      )
                    : (
                    <p className="text-sm text-gray-500">
                      This number has no recent messages.
                    </p>
                      )}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="mb-4 pt-16 font-bold">Create more numbers:</h2>
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

export default UserHasNumbers
