// module.exports = {
//     development: {
//         port: process.env.PORT || 3000,
//         privateKey: 'CUBE-WORKSHOP',
//         databaseUrl: `mongodb+srv://user:${process.env.DB_PASSWORD}@cluster0.t7dpb.mongodb.net/cubicle?retryWrites=true&w=majority`
//     },
//     production: {}
// };

module.exports = {
    development: {
        port: process.env.PORT,
        privateKey: process.env.PRIVATE_KEY,
        databaseUrl: process.env.DATABASE_URL
    },
    production: {}
};