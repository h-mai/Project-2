$(document).ready(() => {
  $.get("/api/members/getUsernames").then(data => {
    // let objData = Object.entries(data);
    const namesArray = [];
    data.forEach(item => {
      namesArray.push(item.username);
    });
    // $(".member-name").text(data.email);
    $(".bet-against").autocomplete({
      source: namesArray
    });
  });
});
