const {app, PORT} = require('./app');

app.listen(PORT, () => {console.log(`server listening on port ${PORT}`)})