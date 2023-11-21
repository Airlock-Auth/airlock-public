export const handlePurchaseNumber = async (
  country: string,
  email: string | undefined,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true)
  try {
    // Make the API call to purchase a number with the "country" and "email" parameters
    const response = await fetch(
      `/api/getnumber?country=${country}&email=${email}`
    ) // Update the URL to match your API endpoint
    if (response.ok) {
      // Handle success, e.g., show a success message or update the UI
      console.log('Number purchased successfully')
    } else {
      // Handle errors, e.g., show an error message or perform error handling
      console.error('Error purchasing number')
    }
  } catch (error) {
    console.error('Error purchasing number:', error)
  } finally {
    setIsLoading(false)
  }
}
