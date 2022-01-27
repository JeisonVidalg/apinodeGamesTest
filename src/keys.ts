export default{
    //Variable de entorno para usar jwt
    jwtSecret: process.env.JWT_SECRET ||'jeison',
    database:{
        host: 'gamesmysql.mysql.database.azure.com',
        user: 'jeison',
        password :'Apache.1155',
        database: 'ng_Games_db'
    }

    

}