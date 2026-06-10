//validación de credenciales hardcoded hasta tener db
const email = "lucho1985@gmail.com";
const pwd = "1234";

let emailvalid = false;
let pwdvalid = false;

function login() {
    /*    
    const inputemail = document.getElementById("email").value.trim().toLowerCase();
    const inputpwd = document.getElementById("pwd").value;
   */

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
}

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

/*   Intento de uso de event listener on click
document.addEventListener("click", e => {
 if (e.target === "Depositar") {
    let x = getElementById("redirectMsg").value; 
    x = "Redirigiendo a Depositar";
    alert(x);
    setTimeout(() => { location.href("./deposit.html")}, 5000);
 }
 if (e.target === "Enviar Dinero") {
    let x = getElementById("redirectMsg").value; 
    x = "Redirigiendo a Enviar Dinero";
    alert(x);
    setTimeout(() => { location.href("./sendmoney.html")}, 5000);

 }

 if (e.target === "Últimos Movimientos") {
    let x = getElementById("redirectMsg").value; 
    x = "Redirigiendo a Últimos Movimientos";
    alert(x);
    setTimeout(() => {location.href("./transactions.html")}, 5000);
 }
});

*/