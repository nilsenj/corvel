import * as path from "path";

export const viewEngineConfig = {
    defaultView: "ejs",
    ejs: {
        viewPath: path.join(__dirname+"/../../", 'views'),
        viewEngine: 'ejs'
    },
};