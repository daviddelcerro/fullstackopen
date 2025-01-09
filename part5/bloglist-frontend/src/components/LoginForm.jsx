import PropTypes from 'prop-types'
const LoginForm = ({ onSubmit, username, password, handleUsernameChange, handlePasswordChange }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
                    username:
          <input name="username" data-testid="username-input" placeholder="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
                    password:
          <input name="password" data-testid="password-input" placeholder="password" type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit" data-testid="login-button">login</button>
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