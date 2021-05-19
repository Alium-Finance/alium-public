import { useEffect } from 'react'

const useExpired = (between: number) => {
  const exact = window.location.pathname.includes('clock')
  useEffect(() => {
    if (between >= 1) {
      // eslint-disable-next-line no-unused-expressions
      !exact && window.location.replace('/clock')
    } else {
      // eslint-disable-next-line no-unused-expressions
      exact && window.location.replace('/')
    }
  }, [between, exact])
  return exact
}
export default useExpired
