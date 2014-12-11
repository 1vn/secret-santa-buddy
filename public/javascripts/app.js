$(document).ready(function() {
  var people = []
  $("#addPeopleButton").click(function() {
    console.log("Button pressed")
    people.push($("#input").text())
    console.log(people)
    $("#input").empty()
  })

  $("#outputButton").click(function() {
    //Put people into db
    people = []
    mongoose
  })
})
