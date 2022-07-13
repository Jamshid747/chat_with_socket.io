import express from "express"
import path from "path"
import ejs from "ejs"
import "./config/index.js"
import routers from "./modules/index.js"

!async function () {
    const app = express()

    app.engine('html', ejs.renderFile)
    app.set('view engine', 'html')
    app.set('views', path.join(process.cwd(), 'src', 'views'))

    app.use(express.static(path.join(process.cwd(), 'src', 'public')))

    app.use(routers)

    app.listen(
        process.env.PORT, 
        () => console.log("Server ready at http//localhost:" + process.env.PORT)
    )
}()