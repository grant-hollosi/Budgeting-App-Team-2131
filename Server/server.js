var logger = require('morgan'),
cors = require('cors'),
http = require('http'),
express = require('express'),
dotenv = require('dotenv'),
errorhandler = require('errorhandler'),
bodyParser = require('body-parser'),
helmet = require('helmet'),
secrets = require('./secrets'),
awsController = require('./aws-controller');

const {createPool} = require('mysql')
const pool = createPool({
    host: 'current-funds.ceg6zn3wrywt.us-east-2.rds.amazonaws.com',
    database: 'currentFunds',
    user: 'admin',
    password: 'yellowjackets',
    port: '3306'
})

var app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

// Load values from the ./enf file into process.env
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin:true, credentials: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
    app.use(errorhandler())
}

app.get('/aws/sign', awsController.signedRequest);
app.get('/aws/file', awsController.listFiles);
app.get('/aws/file/:fileName', awsController.getFileSignedRequest);
app.delete('/aws/files/:fileName', awsController.deleteFile);

app.get("/", (req, res) => {
    pool.query(`SELECT * FROM dataTable`, (err, result) => {
        if (err) {
            return console.log(err);
        }
        // return console.log(res[0]['FundedProgram']);
        res.json({Result: result});
    });
});

app.get("/AOR/FU", (req, res) => {
    pool.query(`SELECT * FROM dataTable WHERE AOR = 'FU'`, (err, result) => {
        if (err) {
            return console.log(err);
        }
        // return console.log(res[0]['FundedProgram']);
        res.json({Result: result});
    });
});

var port = process.env.PORT || 3233;
var server = http.createServer(app);

server.listen(port, function (err) {
    console.log('Listening in http://localhost:' + port);
});

module.exports = pool;