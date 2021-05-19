import { addHours, differenceInMinutes, getHours, getMinutes, getSeconds } from 'date-fns'
import { useEffect, useState } from 'react'

const useTimer = () => {
  const getTime = () => {
    const between = Math.round(differenceInMinutes(new Date(2021, 4, 19, 15, 0, 0), new Date()) * 60)
    return between
  }
  const time = getTime()

  const [timeLeft, setTimeLeft] = useState(time)
  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    // clear interval on re-render to avoid memory leaks
    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(intervalId)
    }
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft])
  // @ts-ignore
  const formatted = convertToDuration(timeLeft)

  return { ...formatted, timeLeft }
}
export default useTimer
export const convertToDuration = (secondsAmount: number) => {
  const normalizeTime = (time: string): string => (time.length === 1 ? `0${time}` : time)

  const SECONDS_TO_MILLISECONDS_COEFF = 1000
  const MINUTES_IN_HOUR = 60

  const milliseconds = secondsAmount * SECONDS_TO_MILLISECONDS_COEFF

  const date = new Date(milliseconds)
  const timezoneDiff = date.getTimezoneOffset() / MINUTES_IN_HOUR
  const dateWithoutTimezoneDiff = addHours(date, timezoneDiff)

  const hours = normalizeTime(String(getHours(dateWithoutTimezoneDiff)))
  const minutes = normalizeTime(String(getMinutes(dateWithoutTimezoneDiff)))
  const seconds = normalizeTime(String(getSeconds(dateWithoutTimezoneDiff)))

  const hoursOutput = hours !== '00' ? `${hours}:` : '0'

  return {
    minutes,
    seconds,
    hoursOutput,
  }
}
