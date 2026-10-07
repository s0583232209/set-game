document.getElementById("exit").addEventListener('click', exit)
function exit() {
    sessionStorage.removeItem('current-player')
    window.location.href = '../html/enter.html'
}