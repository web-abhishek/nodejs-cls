# Node-js
Installation
    -Express js
    -nodemon
    -cors
    -mysql

// Let express to accepts incoming data
app.use(express.urlencoded({extended: true}));  //for web client
app.use(express.json());                        //for mobile client