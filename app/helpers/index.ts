import { Request, Response } from 'express';

export default class helpers {

    /**
        * Render a page.
        *
        * @class BaseController
        * @method render
        * @param req {Request} The request object.
        * @param res {Response} The response object.
        * @param view {String} The view to render.
        * @param options {Object} Additional options to append to the view's local scope.
        * @return void
        */
    public static render(res: Response, view: string, options?: Object) {
        //add constants
        res.locals.BASE_URL = "/";

        //render view
        res.render(view, options);
    }

    public static unique(arr) {
        let a = [];
        for (let i=0, l=arr.length; i<l; i++)
            if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
                a.push(arr[i]);
        return a;
    }

}
