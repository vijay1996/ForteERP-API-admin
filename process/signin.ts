import bcrypt from 'bcrypt';
import { FIND_ONE } from "../database/processOperation.js";
import { createToken } from '../util/jwt.js';

export default function Signin (req:any, res:any) {
    const payload: any = {
      email: req.body.email
    }
    FIND_ONE('organisation', payload)
      .then(data => {
        if (data.active) {
          bcrypt.compare(req.body.password, data.password)
          .then(correct => {
            if (correct) {
              const token = createToken(data._id);
              res.json({email: req.body.email, token});
            } else {
              res.json("Email / Password incorrect!");
            }
          })
          .catch(error => {
            res.json(`Some error occurred! Please try again later. [${error.name}] = ${error.message}`);
          });
        } else {
          res.json('Please click on the link sent to your mail to verify your account or follow this link to resend verification email - ' + `${process.env.ADMIN_BASE_URL}/resend_verification_email/${payload.email}`);
        }
      })
      .catch(error => {
        console.log(error);
        res.json(`Some error occurred while Signing up. Please try again later![${error.name} - ${error?.message}]`);
      })
  }