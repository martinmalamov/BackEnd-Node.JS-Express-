module.exports = {
    development: {
        port: process.env.PORT || 3000,
        privateKey: 'CUBE-WORKSHOP',
        databaseUrl: `mongodb+srv://user:${process.env.DB_PASSWORD}@cluster0.t7dpb.mongodb.net/cubicle?retryWrites=true&w=majority`
    },
    production: {}
};