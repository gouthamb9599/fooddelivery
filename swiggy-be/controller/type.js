const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const TypeController = () => { };

TypeController.newtype = (params, res) => {
    client.query(`insert into food_type(type) values($1) `, [params.category],
        (err, results) => {
            if (err) console.log(err)
            else {
                if (results.rowCount !== 0) {
                    console.log('food category added');
                    res.send({ success: true })
                }
            }
        })
}
TypeController.viewtype = (params, res) => {
    client.query(` select * from food_type`,
        (err, results) => {
            if (err) console.log(err)
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows })
                }
            }
        })
}
module.exports = TypeController;