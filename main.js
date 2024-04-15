import mysql2 from 'mysql2/promise'

export const connetion = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mini_proyecto',
    port: 3306
})