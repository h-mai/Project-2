"use strict";

// set the event listener for the upvote buttons.
const upVoteButtons = document.querySelectorAll(".upvote");

if (upVoteButtons) {
  upVoteButtons.forEach(button => {
    // Listen for the click.
    button.addEventListener("click", e => {
      // Which bet is the vote for.
      const dataId = e.target.getAttribute("data-id");

      // Where is the vote being allocated (user 1 or user 2)
      const dataVote = {
        dataVote: "user" + e.target.getAttribute("data-vote")
      };

      // Send the information to the API to update the votes.
      fetch(`/api/upvote/${dataId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },

        // Serialize the JSON body.
        body: JSON.stringify(dataVote)
      }).then(response => {
        // Check the response is all aok.
        if (response.ok) {
          location("/");
        } else {
          alert("Whooston, we godda problem");
        }
      });
    });
  });
}
