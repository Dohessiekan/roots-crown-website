import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function StaffIndexRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/services')
  }, [router])
  return null
}
