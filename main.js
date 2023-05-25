const audio = document.querySelector("audio");

const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");

playBtn.addEventListener("click", () => {
    audio.play();
})

pauseBtn.addEventListener("click", () => {
    audio.pause();
})

console.log(audio);