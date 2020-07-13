const client = require('../config/database')
const jwt = require('jsonwebtoken')
const route = app => {
    app.post("/logingoogle", (req, res) => {
        console.log(req.body)
        const params = req.body;
        console.log(params);
        let controller = require('../controller/account.js');
        controller.googlelogin(params, res);

    })
    app.post('/login', (req, res) => {
        console.log(req.body);
        // const data = req.body;
        let params = req.body;
        console.log(params);
        let controller = require('../controller/account.js');
        controller.login(params, res);
    })
    app.post("/signup", (req, res) => {
        // const data = req.body;
        let params = req.body;
        console.log(params);
        let controller = require('../controller/account.js');
        controller.signup(params, res);

    })
    //admin creation script
    app.get('/', (req, res) => {
        let controller = require('../controller/account.js');
        controller.admin(params, res);

    });
    app.post('/addcategory', (req, res) => {
        let params = req.body;
        console.log(params);
        let controller = require('../controller/type.js')
        controller.newtype(params, res);

    })
    app.get('/viewcategory', (req, res) => {
        let controller = require('../controller/type.js')
        controller.viewtype(params, res);
    })
    app.get('/viewfoodadmin', (req, res) => {
        let controller = require('../controller/food.js')
        controller.viewadmin(params, res);

    })
    app.get('/viewfooduser', (req, res) => {
        let controller = require('../controller/food.js')
        controller.viewuser(params, res);

    })
    app.post('/addfood', (req, res) => {
        const params = req.body;
        let controller = require('../controller/food.js')
        controller.addfood(params, res);
    })
    app.post('/changeav', (req, res) => {
        const params = req.body;
        let controller = require('../controller/food.js')
        controller.setchange(params, res);

    })
    app.post('/addorder', (req, res) => {
        const params = req.body;
        let controller = require('../controller/orders.js')
        controller.neworder(params, res);
    })
    app.get('/getorders', (req, res) => {
        let controller = require('../controller/orders.js')
        controller.getorder(res);
    })
    app.get('/getordersuser', (req, res) => {

        const params = req.query.id
        console.log(params);
        let controller = require('../controller/orders.js')
        controller.getorderuser(params, res)
    })
    app.get('/getstatus', (req, res) => {
        let controller = require('../controller/orders.js')
        controller.getstatus(res);

    })
    app.post(`/setstatus`, (req, res) => {
        const params = req.body
        let controller = require('../controller/orders.js')
        controller.setstatus(params, res)
    })
}
module.exports = route;