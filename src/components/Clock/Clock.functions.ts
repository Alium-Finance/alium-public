const secToTimeForInput = (duration: number) => {
  let seconds: any = Math.floor((duration / 1) % 60)
  let minutes: any = Math.floor((duration / (1 * 60)) % 60)
  let hours: any = Math.floor((duration / (1 * 60 * 60)) % 24)
  let days: any = Math.floor(duration / (1 * 60 * 60 * 60))

  hours = hours < 10 ? `0${hours}` : hours
  minutes = minutes < 10 ? `0${minutes}` : minutes
  seconds = seconds < 10 ? `0${seconds}` : seconds
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(+hours)) {
    hours = '00'
  }

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(+minutes)) {
    minutes = '00'
  }

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(+days)) {
    days = '00'
  }
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(seconds)) {
    seconds = '00'
  }

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}
export default secToTimeForInput
