const mongoose = require('mongoose');

//database connection
mongoose.connect("mongodb://localhost:27017/rest_medical", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection Sucessfully");
}).catch(() => {
    console.log("Connection Failed");
})