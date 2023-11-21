export default function formatPhoneNumber (phoneNumber: string) {
  if (phoneNumber.startsWith('+1')) {
    // Format for US numbers: +1 (415) 374 1887
    return phoneNumber.replace(/(\+\d)(\d{3})(\d{3})(\d{4})$/, '$1 ($2) $3 $4')
  } else if (phoneNumber.startsWith('+44')) {
    // Format for UK numbers: +44 (1438) 300532
    return phoneNumber.replace(/(\+\d{2})(\d{4})(\d{6})$/, '$1 ($2) $3')
  } else {
    // Fallback for other formats
    return phoneNumber
  }
}
