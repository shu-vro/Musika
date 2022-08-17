// SELECTING ELEMENTS.
let ripple_buttons = document.querySelectorAll(".ripple"),
    nav_links = document.querySelectorAll("nav ul li"),
    closeButton = document.querySelector(".closeButton"),
    navigation = document.querySelector(".navigation"),
    pagination = document.querySelector(".pagination"),
    music_title = document.querySelector(".pagination .title h2"),
    music_list = document.querySelector(".music-list"),
    play_floating_button = document.querySelector(".play-floating-button"),
    AV_player = document.querySelector(".AV-player"),
    music_ul_tag = music_list.querySelector("ul"),
    volume_range = AV_player.querySelector(".volume-range"),
    input_file = document.getElementById("input_file"),
    list_music = AV_player.querySelector(".list-music"),
    value_of_range = document.querySelector(".value-of-range"),
    progress = document.querySelector(".progress"),
    repeat = AV_player.querySelector(".repeat"),
    prev_btn = document.querySelector(".prev"),
    play_btn = document.querySelector(".play"),
    next_btn = document.querySelector(".next"),
    shuffle_btn = document.querySelector(".shuffle"),
    music_array = [],
    backup_music_array = []; // Used for rearranging the music array after shuffling.

// RIPPLE BUTTON
ripple_buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let box = btn.getBoundingClientRect(),
            x = e.pageX - box.left + "px",
            y = e.pageY - box.top + "px";

        let ripples = document.createElement("b");
        ripples.classList.add("rippled");
        ripples.style.left = x;
        ripples.style.top = y;
        btn.appendChild(ripples);

        setTimeout(() => {
            ripples.remove();
        }, 500);
    });
});

if (music_array == []) {
    alert("Upload Some Audio Now!");
}

// DRAGGING THE SLIDER AND THE TIME.
function changeCurrentTime() {
    let minute = (progress.value / 60).toFixed(0);
    let second = progress.value % 60;
    value_of_range.querySelector(".value").textContent = `${minute}:${second}`;
    value_of_range.setAttribute(
        "style",
        `left: ${(progress.value / progress.max) * 100}%`
    );
}

progress.addEventListener("input", () => {
    changeCurrentTime();
    let sliderPosition = progress.value;
    audio.currentTime = sliderPosition;
});

function rangeSlider() {
    let position = 0;
    if (!isNaN(audio.duration)) {
        position = audio.currentTime;
        progress.value = position;
    }
}

// UPDATE SLIDER TIME.
let time = setInterval(() => {
    rangeSlider();
    changeCurrentTime();

    if (!audio.loop) {
        audio.addEventListener("ended", () => {
            if (music_index > music_array.length - 1) {
                music_index = 0;
            } else {
                music_index++;
            }
            LoadMusic(music_index);
            audio.play();
        });
    }
}, 1000);

// NAVIGATION LINK'S ACTIVE CLASS
nav_links.forEach((btn) => {
    btn.addEventListener("click", () => {
        nav_links.forEach((link) => {
            link.classList.remove("active");
        });
        btn.classList.add("active");
    });
});

// CLOSE BUTTON (COLLAPSE)
closeButton.addEventListener("click", () => {
    if (closeButton.classList.contains("active")) {
        closeButton.classList.remove("active");
        navigation.classList.remove("active");
        pagination.classList.remove("active");
        music_list.classList.remove("active");
        AV_player.classList.remove("active");
    } else {
        closeButton.classList.add("active");
        navigation.classList.add("active");
        pagination.classList.add("active");
        music_list.classList.add("active");
        AV_player.classList.add("active");
    }
});

// IF TITLE LENGTH IS GREATER THAN 13, START SCROLLING EFFECT.
if (music_title.textContent.length > 13) {
    music_title.classList.add("scroll");
}

// ADDITIONAL NAVIGATION LINKS.
nav_links[0].addEventListener("click", () => {
    AV_player.classList.add("on");
    music_list.classList.remove("on");
});

nav_links[1].addEventListener("click", () => {
    music_list.classList.add("on");
    AV_player.classList.remove("on");
});

list_music.addEventListener("click", () => {
    music_list.classList.add("on");
    AV_player.classList.remove("on");
    nav_links.forEach((link) => {
        link.classList.remove("active");
    });
    nav_links[1].classList.add("active");
});

// CATCHING USER UPLOADED AUDIO.
let music_index = 0;

input_file.addEventListener("change", () => {
    for (let i = 0; i < input_file.files.length; i++) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            let music = [
                input_file.files[i].name,
                (input_file.files[i].size / Math.pow(1024, 2)).toFixed(2),
                input_file.files[i].lastModified,
                reader.result,
            ];

            let date = new Date(input_file.files[i].lastModified);
            music_array.push(music);
            backup_music_array.push(music);

            let li = document.createElement("li");
            li.classList.add("ripple");
            li.innerHTML += `
                    <a href="#" title="${input_file.files[i].name}">
                    <span>${input_file.files[i].name}</span>
                    <span>${(
                        input_file.files[i].size / Math.pow(1024, 2)
                    ).toFixed(2)}M</span>
                    <span>${date.toLocaleDateString("en-US")}</span>
                    </a>
            `;
            music_ul_tag.appendChild(li);
            li.addEventListener("click", () => {
                let liSpan = li.querySelector("span").textContent;
                let name_array = music_array.map((e) => {
                    return e[0];
                });

                music_index = name_array.indexOf(liSpan);
                LoadMusic(music_index);
                checkPaused();
                audio.play();
            });

            li.addEventListener("mousemove", (e) => {
                play_floating_button.classList.add("moving");
                let rect = music_list.getBoundingClientRect();
                play_floating_button.setAttribute(
                    "style",
                    `left: ${e.pageX - rect.left}px; top: ${
                        e.pageY - rect.top
                    }px;`
                );
                li.style.left = e.clientX / 50 + "px";
                li.style.top = e.clientY / 50 + "px";
            });

            li.addEventListener("mouseleave", () => {
                li.style.left = "0px";
                li.style.top = "0px";
                play_floating_button.classList.remove("moving");
            });

            // IF AUDIO IS PLAYING, CHANGE THE ITEM'S COLOR
            audio.addEventListener("play", () => {
                if (
                    li.querySelector("span").textContent ==
                    music_title.querySelector("span").textContent
                ) {
                    console.log(li);
                    li.classList.add("playing");
                } else {
                    li.classList.remove("playing");
                }
            });
            audio.addEventListener("pause", () => {
                li.classList.remove("playing");
            });
        });
        reader.readAsDataURL(input_file.files[i]);
    }
    // AFTER .5 SECOND, PLAY.
    setTimeout(() => {
        LoadMusic(music_index);
    }, 500);
});

