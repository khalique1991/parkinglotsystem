export const formatCurrency = (amount, locale='en-IN', currency='INR') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)
