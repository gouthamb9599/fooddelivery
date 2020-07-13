const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const FoodController = () => { };

FoodController.viewadmin = (params, res) => {
    client.query(` select * from food`,
        (err, results) => {
            if (err) console.log(err)
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows })
                }
            }
        })
}
FoodController.viewuser = (params, res) => {
    client.query(` select * from food where availablity=$1`, [true],
        (err, results) => {
            if (err) console.log(err)
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows })
                }
            }
        })
}
FoodController.addfood = (params, res) => {
    client.query(`insert into food(type,food,ingredients,availablity) values($1,$2,$3,$4)`, [params.type, params.food, params.ingredients, params.availability.checkedA],
        (err, results) => {
            if (err) console.log(err)
            else {
                if (results.rowCount !== 0) {
                    console.log('item added')
                    res.send({ success: true })
                }
            }
        })
}
FoodController.setchange = (params, res) => {
    console.log(params);
    client.query(`update food set availablity=$1 where id=$2  RETURNING availablity`, [!(params.av), params.user],
        (err, results) => {
            if (err) console.log(err)
            else {
                // console.log(results.rows[0]);
                if (results.rowCount !== 0) {
                    console.log(results.rows[0].availablity);
                    res.send({ success: true, data: results.rows[0].availablity })
                }
            }
        })
}

module.exports = FoodController;