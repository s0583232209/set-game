document.getElementById("signUp").addEventListener("click", function (button) {
    button.preventDefault()
    signUp()
})
document.getElementById("logIn").addEventListener("click", function (button) {
    button.preventDefault()
    logIn()
})

function signUp() {
    let users = JSON.parse(localStorage.getItem("users")) || []
    const usersName = document.getElementById("userName").value
    const usersPassword = document.getElementById("password").value
    if (usersName == '' || usersPassword == '') {
        document.getElementById('formMessage').textContent = 'something is missing'
        return;
    }

    let userName = {
        name: document.getElementById("userName").value,
        password: document.getElementById("password").value,
        score: 0
    }
    console.log(users.filter(user => user.name == userName.name));
    if (users.filter(user => user.name == userName.name).length) {
        document.getElementById('userNameMessage').textContent = 'this user name allready exists'
        return;
    }

    users.push(userName)
    localStorage.setItem("users", JSON.stringify(users))
    sessionStorage.setItem('current-player', JSON.stringify(userName))
    document.getElementById("userName").value = '';
    window.location.href = '../html/home.html'
}

function logIn() {
    let existsUsers = JSON.parse(localStorage.getItem("users")) || []
    if (existsUsers == '') {
        document.getElementById('formMessage').textContent = 'please sign up'
        return false
    }
    let currentPlayer = existsUsers.find(user => user.name == document.getElementById("userName").value)
    if (currentPlayer == '') {
        document.getElementById('formMessage').textContent = 'please sign up'
        return false
    }
    else {
        {
            if (currentPlayer.password == document.getElementById('password').value) {
                document.getElementById("logInSignUp").setAttribute("id", 'exit')
                let userName = {
                    name: document.getElementById("userName").value,
                    password: document.getElementById("password").value,
                    score: currentPlayer.score
                }
                sessionStorage.setItem('current-player', JSON.stringify(userName))
                document.getElementById("userName").value = '';
                window.location.href = '../html/home.html'
                return true
            }
            else {
                document.getElementById('passwordMessage').textContent = 'the password is incurrect'
            }
        }
    }

}

document.querySelector('#divPassword img').addEventListener('click', passwordVisiblityHandling)
function passwordVisiblityHandling() {
    let password = document.getElementById("password")
    if (password.type == 'password') {
        this.src = "../media/pictures/off.png"
        password.type = 'text'
    }

    else {
        this.src = "../media/pictures/on.png"
        password.type = 'password'
    }
}
document.getElementById('xIcon').addEventListener('click', function () {
    document.getElementById('enter').style.display = 'none';

})
document.getElementById('logInSignUp').addEventListener('click', formVisiable);
function formVisiable() {
    document.getElementById('enter').style.display = 'flex'
}
