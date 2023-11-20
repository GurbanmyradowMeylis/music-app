import animation from "./animation/animation.js";

// todo complete the button more
//! for more per page
let responseArr = [];
let inputTerm = $("#term").val();
let limit = 10;
let offset = 0;

// ! button get started created to animate the search field
$("#getStart").click(() => {
  document.getElementById("search-what-you-want").scrollIntoView({
    behavior: "smooth",
  });
});

// ! gets the music by the inputs value and creates it
function getMusic() {
  $("#loading").show("fast");

  fetch(
    `https://itunes.apple.com/search?term=${inputTerm}&limit=${limit}&entity=musicTrack&offset=${offset}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      $("#loading").hide();
      response.json().then((res) => {
        console.log(res);
        responseArr = [];

        responseArr.push(res.results);

        responseArr[0].forEach((i) => {
          let biggerPictureUrl = i.artworkUrl100.replace(
            "100x100bb",
            `600x600bb`
          );
          createResponseDOM(
            biggerPictureUrl,
            i.artistName,
            i.singerName,
            i.previewUrl,
            i.trackPrice + i.trackPrice,
            i.trackPrice,
            i.currency,
            i.trackViewUrl
          );
        });
        offset += 13;
      });
    })
    .catch((err) => {
      alert("Error occurred : " + err);
    });
}
// ! to submit the value that in the input
$("#term").keydown((ev) => {
  if (ev.key.toLowerCase() == "enter") {
    getMusic();
    $("#term").val("");
    $("#resultCards").empty();
    loadMore();
  }
});
$("#submit").click(() => {
  getMusic();
  $("#term").val("");
  $("#resultCards").empty();
  loadMore();
});

function loadMore() {
  $("#more").show("fast", function () {
    $(this).click(() => {
      $("#loading").show("fast");

      fetch(
        `https://itunes.apple.com/search?term=${inputTerm}&limit=${limit}&entity=musicTrack&offset=${offset}`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          $("#loading").hide();
          console.log(
            response.json().then((res) => {
              console.log(res);
              responseArr = [];

              responseArr.push(res.results);

              responseArr[0].forEach((i) => {
                let biggerPictureUrl = i.artworkUrl100.replace(
                  "100x100bb",
                  `600x600bb`
                );
                createResponseDOM(
                  biggerPictureUrl,
                  i.artistName,
                  i.singerName,
                  i.previewUrl,
                  i.trackPrice + i.trackPrice,
                  i.trackPrice,
                  i.currency,
                  i.trackViewUrl
                );
              });
            })
          );
        })
        .catch((err) => {
          alert("Error appeard : " + err);
        });
    });
  });
}

// responseArr[0].forEach((i) => {
//   let biggerPictureUrl = i.artworkUrl100.replace(
//     "100x100bb",
//     `600x600bb`
//   );
//   createResponseDOM(
//     biggerPictureUrl,
//     i.artistName,
//     i.singerName,
//     i.previewUrl,
//     i.trackPrice + i.trackPrice,
//     i.trackPrice,
//     i.currency,
//     i.trackViewUrl
//   );
// });
// ! creates the response after the getting music

