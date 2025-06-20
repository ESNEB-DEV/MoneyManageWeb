const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bangkok',
    database: 'accountingsystem',
});

// บันทึกการใช้บัตรเครดิต
app.get('/bg_credit', (req, res) => {
    db.query('SELECT * FROM bg_credit ORDER BY bg_credit_id DESC', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

app.post('/bg_credit_create', (req, res) => {
    const { c_name, f_amount, d_doc_date } = req.body;
    db.query('INSERT INTO bg_credit (c_name, f_amount, d_doc_date) VALUES (?, ?, ?)',
        [c_name, f_amount, d_doc_date], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                // ส่งกลับ ID ที่ gen โดย MySQL
                res.json({ bg_credit_id: results.insertId });
            }
        });
});

app.put('/bg_credit_update/:bg_credit_id', (req, res) => {
    const bg_credit_id = req.params.bg_credit_id;
    const { c_name, f_amount, d_doc_date } = req.body;
    db.query('UPDATE bg_credit SET c_name = ?, f_amount = ?, d_doc_date = ? WHERE bg_credit_id = ?',
        [c_name, f_amount, d_doc_date, bg_credit_id], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
            }
        });
});

app.delete('/bg_credit_delete/:bg_credit_id', (req, res) => {
    const bg_credit_id = req.params.bg_credit_id;
    db.query('DELETE FROM bg_credit WHERE bg_credit_id = ?', bg_credit_id, (err, results) => {
        if (err) {
            console.log(bg_credit_id);
        } else {
            res.send(results);
        }
    });
});
// End บันทึกการใช้บัตรเครดิต

// บันทึกรายการรับ-จ่ายเงิน
app.get('/bg_daily', (req, res) => {
    db.query('SELECT * FROM bg_daily ORDER BY bg_daily_id DESC', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

app.post('/bg_daily_create', (req, res) => {
    const { c_name, f_amount, c_type } = req.body;
    db.query('INSERT INTO bg_daily (c_name, f_amount, c_type) VALUES (?, ?, ?)',
        [c_name, f_amount, c_type], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ bg_daily_id: results.insertId });
            }
        });
});

app.get('/bg_daily_recieve', (req, res) => {
    db.query('SELECT bg_daily_id ,f_amount FROM bg_daily WHERE c_type = 1', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/bg_daily_pay', (req, res) => {
    db.query('SELECT bg_daily_id ,f_amount FROM bg_daily WHERE c_type = 0', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/bg_daily_sum_recieve', (req, res) => {
    db.query('SELECT sum(f_amount) as SumRecieve FROM bg_daily WHERE c_type = 1', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/bg_daily_sum_pay', (req, res) => {
    db.query('SELECT sum(f_amount) as SumPay FROM bg_daily WHERE c_type = 0', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/bg_daily_sum_today', (req, res) => {
    db.query('SELECT SUM(f_amount) AS SumToday FROM bg_daily WHERE c_type = 0 AND DATE(t_create_dt) = CURDATE();', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});


app.delete('/bg_daily_delete/:bg_daily_id', (req, res) => {
    const bg_daily_id = req.params.bg_daily_id;
    db.query('DELETE FROM bg_daily WHERE bg_daily_id = ?', bg_daily_id, (err, results) => {
        if (err) {
            console.log(bg_daily_id);
        } else {
            res.send(results);
        }
    });
});


//บันทึกรายการผ่อนชำระบัตรเคดิต
app.get('/bg_installment', (req, res) => {
    db.query('SELECT * FROM bg_installment ORDER BY bg_installment_id DESC', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

app.post('/bg_installment_create', (req, res) => {
    const { c_name, f_amount, c_preriod, d_doc_date, active } = req.body;
    db.query('INSERT INTO bg_installment (c_name, f_amount, c_preriod , d_doc_date , active) VALUES (?, ?, ?, ? ,?)',
        [c_name, f_amount, c_preriod, d_doc_date, active], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ bg_installment_id: results.insertId });
            }
        });
});

app.delete('/bg_installment_delete/:bg_installment_id', (req, res) => {
    const bg_installment_id = req.params.bg_installment_id;
    db.query('DELETE FROM bg_installment WHERE bg_installment_id = ?', bg_installment_id, (err, results) => {
        if (err) {
            console.log(bg_installment_id);
        } else {
            res.send(results);
        }
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
}); 