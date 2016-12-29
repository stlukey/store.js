const path = require('path');
const express = require('express');

const port = (process.env.PORT || 8080);
const production = process.env.NODE_ENV === 'production';

function App() {
    const app = express();
    const indexPath = path.join(__dirname, '/public/index.html');
    const adminPath = path.join(__dirname, '/public/admin.html');
    const buildPath = express.static(path.join(__dirname, './build'));

    if(production) {
        app.use('/*', function(req, res, next){
            if (req.header('x-forwarded-proto' !== 'https'))
                return res.redirect("https://" + req.header('host') + req.url);
            return next();
        });
    }

    app.use('/build', buildPath);
    app.get('/admin*', function (_, res) { res.sendFile(adminPath) });
    app.get('/*', function (_, res) { res.sendFile(indexPath) });

    return app;
}

const app = App();
app.listen(port);

if(!production)
    console.log(`Listening at http://localhost:${port}`);
