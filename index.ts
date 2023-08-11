import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import Signup from './process/signup.js';
import Signin from './process/signin.js';
import ResendVerificationEmail from './process/resendVerificationEmail.js';
import ConfirmAccount from './process/confirmAccount.js';
import ProcessOperation from './process/processOperation.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

process.once('SIGUSR2', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
  
  process.on('SIGINT', function () {
    // this is only called on ctrl+c, not restart
    process.kill(process.pid, 'SIGINT');
  });

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

//signup
app.post('/forte/953b49e0-3c1f-4acd-a6bb-5ec932e87ccf', (req, res) => Signup(req, res));

//signin
app.post('/forte/b651117c-ee87-4ba0-9d3d-12755ee84db3', (req, res) => Signin(req, res));

//resendVerificationEmail
app.get('/forte/resend_verification_email/:email', (req, res) => ResendVerificationEmail(req, res));

//confirmAccount
app.get('/forte/confirm_account/:email/:orgId', (req, res) => ConfirmAccount(req, res));

//processOperation
app.post('/forte/:screen/:call/:search?', (req, res) => ProcessOperation(req, res));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});