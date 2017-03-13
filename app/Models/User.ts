import {Model} from "../Base/Model";
import {Service, Container} from "typedi";


@Service('model.User')

export class User extends Model {

    public build() {
        let User = this.schema.define('user', {
            active: {type: this.schema.Number},
            name: {type: this.schema.String},
            email: {type: this.schema.String},
            password: {type: this.schema.String},
            created: {type: this.schema.Date}
        }, {});

        // additional methods and validation here

        return User;
    }
}
