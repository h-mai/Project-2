"use strict";
// Set the event listener up for the submit button.
const betSubmitButton = document.querySelector("#goTime");

if (betSubmitButton) {
  alert("okies");
  betSubmitButton.addEventListener("submit", e => {
    alert("samesies");
    e.preventDefault();
    // We need the betters userId
    const newBet = {
      user1: "6",
      user2: "7",
      wager: document.getElementById("wager"),
      betTitle: document.getElementById("betTitle"),
      expires: document.getElementById("expiration")
    };

    console.log(newBet);

    fetch("/api/create_bet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify(newBet)
    }).then(response => {
      if (response.ok) {
        document.getElementById("create-bet").value = "";
      } else {
        alert("whoopsies");
        console.log(response);
      }
    });
  });
}
