const info = (...params) => {
    if (process.env.NODE_ENV !== 'tes') {
        console.info(...params)
    }
}

const error = (...params) => {
    if (process.env.NODE_ENV !== 'tes') {
        console.error(...params)
    }
}

module.exports = {
    info, error
}