function createResponseDOM(
  artworkUrlPath,
  songerNameText,
  singerNameText,
  musicUrlPath,
  fakePriceText,
  truePriceText,
  currency,
  pageUrlPathToBuy
) {
  let fakePrice;

  if (typeof truePriceText == "undefined") {
    fakePriceText = `${true} ${currency.toLowerCase()}`;
    truePriceText = "free";
    currency = "";
  } else {
    fakePrice = $("<div>", {
      id: "fakePrice",
      class:
        "text-base text-[#7b7b7b] line-through decoration-[#7B7B7B] font-light",
      append: `<p>
        <span>${fakePriceText} </span>
        <span>${currency}</span>
              </p>`,
    });
  }
  currency = currency.toLowerCase();

  let result = $("#resultCards");

  let truePrice = $("<div>", {
    id: "truePrice",
    append: `
    <p>
    <span>${truePriceText} </span>
    <span>${currency}</span>
  </p>
  `,
  });

  let prices = $("<div>", {
    class: "text-2xl text-white font-bold italic",
    id: "prices",
    append: [fakePrice, truePrice],
  });

  let buyButton = $("<a>", {
    id: "buyButton",
    class: "py-2 px-5 bg-purple-600 rounded-2xl ",
    href: pageUrlPathToBuy,
    target: "_blank",
    text: "Buy now!",
  });

  let buyButtonWrapper = $("<div>", {
    class: "mt-8",
    id: "buy",
    append: buyButton,
  });

  let card__footer = $("<div>", {
    id: "card__footer",
    class: "flex justify-between items-end flex-grow",
    append: [prices, buyButtonWrapper],
  });

  let audio = new Audio(musicUrlPath);

  let isStoped = true;
  let play = $("<img>", {
    src: "./assets/svgs/customAudio/play.svg",
    id: "play",
    class: "h-7 w-7",
  });
  let pause = $("<img>", {
    src: "./assets/svgs/customAudio/pause.svg",
    id: "pause",
    css: {
      display: "none",
    },
    class: "h-7 w-7",
  });
  let timeNumber = $("<p>", {
    text: `00:${
      audio.currentTime.toFixed().length == 1
        ? "0" + audio.currentTime.toFixed()
        : audio.currentTime.toFixed()
    }`,
    css: {},
  });
  audio.addEventListener("timeupdate", function (e) {
    timeNumber.text(
      `00:${
        audio.currentTime.toFixed().length == 1
          ? "0" + audio.currentTime.toFixed()
          : audio.currentTime.toFixed()
      }`
    );
  });
  let time = $("<div>", {
    append: timeNumber,
    css: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  let play_pauseToggle = $("<button>", {
    append: [play, pause],
  });
  play_pauseToggle.on("click", function () {
    isStoped ? audio.play() : audio.pause();
    play.toggle();
    pause.toggle();
    isStoped = !isStoped;
  });

  let valume = $("<input>", {
    type: "range",
    min: 0,
    max: 1,
    value: (0.3 - 0) / (1 - 0),
    step: 0.1,
    id: "valume",
    css: {
      transform: "rotate(270deg)",
    },
  });

  let valumeWrapper = $("<div>", {
    append: valume,
    class: "valumeWrapper",
    css: {
      display: "none",
    },
  });
  audio.volume = 0.3;

  valume.on("change", function () {
    audio.volume = valume.val();
  });

  let duration = $("<input>", {
    type: "range",
    min: 0,
    max: 30,
    value: 0,
    id: "duration",
  });

  durationController(duration, audio);

  let soundImg = $("<img>", {
    src: "./assets/svgs/customAudio/sound.svg",
    class: "h-7 w-7 ",
  });

  let soundButton = $("<button>", {
    append: soundImg,
  });

  soundImg.on({
    click: function () {
      valumeWrapper.toggle();
    },
  });

  let soundController = $("<div>", {
    append: [soundButton, valumeWrapper],
  });

  let Wrapper = $("<div>", {
    class: "flex gap-2",
    append: [play_pauseToggle, time, duration, soundController],
  });

  let audioBg_blursAudio = $("<div>", {
    class: "rounded-lg p-3 backdrop-blur-sm",
    id: "custom-audio",
    append: [audio, Wrapper],
  });
  let audioBg_color = $("<div>", {
    class: "rounded-lg bg-white/20",
    append: audioBg_blursAudio,
  });

  let audioBg = $("<div>", {
    class: "bg-transparent mb-6",
    id: "audio",
    append: audioBg_color,
  });

  let songName = $("<h1>", {
    class: "text-4xl",
    text: songerNameText,
  });

  let singerName = $("<p>", {
    class: "text-left text-xl text-black/30",
    text: singerNameText,
  });

  let result__infoPlace = $("<div>", {
    id: "result__info-place",
    append: singerName,
  });

  let result__title = $("<div>", {
    id: "result__title",
    append: songName,
  });

  let artworkImg = $("<img>", {
    src: artworkUrlPath,
    class: "w-full h-52 rounded-md",
  });

  let artwork = $("<div>", {
    id: "result__artwork",
    append: artworkImg,
  });

  let resultItem = $("<div>", {
    class: "flex flex-col gap-1 p-5 relative flex-grow ",
    id: "result__item",
    append: [artwork, result__title, result__infoPlace, audioBg, card__footer],
  });

  let cardBg_blursCard = $("<div>", {
    class: "rounded-lg flex flex-grow",
    append: resultItem,
    css: {
      "backdrop-filter": "blur(5px)",
    },
  });

  let cardBg_color = $("<div>", {
    class: "rounded-lg flex-grow flex flex-grow",
    append: cardBg_blursCard,
    css: {
      background: "rgba(255, 255, 255, 0.4)",
    },
  });

  let cardBg = $("<div>", {
    id: "resultItem-bg",
    class: "flex bg-transparent w-[85%] result relative ",
    append: cardBg_color,
  });

  result.append(cardBg);
  animation($(".result"), "-400px", 0, 1000);
  setTimeout(() => {
    $(".result").removeAttr("class");
  }, 1001);
}

// ! for audio
function durationController(input, audio) {
  input.on("change", function () {
    audio.currentTime = $(this).val();
    audio.play();
  });
  audio.addEventListener("timeupdate", function () {
    input.val(audio.currentTime);
  });
}
