const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const AccountController = () => { };

AccountController.signup = (params, res) => {
    client.query(`insert into account(name,email,providername,password) values($1,$2,$3,$4) RETURNING *`,
        [params.name, params.email, params.ProviderId, params.password], (err, results) => {
            if (err) console.log(err);
            else {
                console.log("user data entered successfully");
                res.send({ success: true })
            }
        })

}
AccountController.login = (params, res) => {
    client.query(`select * from account where email=$1 and password=$2`, [params.email, params.password],
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
}
AccountController.googlelogin = (params, res) => {
    const password = "";
    client.query('select * from account where email=$1 and token=$2', [params.email, params.token],
        (err, results) => {
            if (err) console.log(err);
            else {
                // console.log(results);
                if (results.rowCount === 1) {
                    let token = jwt.sign({ data: params, exp: Math.floor(Date.now() / 100) + 600 * 600 },
                        "secret"
                    );
                    // console.log(token)
                    res.send({ success: true, token, Name: params.Name, id: results.rows[0].id, data: results.rows[0] });
                }
                else {
                    client.query(`insert into account(name,email,providername,image,token,password) values($1,$2,$3,$4,$5,$6) RETURNING id`,
                        [params.Name, params.email, params.ProviderId, params.Image, params.token, password],
                        (err, results) => {
                            if (err) console.log(err);
                            else {
                                console.log("user data entered successfully through google ID");
                                // console.log(results)
                                let token = jwt.sign({ data: params, exp: Math.floor(Date.now() / 100) + 600 * 600 },
                                    "secret"
                                );
                                console.log(params.Name, results.rows[0].id)
                                res.send({ success: true, token, Name: params.Name, id: results.rows[0].id, data: results.rows[0] });
                            }

                        });
                }
            }
        })
}
AccountController.admin = (params, res) => {
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
}
module.exports = AccountController;