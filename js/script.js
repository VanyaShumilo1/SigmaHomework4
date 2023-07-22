const progress = document.querySelector(".progress");

const progressBar = () => {
    let windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let per = windowScroll / windowHeight * 100;
    progress.style.width = per + "%";
}

window.addEventListener("scroll", progressBar);

