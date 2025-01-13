const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000);

app.post('/submit', (req, res) => {
    // walidacja po stronie serwera
    const errors = {};
    const fname = req.body.fname;
    const lname = req.body.lname;
    const color = req.body.color;
    const agree = req.body.agree;

    if (!fname) {
        errors.fname = "First name is required";
    } else {
        if (fname < 5) {
            errors.fname = "Firstname cannot be shorter than 5 characters.";
        }
    }

    if (!lname) {
        errors.lname = "Lastname is required.";
    } else {
        if (lname < 5) {
            errors.lname = "Last name cannot be shorter than 5 characters.";
        }
    }

    if (color === "#000000") {
        errors.color = "Color cannot be black.";
    }

    if (!agree) {
        errors.agree = "Terms should be accepted.";
    }

    if (Object.keys(errors).length > 0) {
        // By³y jakieœ b³êdy
        return res.status(400).json(errors)
    }

    let _fname = toTitleCase(fname);
    let _lname = lname.toUpperCase();

    res.fname = _fname;
    res.lname = _lname;

    return res.status(200).send();
});

app.get('/form', (req, res) => {
    res.render("index.html");
})

module.exports = app;

function toTitleCase(str) {
    let string = str;
    return string.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}