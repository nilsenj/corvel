import {Model} from "../Base/Model";
import helpers from "../helpers/index";
import {Service, Container} from "typedi";

@Service('model.User')
export class User extends Model {

    public setUp() {
        let User = this.schema.define('user', {
            active : { type : this.schema.Number },
            name : { type : this.schema.String },
            email : { type : this.schema.String },
            password : { type : this.schema.String },
            note : { type : this.schema.Text },
            created : { type : this.schema.Date }
        },{

        });

        // additional methods and validation here

        return User;
    }

    // additional methods and validation here
}
