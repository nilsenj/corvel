import * as path from "path";
export const viewEngineConfig = {
    defaultView: "pug",
    ejs: {
        viewPath: path.join(__dirname+"/../../", 'views/ejs'),
        viewEngine: 'ejs',
        viewResolve: require('ejs').renderFile
    },
    pug: {
        viewPath: path.join(__dirname+"/../../", 'views/pug'),
        viewEngine: 'pug',
        viewResolve: require('pug').__express
    }
};