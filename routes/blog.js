const router = require('express').Router();

const sqlite3 = require('sqlite3').verbose();
let blogdb = new sqlite3.Database('./blog.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the blog database");
});

router.get('/list', (req, res) => {
  blogdb.all("SELECT uuid, title, created, updated, short_description, cover FROM post ORDER BY created DESC", [], (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

router.get('/list/:max', (req, res) => {
  rowLimit = req.params.max;
  if(isNaN(rowLimit)){
    res.status(400);
    res.json(null);
    return;
  }
  
  blogdb.all("SELECT uuid, title, created, updated, short_description FROM post ORDER BY created DESC LIMIT ?", [rowLimit], (err, rows) =>{
    if (err) throw err;

    if(rows == null){
      res.status(404);
    }

    res.json(rows);
  })
});

router.get('/:blogid', (req, res) => {
  blogdb.get("SELECT uuid, title, created, updated, short_description, cover, content FROM post WHERE uuid = ?", [req.params.blogid], (err, row) => {
    if(err) throw err;
    if (row == null)
      res.status(404);
    res.json(row);
  });
});



module.exports = router;