// pagination FUNCTION
function LoadMusic(music_index) {
    music_title.querySelector("span").textContent = music_array[music_index][0];
    audio.src = music_array[music_index][3];
    if (isNaN(audio.duration)) {
        setTimeout(() => {
            progress.max = audio.duration;
        }, 1000);
    } else {
        progress.max = audio.duration;
    }
    audio.play();
    checkPaused();
}

next_btn.addEventListener("click", () => {
    if (music_index > music_array.length - 1) {
        music_index = 0;
    } else {
        music_index++;
    }
    LoadMusic(music_index);
    audio.play();
    checkPaused();
});

prev_btn.addEventListener("click", () => {
    if (music_index < 0) {
        music_index = music_array.length - 1;
    } else {
        music_index--;
    }
    LoadMusic(music_index);
    audio.play();
    checkPaused();
});

repeat.addEventListener("click", () => {
    if (audio.loop == true) {
        audio.loop = false;
        repeat.style.color = "white";
    } else {
        repeat.style.color = "dodgerblue";
        audio.loop = true;
    }
});

play_btn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    checkPaused();
});

shuffle_btn.addEventListener("click", () => {
    shuffle_btn.classList.toggle("active");
    if (shuffle_btn.classList.contains("active")) {
        shuffleArray(music_array);
    } else {
        music_array = backup_music_array;
        return;
    }
});

function shuffleArray(array) {
    if (array.length <= 0) return;
    array.sort(() => Math.random() - 0.5);
}

function checkPaused() {
    if (audio.paused) {
        play_btn.classList.add("fa-play");
        play_btn.classList.remove("fa-pause");
    } else {
        play_btn.classList.remove("fa-play");
        play_btn.classList.add("fa-pause");
    }
}

// AUDIO VISUALIZER
let audioContext = new AudioContext();
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.parentElement.offsetWidth;
canvas.height = canvas.parentElement.offsetHeight;

let audioSource, analyser;
let audio = document.querySelector("audio");
audio.volume = 1;
volume_range.addEventListener("input", () => {
    audio.volume = volume_range.value / 100;
});

function audioVisualizer(audio) {
    audioContext.resume();
    audioSource = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 128;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    let barWidth = canvas.width / 2 / bufferLength;
    let x, barHeight;

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        x = 0;
        let opacity = 1;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            let color = {
                red: dataArray[i] * 2,
                green: i * 4,
                blue: dataArray[i] / 4,
            };
            let dy = Math.abs(barHeight - dataArray[i + 1]);
            opacity = 1 - dy / bufferLength;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.moveTo(
                canvas.width / 2 - x + barWidth / 2,
                canvas.height - barHeight - 100
            );
            ctx.lineTo(
                canvas.width / 2 - x - barWidth / 2,
                canvas.height - dataArray[i + 1] - 100
            );
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(
                canvas.width / 2 - x + barWidth / 2,
                canvas.height - barHeight - 100,
                barWidth / 2,
                0,
                Math.PI * 2,
                false
            );
            ctx.fill();
            ctx.closePath();

            ctx.fillStyle = `rgb(${color.red}, ${color.green}, ${color.blue})`;
            ctx.fillRect(
                canvas.width / 2 - x,
                canvas.height - barHeight - 75,
                barWidth,
                barHeight
            );
            x += barWidth;
        }

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            let color = {
                red: dataArray[i] * 2,
                green: i * 4,
                blue: dataArray[i] / 4,
            };
            let dy = Math.abs(barHeight - dataArray[i - 1]);
            opacity = 1 - dy / bufferLength;

            // LINE
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.moveTo(x + barWidth / 2, canvas.height - barHeight - 100);
            ctx.lineTo(
                x - barWidth / 2,
                canvas.height - dataArray[i - 1] - 100
            );
            ctx.stroke();
            ctx.closePath();

            // BALL
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(
                x + barWidth / 2,
                canvas.height - barHeight - 100,
                barWidth / 2,
                0,
                Math.PI * 2,
                false
            );
            ctx.fill();
            ctx.closePath();

            // BAR
            ctx.fillStyle = `rgb(${color.red}, ${color.green}, ${color.blue})`;
            ctx.fillRect(
                x,
                canvas.height - barHeight - 75,
                barWidth,
                barHeight
            );
            x += barWidth;
        }
    }
    animate();
}

window.addEventListener("click", () => {
    audioVisualizer(audio);
    audio.play();
});

window.addEventListener("resize", () => {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
});
