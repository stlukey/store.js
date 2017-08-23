const path = require('path');
const express = require('express');

const port = (process.env.PORT || 8080);
const production = process.env.NODE_ENV === 'production';

function App() {
    const app = express();
    const indexPath = path.join(__dirname, '/public/index.html');
    const comingSoonPath = path.join(__dirname, '/public/cs.html');
    const adminPath = path.join(__dirname, '/public/admin.html');
    const buildPath = express.static(path.join(__dirname, './build'));

    if(production) {
        app.get('*',function(req,res,next){
          if(req.headers['x-forwarded-proto'] != 'https')
            res.redirect('https://'+ req.headers.host + req.url);
          else
            next();
        });
    }

    app.use('/build', buildPath);
    app.get('/admin*', function (_, res) { res.sendFile(adminPath) });
    app.get('/demo*', function (_, res) { res.sendFile(indexPath) });
    app.get('/*', function (_, res) { res.sendFile(comingSoonPath) });

    return app;
}

const app = App();
app.listen(port);

if(!production)
    console.log(`Listening at http://localhost:${port}`);
