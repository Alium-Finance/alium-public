import React,{ useEffect } from 'react'
import './Clock.css'
import useTimer from './useTimer'

const Clock = () => {
  const timer = useTimer()
  useEffect(() => {
    document.body.style.background = '#1c233d'
  }, [])

  return (
    <div className="clock_container">
      <div className="title">
        <h2>COMING SOON</h2>
      </div>
      <div className="clock">
        <div className="days clock_time">
          <p>{0}</p>
          <p id="time_name">D</p>
        </div>
        <div className="hours clock_time">
          <p>{timer.hoursOutput}</p>
          <p id="time_name">H</p>
        </div>
        <div className="minutes clock_time">
          <p>{timer.minutes}</p>
          <p id="time_name">M</p>
        </div>
        <div className="seconds clock_time">
          <p>{timer.seconds}</p>
          <p id="time_name">S</p>
        </div>
      </div>
    </div>
  )
}
export default Clock
