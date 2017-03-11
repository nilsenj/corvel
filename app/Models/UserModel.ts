import {Model} from "../Base/Model";

export class UserModel extends Model {
    model() {
        let UserModel = this.schema.define('user', {
            active : { type : this.schema.Number },
            name : { type : this.schema.String },
            email : { type : this.schema.String },
            password : { type : this.schema.String },
            note : { type : this.schema.Text },
            created : { type : this.schema.Date }
        },{

        });

        // additional methods and validation here

        return UserModel;
    }

    // additional methods and validation here
}