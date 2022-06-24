document.addEventListener("DOMContentLoaded", function () {
  const textArea = document.querySelector("#user-input-text");
  let textAreaValue;
  const displaySpeedText = document.querySelector("#display-speed-text");
  let speed = 1000;
  let myInterval;
  let isPlaying = false;

  function calculateWordsPerMinute() {
    const userInput = +document.querySelector("#controls-speed").value;

    if (!userInput) return 1000;

    console.log("userInput:", userInput);
    speed = Math.round((1000 / userInput) * 60);
    console.log("speed:", speed);
    return speed;
  }

  if (textArea.addEventListener) {
    textArea.addEventListener(
      "input",
      function (e) {
        // event handling code for sane browsers
        textAreaValue = textArea.value.trim();
        if (textAreaValue) {
          console.log(textAreaValue);
          document.querySelector(".success").disabled = false;
        } else {
          console.log("no value");
          document.querySelector(".success").disabled = true;
        }
      },
      false
    );
  } else if (textArea.attachEvent) {
    textArea.attachEvent("onpropertychange", function (e) {
      // IE-specific event handling code
      textAreaValue = textArea.value.trim();
    });
  }

  document
    .querySelector("input#controls-speed")
    .addEventListener("input", function (e) {
      const newValue = document.querySelector("input#controls-speed").value;
      speed = newValue;
    });

  document
    .querySelector("button.success")
    .addEventListener("click", function () {
      if (textAreaValue) {
        if (!isPlaying) {
          isPlaying = true;
          const splitText = textAreaValue.split(" ");
          let currentWordPosition = 0;
          let speed = calculateWordsPerMinute();
          console.log(new Date());
          document
            .querySelector(".play-control .success")
            .classList.add("light");
          myInterval = setInterval(function () {
            if (splitText.length > currentWordPosition) {
              displaySpeedText.innerText = splitText[currentWordPosition];
              currentWordPosition++;
            } else {
              clearInterval(myInterval);
              isPlaying = false;
              console.log(new Date());
            }
          }, speed);
        } else {
          clearInterval(myInterval);
          isPlaying = false;
          console.log("isPlaying:", isPlaying);
          document.querySelector(".success.light").classList.remove("light");
        }
      }
    });
});
