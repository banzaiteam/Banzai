export const fetchSubscription = async () => {
  const token = localStorage.getItem('accessToken')

  const request = await fetch('https://gate.yogram.ru/api/v1/business/subscriptions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const response = await request.json()
  return response
}
