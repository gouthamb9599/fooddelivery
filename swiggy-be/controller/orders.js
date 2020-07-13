const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const OrdersController = () => { };
OrdersController.neworder = (params, res) => {
    client.query(`insert into orders(food_id,user_id) values($1,$2) RETURNING id`, [params.food, params.user],
        (err, results) => {
            if (err) console.log('12', err)
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows[0].id })
                }
            }
        })
}
OrdersController.getorder = (res) => {
    client.query(`select * from orders`,
        (err, results) => {
            if (err) console.log(err)
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows })
                }
            }
        })
}
OrdersController.getorderuser = (params, res) => {
    client.query(`select * from orders where user_id=$1`, [params],
        (err, results) => {
            if (err) console.log(err)
            else {
                console.log(results)
                if (results.rowCount !== 0) {
                    console.log('dataobtained')
                    res.send({ success: true, data: results.rows })
                }
            }
        })
}
OrdersController.setstatus = (params, res) => {
    client.query(`update orders set status=$1 where id=$2`, [params.status, params.order],
        (err, results) => {
            if (err) console.log(err)
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true })
                }
            }
        })
}
OrdersController.getstatus = (res) => {
    client.query(`select * from delivery`,
        (err, results) => {
            if (err) console.log(err)
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows })
                }
            }
        })
}
module.exports = OrdersController;