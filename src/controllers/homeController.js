const pool = require("../config/database");
const { use } = require("../routes/web");

const getHomePage = async (req, res) => {
  // let users = [];

  // pool.query(
  //     'SELECT * FROM User',
  //     function(err, results, fields) {
  //         if (err) {
  //             console.error('Query error: ', err);
  //             return;
  //         }
  //         users = results;
  //     //JSON.stringify(results, null, 2): Chuyển đổi
  //     // kết quả results từ đối tượng JavaScript thành chuỗi JSON
  //         console.log("results: "+ JSON.stringify(results));

  //         res.send(JSON.stringify(results));
  //     }
  // );
  try {
    const sql = 'SELECT * FROM `User`';
    //users chứa data all user
    const [users] = await pool.query(sql);

    res.render('home', {User: users});// truyền User in view để use
    console.log(users);
    
  } catch (err) {
    console.log(err);
    res.status(500).send("error loading user");
  }
};

const getCart = (req, res) => {
  res.send("Cart");
};

const getUser = async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const city = req.body.city;
    try {
      const sql = `Insert into User (email, name, city) values (?, ?, ?)`;
      const [results] = await pool.query(
        sql,
        [email, name, city],
      );
          console.log(results);
          res.send('ok');
    
    } catch (error) {
      res.status(500).send('error');
    }

//     const sql =
//   'INSERT INTO `User`(`email`,`name`, `city`) VALUES (`${email}`, 19)';

//     pool.query(sql, (err, result, fields) => {
//     if (err instanceof Error) {
//         console.log(err);
//         return;
//     }

//     });

//     res.send('success');
 };

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const email = req.body.email;
  const name = req.body.name;
  const city = req.body.city;

  try {
    const sql = `UPDATE User
    SET email = ?, name = ?, city = ?
    WHERE ID = ?`;
    // const [result] = 
    await pool.query(sql, 
      [email, name,city, userId]);
    // res.send(result);  
    res.redirect('/');
  } catch (error) {
      res.status(404).send('error');
  }
};

const deleteUser = async function(req, res) {
  const userId = req.params.id;
  //LIMIT 1: delete user first list users has id you want to delete
  //also in list has many id trùng
  const sql = `DELETE FROM User where id = ? LIMIT 1`;
  try {
    await pool.query(sql, [userId]);
    res.redirect('/');
  } catch (error) {
    res.status(404).send('error');
  }
};

const getEditUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const sql = `SELECT * FROM User WHERE id = ?`;
    const [users] = await pool.query(sql, [userId]);
    if(users.length === 0) {
      res.status(404).send('User not found');
    }
    res.render('updateUser.ejs', { User: users[0] });
  } catch (error) {
    res.status(404).send('error');
  }
  
};

const createViewUser = (req, res) => {
  res.render('createUser.ejs');
};

module.exports = {
  getHomePage,
  getCart,
  getUser,
  deleteUser,
  createViewUser,
  getEditUser,
  updateUser
};

