const config = {}

config.development = {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql",
    "logging": false,
    "timezone": "+07:00",
    "query": {
      "raw": true,
      "logging": false
    }
}

config.production = {}
config.test = {}

module.exports =  config