import {Request, Response} from 'express';

let ValidationService;

export interface IValidationMap {
    [key: string]: any;
}

export function ValidateModel(map: IValidationMap) {

    return function(target, property) {

        let originalFunction = target[property];

        return target[property] = function(...args) {
            let req: Request = args[0];
            let res: Response = args[1];
            let body = req.body;

            if(body) {
                // You implement this part however it makes sense for you
                let valid = ValidationService.validateModel(map, body);

                if(valid) {
                    args.push(body);
                    return originalFunction.apply(target, args)
                }
            }

            res.status(400).send('Bad Request');
        }

    }

}