var people = []
$(document).ready(function() {
  $("#addPeopleButton").click(function() {
    console.log("Button pressed")
    people.push($("#input").text())
    console.log(people)
    $("#input").empty()
  })

  $("#outputButton").click(function() {
    //Put people into db
    matches = matchMaker(people);


  })
})

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
