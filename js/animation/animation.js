// ! button get started animation
animator($("#getStart"), "-2000px", "0px", 1500);

// ! line animation
animator($("#line1"), "-2000px", "0px", 1000);
animator($("#line2"), "-2300px", "0px", 1300);
animator($("#line3"), "-2600px", "0px", 1400);
animator($("#line4"), "-2900px", "0px", 1500);

// ! advantage animation
animator($("#lowPrice"), "-2100px", "0px", 1000);
animator($("#highQuality"), "-2200px", "0px", 1300);
animator($("#oneBillion"), "-2300px", "0px", 1400);
animator($("#oneMillion"), "-2400px", "0px", 1500);

// ! note animation
animator($("#note1"), "0px", "0px", 1000, true, "200px", "-40px");
animator($("#note2"), "0px", "-40px", 1000, true, "210px", "-20px");
animator($("#note3"), "0px", "-40px", 1000, true, "220px", "24px");
animator($("#note4"), "0px", "4px", 1000, true, "230px", "4px");

function animator(
  elem,
  Fromleft,
  toLeft,
  durationInMls,
  isNote = false,
  FromTop = "",
  toTop = ""
) {
  if (isNote) {
    elem.css({
      top: FromTop,
      left: Fromleft,
      opacity: 0,
    });
    elem.animate(
      { top: toTop, left: toLeft, opacity: 1 },
      {
        duration: durationInMls,
      }
    );
  } else {
    elem.css({
      left: Fromleft,
      opacity: 0,
    });
    elem.animate(
      { left: toLeft, opacity: 1 },
      {
        duration: durationInMls,
      }
    );
  }
}

export default animator;
