import { FIND_ONE, UPDATE } from "../database/processOperation.js";

const BASE_URL = process.env.ADMIN_BASE_URL;

export default function ConfirmAccount (req:any, res:any) {
    const collection = 'organisation'
    const email = req.params.email;
    const orgId = req.params.orgId;
    const payload: any = {
      email: email
    }
    FIND_ONE(collection, payload)
      .then ((data: any) => {
        if (data._id.toString() === orgId) {
          payload.active = true;
            payload._id = data._id;
            UPDATE(collection, payload)
              .then(data => {
                res.json('Account verified successfully! Please proceed to login here - ' + process.env.ADMIN_UI_URL);
              })
              .catch(error => {
                res.json('Account verified failed! Please follow this link to resend verification email - ' + `${BASE_URL}/resend_verification_email/${payload.email}`);
              });
        } else {
          res.json('Account verified failed! Please follow this link to resend verification email - ' + `${BASE_URL}/resend_verification_email/${payload.email}`);
      }})
      .catch(err => {
        res.json('Looks like an error occurred. Please try again later or proceed here to resend verification email - ' + `${BASE_URL}/resend_verification_email/${payload.email}` + ` [${err.name} - ${err.message}`); 
      })
  }