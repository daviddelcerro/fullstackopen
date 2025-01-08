import PropTypes from 'prop-types'
const LoginForm = ({ onSubmit, username, password, handleUsernameChange, handlePasswordChange }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
                    username:
          <input name="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
                    password:
          <input name="password" type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm