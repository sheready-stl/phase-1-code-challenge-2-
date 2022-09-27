// Your code here
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
  });
  //get dom elements
  const characterBar = document.getElementById("character-bar");
  const characterName = document.getElementById("name");
  const characterImage = document.getElementById("image");
  const characterVote = document.getElementById("vote-count");
  const characterVoteForm = document.getElementById("votes-form");
  //fetch data funtion
  function fetchData() {
    fetch("http://localhost:3000/characters")
      .then((resp) => resp.json())
      .then((data) => {
        renderCharacters(data);
        updateVotes(data);
      });
  }
  
  //funtion to render characters
  function renderCharacters(data) {
    data.forEach((data) => {
      const nameSpan = document.createElement("span");
      nameSpan.innerText = data.name;
  
      characterBar.appendChild(nameSpan);
      nameSpan.addEventListener("click", () => {
        characterName.textContent = data.name;
        characterImage.setAttribute("src", data.image);
        characterVote.textContent = data.votes;
      });
    });
  }
  
  // function updateVotes(data) {
  // console.log(characters)
  characterVoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log(e.target.votes.value)
    const newVotes = parseInt(event.target.votes.value);
    //console.log(newVotes);
    const characterVote = document.getElementById("vote-count");
    //console.log(characterVote.textContent);
    let current = parseInt(characterVote.textContent);
    //console.log(current);
    //console.log(typeof current);
    let votecount = (current += newVotes);
    characterVote.innerText = votecount;
    //update database
    let updateVotes = {
      votes: votecount,
    };
  
    fetch("http://localhost:3000/characters", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "",
      },
      method: "PATCH",
      body: JSON.stringify({
        votes: votecount,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  });
  