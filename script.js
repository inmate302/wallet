//validación de credenciales hardcoded hasta tener db
const email = "lucho1985@gmail.com";
const pwd = "1234";
let emailvalid = false;
let pwdvalid = false;

 window.onload = function () { 
let inputemail = window.document.getElementById("email").value.trim().toLowerCase();
let inputpwd = window.document.getElementById("pwd").value;
};

if (inputemail !== email) {
   alert("Correo electrónico y/o contraseña incorrecta"); 
} else { emailvalid = true; }

if (inputpwd !== pwd ) {
   alert("Correo electrónico y/o contraseña incorrecta");     
} else { pwdvalid = true; }

console.log(inputemail, inputpwd, emailvalid, pwdvalid);

if (emailvalid == true && pwdvalid === true) {
    alert("Great Success!");
    //location.href='menu.html';
}

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