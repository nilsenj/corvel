/**
 *  models relations loader
 *
 *  Created by create caminte-cli script
 *  App based on CaminteJS
 *  CaminteJS homepage http://www.camintejs.com
 **/
export default class Relations {
    private _relations;

    get relations(): any {
        return this._relations;
    }

    set relations(value: any) {
        this._relations = value;
    }
    getRelations() {
        return this._relations;
    }
    setRelations(value: any) {
        this._relations = value;
    }
    load(models) {
        this.setRelations(models)
    };
}
