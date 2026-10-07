document.getElementById("logo").addEventListener("load", rotate);
function rotate() {
  let posotion = 0;
  let stage = null;
  const logo = this;
  clearInterval(stage);
  stage = setInterval(frame, 5);
  function frame() {
    posotion += 1;
    logo.style.transform = "rotate(" + posotion + "deg)";
  }
  document.getElementById("logo").removeEventListener("click", rotate);
}
