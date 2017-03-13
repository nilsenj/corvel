import {Request, Response} from 'express';
import {AuthorizeService} from '../Services/AuthorizeService';

export function Authorize() {

    return function(target, property) {

        let originalFunction = target[property];

        return target[property] = function(...args) {
            let req: Request = args[0];
            let res: Response = args[1];
            let id = AuthorizeService.getRequestUser(req);

            if(id) {
                args.push(id);
                originalFunction.apply(target, args)
            } else {
                res.status(401).send('Unauthorized');
            }
        }

    }

}