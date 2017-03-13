import {Service} from "typedi";
@Service('Repository')
export class Repository {

    public model;
    constructor(model) {
        this.model = model;
    }

    public all(opts) {
        let result = this.model.all(opts, function (err, users) {
            if (err) {
                console.log(err);
                return result=err;
            }
            return result=users;
        });
        return result;
    }
    public find() {

    }
    public findById() {

    }
    public destroy() {

    }
}