let input = document.querySelector("input");
let button = document.querySelector("button");
let audio = document.querySelector("audio");
let result = document.querySelector(".result");

button.addEventListener("click", () => {
  button.innerHTML = "Searching...";
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`)
    .then((res) => {
      if (res.status === 200) {
        button.innerHTML = "Search";
      }
      return res.json();
    })
    .then((data) => {
      result.innerHTML = "";
      result.insertAdjacentHTML(
        "beforeend",
        `
         <div class="word">
          <p>${input.value}</p>
          <i class="bx bx-volume-full" onclick="playSound()"></i>
        </div>
        <div class="details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>${data[0].phonetic || ""}</</p>
        </div>
        <p class="word-meaning">${
          data[0].meanings[0].definitions[0].definition
        }</p>
        <p class="word-example">${
          data[0].meanings[0].definitions[0].example || ""
        }</p>`
      );
      audio.setAttribute("src", `${data[0].phonetics[0].audio || ''}`);
    });
});


function playSound(){
  audio.play()
}