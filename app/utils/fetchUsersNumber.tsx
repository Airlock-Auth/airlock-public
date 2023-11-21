import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { type Session } from '@supabase/gotrue-js/src/lib/types'

interface NumberData {
  id: number
  email: string
  created_at: string
  phone_number: string
}

const useFetchUsersNumbers = (session: Session) => {
  const [data, setData] = useState<NumberData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data: numbersData, error } = await supabase
        .from('numbers')
        .select('*')
        .eq('email', session.user.email)

      if (error) {
        console.log('Error fetching data:', error)
        setData([])
      } else {
        setData(numbersData || [])
      }
    }

    fetchData()
  }, [session])

  return data
}

export default useFetchUsersNumbers
