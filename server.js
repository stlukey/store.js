const path = require('path')
const express = require('express')

const port = (process.env.PORT || 8080)

function App() {
    const app = express()
    const indexPath = path.join(__dirname, '/public/index.html')
    const buildPath = express.static(path.join(__dirname, './build'))

    app.use('/build', buildPath)
    app.get('/*', function (_, res) { res.sendFile(indexPath) })

    return app
}

const app = App();
app.listen(port)
console.log(`Listening at http://localhost:${port}`)
