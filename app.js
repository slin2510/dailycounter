const express = require('express')
var app = express()
var path = require('path')


app.set('port', (process.env.PORT || 5000)); 
console.log(process.env.PORT);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendfile('./public/index.html');
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));    
})
