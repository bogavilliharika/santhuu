
"use strict";

// Santhuu's date of birth: 11 October 2008
const BIRTHDAY_MONTH = 10; // October
const BIRTHDAY_DAY = 11;
const BIRTHDAY_YEAR = 2008;

const intro = document.getElementById("intro");
const birthday = document.getElementById("birthday");
const beginBtn = document.getElementById("beginBtn");
const letterBtn = document.getElementById("letterBtn");
const letter = document.getElementById("letter");
const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("music");

// Open the surprise
beginBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  birthday.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Open and close the letter
letterBtn.addEventListener("click", () => {
  const opening = letter.classList.contains("hidden");
  letter.classList.toggle("hidden");

  letterBtn.textContent = opening
    ? "Close your letter ×"
    : "A little letter for you ♡";

  if (opening) {
    letter.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

// Birthday countdown to the next October 11
function updateCountdown() {
  const now = new Date();

  let target = new Date(
    now.getFullYear(),
    BIRTHDAY_MONTH - 1,
    BIRTHDAY_DAY
  );

  if (target.getTime() <= now.getTime()) {
    target = new Date(
      now.getFullYear() + 1,
      BIRTHDAY_MONTH - 1,
      BIRTHDAY_DAY
    );
  }

  const difference = target.getTime() - now.getTime();

  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference / 3600000) % 24);
  const minutes = Math.floor((difference / 60000) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

  const note = document.getElementById("countdownNote");
  const isBirthday =
    now.getMonth() === BIRTHDAY_MONTH - 1 &&
    now.getDate() === BIRTHDAY_DAY;

  note.textContent = isBirthday
    ? "Today is your day. Happy birthday, Santhuu! ♡"
    : "Every second brings another celebration closer.";
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Music: click to play or pause.
// Add a licensed music file through the audio URL below.
const MUSIC_URL = "music.mp3";
music.src = MUSIC_URL;

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicBtn.textContent = "Ⅱ Pause music";
    } catch (error) {
      musicBtn.textContent = "♫ Music unavailable";
      alert("Music could not load. Check your internet connection or use your own licensed MP3 file.");
    }
  } else {
    music.pause();
    musicBtn.textContent = "♫ Play music";
  }
});

music.addEventListener("pause", () => {
  musicBtn.textContent = "♫ Play music";
});

music.addEventListener("play", () => {
  musicBtn.textContent = "Ⅱ Pause music";
});
