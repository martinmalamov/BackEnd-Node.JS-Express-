const env = process.env.NODE_ENV || 'development'

const config = {
    development : {
        port : process.env.PORT || 9999,
        dbUrl : 'mongodb+srv://user:softuni-password@cluster0.t7dpb.mongodb.net/Tripps_ExamPrep1?retryWrites=true&w=majority',
        cookie : 'x-auth-token',
        secret : 'shhhhaNO'
    },
    production : {}
}

module.exports = config[env]