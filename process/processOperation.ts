import { getReadableError } from "../database/errorCodes.js";
import { DELETE, DYNAMIC_SELECT, FIND_ONE, INSERT, LIST, SEARCH_LIST, UPDATE } from "../database/processOperation.js";
import { removeDuplicatesDocuments } from "../util/commonLogic.js";
import { verifToken } from "../util/jwt.js";

export default function ProcessOperation (req:any, res:any) {
    console.log(`----------------- ADMIN MICROSERVICE HIT -----------------\n`);
    const screen = req.params.screen;
    const call = req.params.call;
    const search = req.params.search;
    const email = req.headers.useremail;
    let payload = req.body;
    FIND_ONE('organisation', {email})
      .then(response => {
        if(!response._id) res.json(getReadableError('signupError'));
        const loginStatus = verifToken(req.headers['authorization']?.split(' ')[1] as string, response._id.toString());
        if (loginStatus.name === 'success') {
          switch (call) {
            case 'add':
              payload = screen === 'organisation' ? payload : {...payload, uniqueOrgId: response._id.toString()};
              console.log(payload);
              INSERT(screen.toLowerCase(), payload)
                .then(data => res.json(data))
                .catch(error => {
                  console.log(error);
                  res.json(error)
                });
                break;
            case 'update':
              payload = screen === 'organisation' ? payload : {...payload, uniqueOrgId: response._id.toString()};
              UPDATE(screen.toLowerCase(), payload)
                .then(data => res.json(data))
                .catch(error => res.json(error));
                break;
            case 'delete':
              DELETE(screen.toLowerCase(), payload)
                .then(data => res.json(data))
                .catch(error => res.json(error));
                break;
            case 'list':
              payload = screen === 'organisation' ? payload : {...payload, uniqueOrgId: response._id.toString()};
              search ? 
                SEARCH_LIST(screen.toLowerCase(), payload, search as string)
                  .then(data => res.json(removeDuplicatesDocuments(data, null)))
                  .catch(error => res.json(error)) :
                LIST(screen.toLowerCase(), payload)
                  .then(data => res.json(data))
                  .catch(error => res.json(error));
              break;
            case 'dynamicSelect':
                payload = screen === 'organisation' ? payload : {...payload, uniqueOrgId: response._id.toString()};
                DYNAMIC_SELECT(screen.toLowerCase(), payload)
                  .then(data => res.json(removeDuplicatesDocuments(data, Object.keys(payload)[0])))
                  .catch(error => res.json(error));
          }
        } else {
          res.json(loginStatus);
        }
      })
      .catch(error => res.json(error));
}