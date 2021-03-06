$(document).ready(() => {
  $.get("/api/members/getUsernames").then(data => {
    // let objData = Object.entries(data);
    const namesArray = [];
    data.forEach(item => {
      namesArray.push(item.username);
    });
    $(".bet-from").autocomplete({
      source: namesArray
    });
    // TODO This can be removed once passport is implemented correctly
    $(".bet-against").autocomplete({
      source: namesArray
    });
    // End removal section.
  });
});
