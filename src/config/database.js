import { Sequelize } from "sequelize"

const sequelize = new Sequelize({
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB,
    dialect: 'postgres',
    logging: false
})

export default async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connected')    
    } catch (error) {
        console.log('Database error', + error.message)
    }
}

