import { useEffect, useRef, useState } from 'react'

export type SsePhoto = {
  id: string
  createdAt: string
  updatedAt: string
  fileName: string
  url: string
  metatype: string
  status: string
  postId: string
}

export const useSsePhotos = () => {
  const [photo, setPhoto] = useState<SsePhoto | null>(null) //хранит последнее полученное фото
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true) //показывает, что соединение ещё не установлено
  const esRef = useRef<EventSource | null>(null) //ссылка на EventSource, чтобы можно было закрыть соединение при размонтировании

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setError('Authorization token not found')
      setLoading(false)
      return
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/posts/sse-file`

    const es = new EventSource(url) //объект, который слушает поток событий от сервера
    esRef.current = es

    es.onopen = () => {
      setLoading(false) //соединение успешно открыто
      setError(null)
    }

    es.onmessage = event => {
      try {
        const parsed = JSON.parse(event.data)
        if (parsed && parsed.id && parsed.url) {
          setPhoto(parsed)
        }
      } catch (err) {
        console.error('Ошибка парсинга SSE:', err)
      }
    }

    es.onerror = err => {
      console.error('Ошибка SSE-соединения:', err)
      setError('Ошибка подключения к серверу')
      setLoading(false)
      es.close()
    }

    return () => {
      es.close() //Закрываем SSE-соединение
      esRef.current = null
    }
  }, [])

  return { photo, loading, error }
}
