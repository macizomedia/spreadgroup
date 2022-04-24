
var enviroment: any = process.env.NODE_ENV || 'development';

enviroment.production = {
    port: process.env.PORT || 3000,
    hashingSecret: 'thisIsASecret',
}