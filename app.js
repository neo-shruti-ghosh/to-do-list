const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-US", options);


    res.render("list", {
        listTitle: day,
        newListItem: items
    });
});



app.post("/", function(req, res) {
    const item = req.body.newItem;

    if (!item) {
        return res.send(`
      <html>
        <head>
          <script>alert('Input field is empty!')</script>
        </head>
        <body>
          <script>
              window.location.href = "/";
          </script>
        </body>
      </html>
    `);
        
      }
      items.push(item);
      res.redirect("/");
    
  });
  

app.post("/work", function (req, res) {
    let item = req.boy.newItem;
    workItems.push(item);
    res.redirect("/");
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItem: workItems });
});


app.listen(3000, function () {
    console.log("Server started on port 3000");
});

