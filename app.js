function getTermFromInput() {
  return $("#term").val();
}

function getMusic() {
  function createResponseDOM(songName, artUrl, singerName, albumName, songUrl) {
    let result = $("#result"),
      titleContent = $("<h1>", {
        text: songName,
      }),
      title = $("<div>", {
        class: "result__title",
        append: titleContent,
      }),
      artworkImg = $("<img>", {
        src: artUrl,
      }),
      artwork = $("<div>", {
        class: "result__artwork",
        append: artworkImg,
      }),
      singerNameContent = $("<p>", {
        text: singerName,
      }),
      albumNameContent = $("<p>", {
        text: albumName,
      }),
      containerInfo = $("<div>", {
        class: "result__info-place",
        append: [singerNameContent, albumNameContent],
      }),
      song = $("<audio>", {
        src: songUrl,
        controls: true,
      }),
      executerSong = $("<div>", {
        class: "result__executor-song",
        append: song,
      }),
      container = $("<div>", {
        class: "result__item",
        append: [title, artwork, containerInfo, executerSong],
      });

    result.append(container);
  }

  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://itunes.apple.com/search?term=${getTermFromInput()}&limit=10&entity=musicTrack`
  );

  xhr.onabort = () => {
    alert("error occurred while downloading music try again");
  };
  xhr.onload = () => {
    let res = JSON.parse(xhr.response);
    res.results.forEach((item) => {
      let songName = item.artistName,
        artUrl = item.artworkUrl60,
        singerName = item.trackName,
        albumName = item.collectionName,
        songUrl = item.previewURL;
      createResponseDOM(songName, artUrl, singerName, albumName, songUrl);
    });
  };
  xhr.send();
}

document.getElementById("submit").addEventListener("click", () => {
  getMusic();
  $("#term").val("");
});
