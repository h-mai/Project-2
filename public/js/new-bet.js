"use strict";
// Set the event listener up for the submit button.
const betSubmitButton = document.querySelector("#goTime");

if (betSubmitButton) {
  betSubmitButton.addEventListener("click", e => {
    e.preventDefault();
    // We need the betters userId
    const newBet = {
      user1: document.getElementById("betAgainst").value,
      user2: document.getElementById("betAgainst").value,
      wager: document.getElementById("wager").value,
      betTitle: document.getElementById("betTitle").value,
      expires: document.getElementById("expiration").value
    };

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
        console.log(response);
      }
    });
  });
}
