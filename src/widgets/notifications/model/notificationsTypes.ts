export type Notification = {
  readAt: string | number
  expiresAt: number
  createdAt: number
  id: string
  subscriptionId: string
  userId: string
  message: string
}

export type MarkAsReadRequest = {
  notificationId: string
}

export type MarkAsReadResponse = {
  readAt: number
}
