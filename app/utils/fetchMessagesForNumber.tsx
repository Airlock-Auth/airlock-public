import { supabase } from '../supabaseClient'

export const fetchMessagesForNumber = async (phoneNumber: string) => {
  const { data: messagesData, error } = await supabase
    .from('messages')
    .select('body, from, created_at')
    .eq('to', phoneNumber)

  if (error) {
    console.error('Error fetching messages:', error)
    return []
  } else {
    return messagesData || []
  }
}
