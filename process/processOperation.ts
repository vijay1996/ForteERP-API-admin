import { getReadableError } from "../database/errorCodes.js";
import { DELETE, DYNAMIC_SELECT, FIND_ONE, INSERT, LIST, SEARCH_LIST, UPDATE } from "../database/processOperation.js";
import { removeDuplicatesDocuments } from "../util/commonLogic.js";
import { verifToken } from "../util/jwt.js";

export default function ProcessOperation (req:any, res:any) {
    const screen = req.params.screen;
    const call = req.params.call;
    const search = req.params.search;
    const email = req.headers.useremail;
    FIND_ONE('organisation', {email})
      .then(data => {
        if(!data._id) res.json(getReadableError('signupError'));
        const loginStatus = verifToken(req.headers['authorization']?.split(' ')[1] as string, data._id.toString());
        if (loginStatus.name === 'success') {
          switch (call) {
            case 'add':
              INSERT(screen.toLowerCase(), req.body)
                .then(data => res.json(data))
                .catch(error => {
                  console.log(error);
                  res.json(error)
                });
                break;
            case 'update':
              UPDATE(screen.toLowerCase(), req.body)
                .then(data => res.json(data))
                .catch(error => res.json(error));
                break;
            case 'delete':
              DELETE(screen.toLowerCase(), req.body)
                .then(data => res.json(data))
                .catch(error => res.json(error));
                break;
            case 'list':
              search ? 
                SEARCH_LIST(screen.toLowerCase(), req.body, search as string)
                  .then(data => res.json(removeDuplicatesDocuments(data, null)))
                  .catch(error => res.json(error)) :
                LIST(screen.toLowerCase(), req.body)
                  .then(data => res.json(data))
                  .catch(error => res.json(error));
              break;
            case 'dynamicSelect':
                DYNAMIC_SELECT(screen.toLowerCase(), req.body)
                  .then(data => res.json(removeDuplicatesDocuments(data, Object.keys(req.body)[0])))
                  .catch(error => res.json(error));
          }
        } else {
          res.json(loginStatus);
        }
      })
      .catch(error => res.json(error));
}