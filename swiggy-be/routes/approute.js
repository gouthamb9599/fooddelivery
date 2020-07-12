const client = require('../config/database')
const jwt = require('jsonwebtoken')
const route = app => {
    app.post("/logingoogle", (req, res) => {
        console.log(req.body)
        const google = req.body;
        const password = "";
        client.query('select * from account where email=$1 and token=$2', [google.email, google.token],
            (err, results) => {
                if (err) console.log(err);
                else {
                    // console.log(results);
                    if (results.rowCount === 1) {
                        let token = jwt.sign({ data: google, exp: Math.floor(Date.now() / 100) + 600 * 600 },
                            "secret"
                        );
                        // console.log(token)
                        res.send({ success: true, token, Name: google.Name, id: results.rows[0].id, data: results.rows[0] });
                    }
                    else {
                        client.query(`insert into account(name,email,providername,image,token,password) values($1,$2,$3,$4,$5,$6) RETURNING id`,
                            [google.Name, google.email, google.ProviderId, google.Image, google.token, password],
                            (err, results) => {
                                if (err) console.log(err);
                                else {
                                    console.log("user data entered successfully through google ID");
                                    // console.log(results)
                                    let token = jwt.sign({ data: google, exp: Math.floor(Date.now() / 100) + 600 * 600 },
                                        "secret"
                                    );
                                    // console.log(token)
                                    res.send({ success: true, token, Name: google.Name, id: results.rows[0].id, data: results.rows[0] });
                                }

                            });
                    }
                }
            })
    })
    app.post('/login', (req, res) => {
        console.log(req.body);
        const data = req.body;
        client.query(`select * from account where email=$1 and password=$2`, [data.email, data.password],
            (err, results) => {
                if (err) console.log(err);
                else {
                    console.log('access successful')
                    // console.log(results.rows[0])
                    let token = jwt.sign({ data: results.rows[0], exp: Math.floor(Date.now() / 100) + 600 * 600 },
                        "secret")
                    // console.log(token);
                    res.send({ success: true, token, data: results.rows[0], Name: results.rows[0].name })
                }

            })
    })
    app.post("/signup", (req, res) => {
        const data = req.body;
        client.query(`insert into account(name,email,providername,password) values($1,$2,$3,$4) RETURNING *`,
            [data.name, data.email, data.ProviderId, data.password], (err, results) => {
                if (err) console.log(err);
                else {
                    console.log("user data entered successfully");
                    res.send({ success: true })
                }
            })

    })
    //admin creation script
    app.get('/', (req, res) => {
        client.query(`insert into account(name,email,providername,password,isadmin) values($1,$2,$3,$4,$5) RETURNING *`,
            ['admin', 'admin@gmail.com', 'admin', 'admin', true], (err, results) => {
                if (err) console.log(err);
                else {
                    if (results.rowCount !== 0) {
                        console.log('admin account created')
                        res.send({ success: true })
                    }
                }
            })
    });
    app.post('/addcategory', (req, res) => {
        client.query(`insert into food_type(type) values($1) `, [req.body.category],
            (err, results) => {
                if (err) console.log(err)
                else {
                    if (results.rowCount !== 0) {
                        console.log('food category added');
                        res.send({ success: true })
                    }
                }
            })
    })
    app.get('/viewcategory', (req, res) => {
        client.query(` select * from food_type`,
            (err, results) => {
                if (err) console.log(err)
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true, data: results.rows })
                    }
                }
            })
    })
    app.get('/viewfoodadmin', (req, res) => {
        client.query(` select * from food`,
            (err, results) => {
                if (err) console.log(err)
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true, data: results.rows })
                    }
                }
            })
    })
    app.get('/viewfooduser', (req, res) => {
        client.query(` select * from food where availablity=$1`, [true],
            (err, results) => {
                if (err) console.log(err)
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true, data: results.rows })
                    }
                }
            })
    })
    app.post('/addfood', (req, res) => {
        const data = req.body;
        client.query(`insert into food(type,food,ingredients,availablity) values($1,$2,$3,$4)`, [data.type, data.food, data.ingredients, data.availability.checkedA],
            (err, results) => {
                if (err) console.log(err)
                else {
                    if (results.rowCount !== 0) {
                        console.log('item added')
                        res.send({ success: true })
                    }
                }
            })
    })
    app.post('/changeav', (req, res) => {
        const data = req.body;
        client.query(`update food set availablity=$1 where id=$2  RETURNING availablity`, [!(data.av), data.user],
            (err, results) => {
                if (err) console.log(err)
                else {
                    console.log(results);
                    if (results.rowCount !== 0) {
                        console.log(results.rows[0].availability);
                        res.send({ success: true, data: results.rows[0].availability })
                    }
                }
            })
    })
    app.post('/addorder', (req, res) => {
        client.query(`insert into orders(food_id,user_id) values($1,$2) RETURNING id`, [req.body.food, req.body.user],
            (err, results) => {
                if (err) console.log('12', err)
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true, data: results.rows[0].id })
                    }
                }
            })
    })
    app.get('/getorders', (req, res) => {
        client.query(`select * from orders`,
            (err, results) => {
                if (err) console.log(err)
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true, data: results.rows })
                    }
                }
            })
    })
    app.get('/getstatus', (req, res) => {
        client.query(`select * from delivery`,
            (err, results) => {
                if (err) console.log(err)
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true, data: results.rows })
                    }
                }
            })
    })
    app.post(`/setstatus`, (req, res) => {
        client.query(`update orders set status=$1 where id=$2`, [req.body.status, req.body.order],
            (err, results) => {
                if (err) console.log(err)
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true })
                    }
                }
            })
    })
}
module.exports = route;