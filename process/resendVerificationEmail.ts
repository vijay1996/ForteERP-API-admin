import bcrypt from 'bcrypt';
import { FIND_ONE } from "../database/processOperation.js";
import { sendVerificationEmail } from '../util/commonLogic.js';

export default function ResendVerificationEmail (req: any, res: any) {
    const email = req.params.email
    const payload: any = {
        email: email
    }
    FIND_ONE('maintenance_organisation', payload)
        .then(data => {
            bcrypt.hash(data._id.toString(), 10, (err, objIdHash) => {
                if (err) res.json(`Some error occurred while Signing up. Please try again later![${err.name} - ${err?.message}]`);
                sendVerificationEmail(email, process.env.BASE_URL as string, objIdHash)
                .then(response => res.json('An email has been sent to your account. Please follow the steps mentioned in the email to complete sign up. Thanks!'))
                .catch(error => res.json(`Some error occurred while Signing up. Please try again later![${error.name} - ${error?.message}]`));
            })
        })
        .catch(error => {
            console.log(error);
            res.json(`Some error occurred while Signing up. Please try again later![${error.name} - ${error?.message}]`);
        })
}