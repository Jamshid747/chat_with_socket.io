import fileUpload from "express-fileupload"
import express from "express"
import path from "path"
import ejs from "ejs"
import "./config/index.js"

import database from "./config/database.js"
import routers from "./modules/index.js"
import mockdata from "./mock.js"

// Middlewares
import databaseMiddleware from "./middlewares/database.js"
import errorHandlerMiddleware from "./middlewares/errorHandler.js"
import loggerMiddleware from "./middlewares/logger.js"

!async function () {
    const app = express()

    // database connection
    const db = await database()

    // mock data
    await mockdata({ sequelize: db })

    app.engine('html', ejs.renderFile)
    app.set('view engine', 'html')
    app.set('views', path.join(process.cwd(), 'src', 'views'))

    // middlewares
    app.use(express.static(path.join(process.cwd(), 'src', 'public')))
    app.use(databaseMiddleware({ sequelize: db }))
    app.use(express.json())
    app.use(fileUpload())

    app.use(routers)

    // error handling and logging
    app.use(errorHandlerMiddleware)
    app.use(loggerMiddleware)

    app.listen(
        process.env.PORT, 
        () => console.log("Server ready at http//localhost:" + process.env.PORT)
    )
}()