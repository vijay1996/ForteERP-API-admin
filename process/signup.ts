import bcrypt from 'bcrypt';
import { INSERT } from '../database/processOperation.js';
import { sendVerificationEmail } from '../util/commonLogic.js';

export default function Signup (req:any, res:any) {
    const payload = JSON.parse(JSON.stringify(req.body));
    payload.active = false;
    bcrypt.hash(payload.password, 10, (err1, passwordHash) => {
      if (err1?.name) res.json(`Some error occurred while Signing up. Please try again later![${err1.name} - ${err1?.message}]`);
      payload.password = passwordHash;
      INSERT('organisation', payload)
      .then((data: any) => {
        sendVerificationEmail(req.body.email, process.env.ADMIN_BASE_URL as string, data[0]._id.toString())
            .then(response => res.json('An email has been sent to your account. Please follow the steps mentioned in the email to complete sign up. Thanks!'))
            .catch(error => res.json(`Some error occurred while Signing up. Please try again later![${error.name} - ${error?.message}]`));
      })
      .catch(error => {
        console.log(error);
        res.json(`Some error occurred while Signing up. Please try again later![${error.name} - ${error?.message}]`);
      })
    })
  }