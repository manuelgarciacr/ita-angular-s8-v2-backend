const mongoose = require('mongoose');
const config = require("../src/config");

//mongoose.set('useFindAndModify', false);
//mongoose.set('useCreateIndex', true);
//mongoose.set('useNewUrlParser', true);

const connect = mongoose.connect(config.MONGO_URL); // Another way to configure options 
 
connect.then(db => 
    // To kill: $ npx kill-port 3000 ??????
    console.log("Connected correctly to mongo server on %s and port %s.",  db.connection.host, db.connection.port)
)
.catch(err => console.error("ERR", err));
