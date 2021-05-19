import { differenceInMinutes } from 'date-fns'
import React, { FC } from 'react'
import './Clock.css'
import useTimer from './useTimer'

type Props = {
  children: React.ReactNode
}
const Clock: FC<Props> = ({ children }) => {
  const getTime = () => {
    const endData = new Date('May 20, 2021 15:00:00 GMT+03:00')
    const between = Math.round(differenceInMinutes(endData, new Date()) * 60)
    return between
  }
  const time = getTime()
  const timer = useTimer(time)
  if (time <= 0) {
    return <>{children}</>
  }

  return (
    <div className="clock_container">
      {children}

      <div className="clock">
        {/* <div className="days clock_time">
          <p>{timer.days}</p>
        </div> */}
        <div className="hours clock_time">
          <p>{timer.hours}</p>
        </div>
        <div className="minutes clock_time">
          <p>{timer.minutes}</p>
        </div>
        <div className="seconds clock_time">
          <p>{timer.seconds}</p>
        </div>
      </div>
    </div>
  )
}
export default Clock
