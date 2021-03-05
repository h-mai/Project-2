$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/members/getUsernames").then(data => {
    // let objData = Object.entries(data);
    const namesArray = [];
    data.forEach(item => {
      namesArray.push(item.username);
    });
    // $(".member-name").text(data.email);
    $(".bet-against").autocomplete({
      /*refer to the same id that input has*/
      source: namesArray
      /*set the source name that you gave your array variable*/
    });
  });
});
