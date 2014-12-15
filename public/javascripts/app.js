var people = []
$(document).ready(function() {
  $("#addPeopleButton").click(function() {
    getPerson()
  })

  $("#outputButton").click(function() {
    //Put people into db
    matches = matchMaker(people);
  })
})

$(document).on('keydown', function(e) {
  if (e.which == 13 && e.shiftKey == false) {
    getPerson()
  }
})

function getPerson() {
  if ($("#input").text() != "") {
    console.log("Button pressed")
    people.push($("#input").text())
    console.log(people)
    $("#input").empty()
  }
}

function matchMaker(people) {
  var matches = []
  for (var i = 0; i < people.length; i++) {
    match = people[parseInt(Math.random() * people.length)]
    while (matches.indexOf(match) >= 0 || match == people[i]) {
      match = people[parseInt(Math.random() * people.length)]
    }
    matches.push(match)
  }
  return matches
}
