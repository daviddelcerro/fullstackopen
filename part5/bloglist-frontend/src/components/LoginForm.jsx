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

export default LoginForm