//validación de credenciales hardcoded hasta tener db
const email = "lucho1985@gmail.com";
const pwd = "1234";

let emailvalid = false;
let pwdvalid = false;

/* función de login previa a implementación de login con Jquery
function login() {
        
    const inputemail = document.getElementById("email").value.trim().toLowerCase();
    const inputpwd = document.getElementById("pwd").value;
   

    emailvalid = false;
    pwdvalid = false;

    if (inputemail !== email) {
        alert("Correo electrónico y/o contraseña incorrecta");
    } else {
        emailvalid = true;
    }

    if (inputpwd !== pwd) {
        alert("Correo electrónico y/o contraseña incorrecta");
    } else {
        pwdvalid = true;
    }

    console.log(inputemail, inputpwd, emailvalid, pwdvalid);

    if (emailvalid && pwdvalid) {
        alert("Great Success!");
        location.replace("menu.html");
    }
}*/

//validación de login con Jquery para satisfacer a Sence y a los Dioses Antiguos
$("#form-login").on("submit", function(event) {
    event.preventDefault();
    const inputemail = $("#email").val().trim().toLowerCase();
    const inputpwd = $("#pwd").val();    
    
    if (inputemail === email && inputpwd === pwd) {
        alert("Sesión iniciada!");
        location.replace("menu.html");
    } else {
        alert("Contraseña o correo incorrecto");
    }
})
