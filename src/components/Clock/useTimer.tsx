import { useEffect, useState } from 'react'
import secToTimeForInput from './Clock.functions'

const useTimer = (seconds) => {
  const [timeLeft, setTimeLeft] = useState(seconds)
  useEffect(() => {
    if (!timeLeft) return

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [timeLeft])
  const formatted = secToTimeForInput(timeLeft)

  return { ...formatted, timeLeft }
}
export default useTimer
