export const dbConfig = {

    /**
     * following adapters available
     * mysql, sqlite3, riak, postgres, couchdb, mongodb, redis, neo4j, firebird, rethinkdb, tingodb
     */
    /**
     *  Default database configuration file
     *
     *  Created by create caminte-cli script
     *  App based on CaminteJS
     *  CaminteJS homepage http://www.camintejs.com
     *
     *  docs: https://github.com/biggora/caminte/wiki/Connecting-to-DB#connecting
     **/

    /**
     * following adapters available
     * mysql, sqlite3, riak, postgres, couchdb, mongodb, redis, neo4j, firebird, rethinkdb, tingodb
     */
    defaultDriver: "mongodb",

    mysql: {
        production: {
            driver: 'mysql',
            host: 'localhost',
            port: '3306',
            username: 'root',
            password: '',
            database: 'corvel',
            autoReconnect: true
        },
        development: {
            driver: 'mysql',
            host: 'localhost',
            port: '3306',
            username: 'root',
            password: '',
            database: 'corvel',
            autoReconnect: true
        },
        test: {
            driver: 'mysql',
            host: 'localhost',
            port: '3306',
            username: 'root',
            password: '',
            database: 'corvel',
            autoReconnect: true
        },
        dev: this.development
    },
    mongodb: {
        production: {
            driver: 'mongodb',
            host: 'localhost',
            port: '27017',
            username: '',
            password: '',
            database: 'corvel',
            autoReconnect: true,
            pool       : true
        },
        development: {
            driver: 'mongodb',
            host: 'localhost',
            port: '27017',
            username: '',
            password: '',
            database: 'corvel',
            autoReconnect: true,
            pool       : true
        },
        test: {
            driver: 'mongodb',
            host: 'localhost',
            port: '27017',
            username: '',
            password: '',
            database: 'corvel',
            autoReconnect: true,
            pool       : true
        },
        dev: this.development
    }
};