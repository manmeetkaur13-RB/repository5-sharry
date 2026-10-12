
/* =========================================
   MANN ❤️ SHARRY — BIRTHDAY WEBSITE JS
   Music • Countdown • Surprise • Floating Hearts
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------------------
  // 1. MUSIC PLAYER
  // -----------------------------------------

  const musicToggle = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");
  const musicLabel = document.getElementById("musicLabel");
  const birthdayMusic = document.getElementById("birthdayMusic");

  if (musicToggle && birthdayMusic) {
    birthdayMusic.volume = 0.65;

    function updateMusicButton(isPlaying) {
      if (musicIcon) {
        musicIcon.textContent = isPlaying ? "⏸️" : "🎵";
      }

      if (musicLabel) {
        musicLabel.textContent = isPlaying
          ? "Pause our song"
          : "Play our song";
      }

      musicToggle.setAttribute(
        "aria-label",
        isPlaying ? "Pause birthday music" : "Play birthday music"
      );
    }

    // Play or pause when the music button is clicked.
    musicToggle.addEventListener("click", async () => {
      if (birthdayMusic.paused) {
        try {
          await birthdayMusic.play();
          updateMusicButton(true);
        } catch (error) {
          console.error("Music playback failed:", error);

          updateMusicButton(false);

          if (musicLabel) {
            musicLabel.textContent =
              "Song unavailable — check music.mp3";
          }

          alert(
            "Your song could not play. Please check that music.mp3 " +
            "is uploaded beside index.html and that the filename is correct."
          );
        }
      } else {
        birthdayMusic.pause();
        updateMusicButton(false);
      }
    });

    // Keep the button correct if audio ends or is interrupted.
    birthdayMusic.addEventListener("play", () => {
      updateMusicButton(true);
    });

    birthdayMusic.addEventListener("pause", () => {
      updateMusicButton(false);
    });

    birthdayMusic.addEventListener("ended", () => {
      updateMusicButton(false);
    });

    birthdayMusic.addEventListener("error", () => {
      console.error(
        "Unable to load music.mp3. Check its filename and file location."
      );

      updateMusicButton(false);

      if (musicLabel) {
        musicLabel.textContent = "Check music.mp3";
      }
    });

    updateMusicButton(false);
  }

  // -----------------------------------------
  // 2. BIRTHDAY COUNTDOWN — OCTOBER 16
  // -----------------------------------------

  const countdownHeading = document.getElementById("countdownHeading");
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  function updateCountdown() {
    const now = new Date();

    // The birthday is October 16.
    let birthday = new Date(
      now.getFullYear(),
      9, // October (months start at 0)
      16,
      0, 0, 0
    );

    const isBirthdayToday =
      now.getMonth() === 9 && now.getDate() === 16;

    if (isBirthdayToday) {
      if (countdownHeading) {
        countdownHeading.textContent =
          "It's Sharry's Birthday Today! 🎂❤️";
      }

      if (daysElement) daysElement.textContent = "00";
      if (hoursElement) hoursElement.textContent = "00";
      if (minutesElement) minutesElement.textContent = "00";
      if (secondsElement) secondsElement.textContent = "00";

      return;
    }

    // If October 16 has passed, count down to next year.
    if (now >= birthday) {
      birthday = new Date(
        now.getFullYear() + 1,
        9,
        16,
        0, 0, 0
      );
    }

    if (countdownHeading) {
      countdownHeading.textContent =
        "Countdown to Sharry's Birthday 🎂";
    }

    const difference = Math.max(0, birthday.getTime() - now.getTime());

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
      (difference / 1000) % 60
    );

    if (daysElement) {
      daysElement.textContent = String(days).padStart(2, "0");
    }

    if (hoursElement) {
      hoursElement.textContent = String(hours).padStart(2, "0");
    }

    if (minutesElement) {
      minutesElement.textContent = String(minutes).padStart(2, "0");
    }

    if (secondsElement) {
      secondsElement.textContent = String(seconds).padStart(2, "0");
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // -----------------------------------------
  // 3. BIRTHDAY SURPRISE BUTTON
  // -----------------------------------------

  const surpriseBtn = document.getElementById("surpriseBtn");
  const surprise = document.getElementById("surprise");
  const againBtn = document.getElementById("againBtn");

  function revealSurprise() {
    if (!surprise) return;

    surprise.classList.add("show");

    surprise.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  if (surpriseBtn) {
    surpriseBtn.addEventListener("click", revealSurprise);
  }

  // Show the message again when this button is clicked.
  if (againBtn) {
    againBtn.addEventListener("click", () => {
      revealSurprise();
    });
  }

  // -----------------------------------------
  // 4. FLOATING HEARTS BACKGROUND
  // -----------------------------------------

  const heartsContainer = document.querySelector(".hearts");

  if (heartsContainer) {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reducedMotion) {
      const heartSymbols = ["♥", "♡", "💕", "💗"];
      const totalHearts = 18;

      for (let i = 0; i < totalHearts; i++) {
        const heart = document.createElement("span");

        heart.className = "heart";
        heart.textContent =
          heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize = 12 + Math.random() * 22 + "px";
        heart.style.animationDuration = 9 + Math.random() * 12 + "s";
        heart.style.animationDelay = -Math.random() * 18 + "s";

        heartsContainer.appendChild(heart);
      }
    }
  }

  // -----------------------------------------
  // 5. SMOOTH SCROLL FOR IN-PAGE LINKS
  // -----------------------------------------

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  console.log("❤️ Mann & Sharry's birthday website is ready!");
});

