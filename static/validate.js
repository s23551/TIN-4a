    async function validateForm() {
        const fname = document.getElementById("fname");
        const fnameError = document.getElementById("err_fname");
        const lname = document.getElementById("lname");
        const lnameError = document.getElementById("err_lname");
        const color = document.getElementById("color");
        const colorError = document.getElementById("err_color");
        const agree = document.getElementById("agree");
        const agreeError = document.getElementById("err_agree");

        fnameError.innerHTML = "";
        lnameError.innerHTML = "";
        colorError.innerHTML = "";
        agreeError.innerHTML = "";

        const allowFrontendValidation = document.getElementById("validate").checked;

        if (allowFrontendValidation) {
            if (!fname.value) {
                fnameError.innerHTML = "First name cannot be empty.";
            } else {
                if (fname.value.length < 5) {
                    fnameError.innerHTML = "First name cannot be shorter than 5."
                }
            }

            if (!lname.value) {
                lnameError.innerHTML = "Lastname cannot be empty.";
            } else {
                if (lname.value.length < 5) {
                    lnameError.innerHTML = "Lastname cannot be shorter than 5.";
                }
            }

            if (color.value === "#000000") {
                colorError.innerHTML = "Color cannot be black.";
            }

            if (!agree.checked) {
                agreeError.innerHTML = "Conditions should be accepted.";
            }

        }
    if (!fnameError.innerHTML === "" ||
        !lnameError.innerHTML === "" ||
        !colorError.innerHTML === "" ||
        !agreeError.innerHTML === "") {
        return;
        }


    try {
        const response = await fetch("http://localhost:3000/submit", {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                fname: fname.value,
                lname: lname.value,
                color: color.value,
                agree: agree.checked
            }),
                });

        if (response.ok) {
            let message = "Hello " + response.body.fname + " " + response.body.lname + "!";
            const success = document.getElementById("success");
            success.innerHTML = message;
            success.style = "color:" + response.body.color;

            return;
        }

        const errors = await response.json();
        if (errors.fname) {
            fnameError.innerHTML = errors.fname;
        }
        if (errors.lname) {
            lnameError.innerHTML = errors.lname;
        }
        if (errors.color) {
            colorError.innerHTML = errors.color;
        }
        if (errors.agree) {
            agreeError.innerHTML = errors.agree;
        }
    } catch {
        //alert('ERROR')
    }

    return false;
}

