let username = document.getElementById("username")
let emaile = document.getElementById("email")
let pass = document.getElementById("pass")
let vaild = document.getElementById("val")
let error = document.getElementById("error")
let singupbtn = document.getElementById("singupbtn")


let UserRe =  /^[0-9A-Za-z]{4,16}$/
let emailRe = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
let passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

// Check for Vaild inputs
singupbtn.addEventListener("click", ()=>{
    
    let VaildEmail = emailRe.test(emaile.value)
    let Vaildpass = passRe.test(pass.value)
    let ValidUser = UserRe.test(username.value);

    if (VaildEmail === true && Vaildpass === true && ValidUser == true){
        // Sing them up

        singup();       
        error.innerText = ""
       
     
    }else if (VaildEmail === false && Vaildpass === true && ValidUser == true){
        error.innerText = "الرجاء التأكد من صحة البريد"
    }else if (VaildEmail === true && Vaildpass === false && ValidUser == true){
        error.innerText = "الرجاء التأكد من صحة كلمة المرور"
    }else if (VaildEmail === true && Vaildpass === true && ValidUser == false){
        error.innerText = "الرجاء التأكد من صحة اسم المستخدم "
    }

})


// Post the user info into the monkAPI
function singup(){


        let UserName = username.value
        let Email = emaile.value
        let Password = pass.value


        fetch("https://65587379e93ca47020a9592a.mockapi.io/usersinfo", {
            method: "POST",
            body: JSON.stringify({
                UserName,
                Email,
                Password
                
            })
            , headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })  .then(res => res.json())
            .then(data => {
                window.location.href= "../pages/singin.html"
            })



}