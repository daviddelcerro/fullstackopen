/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === '') {
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification