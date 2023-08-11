import nodemailer from 'nodemailer'

export function removeDuplicatesDocuments (array: Array<any>, property: string|null) {
    const uniqueArray:Array<any> = [];
    array.forEach((element: any) => {
        property ? 
        !uniqueArray.some((element1: any) => element._id === element1._id || element[`${property}`] === element1[`${property}`]) && (uniqueArray.push(element)) :
        !uniqueArray.some((element1: any) => element._id === element1._id) && (uniqueArray.push(element));
    })
    return uniqueArray;
}

export async function sendMail (to:string, sub: string, data: string) {
    let transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        auth: {
            user: "vijaybhojraj.cm@gmail.com",
            pass: "IzUbLvrGmVPdNSax"
        }
    })
    let mailOptions = {
        from: 'ForteERP-webmail@forteERP.com',
        to: to,
        subject: sub,
        text: data
      };

    const response = await transporter.sendMail(mailOptions)
}

export function sendVerificationEmail (email:string, BASE_URL:string, objIdHash:string) {
    return sendMail (
      email, 
      'Please confirm your ForteERP account.',
      `Please follow this link to activate your account - ${BASE_URL}/confirm_account/${email}/${objIdHash}`
    )
  }