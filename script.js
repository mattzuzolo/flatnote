const sidebar = document.getElementById('sidebar')
const detail = document.getElementById('detail')


document.addEventListener("DOMContentLoaded", function() {

    fetch("http://localhost:3000/api/v1/notes")
    .then(response => response.json())
    .then(json => displayNotes(json))
    .then(() => console.log("Fetch complete"))
    .then(() => findSidebarNode());

});

//add selector just for sidebar before DOM is loaded

function findSidebarNode() {
  const sidebarNodes = document.querySelectorAll("#sidebar div")
  //iterate over node list with for..of
  for (let sidebarElement of sidebarNodes) {
    //handleSidebarNode arguement is adding a function reference callback
    //The event listener can be specified as either a callback function or as an object that implements EventListener, whose handleEvent() method serves as the callback function.
    //https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#The_event_listener_callback
    sidebarElement.addEventListener("click", handleSidebarNode)

    console.log(sidebarElement);
  }

}

//filter collection of the node list upon click
//exclude "this" in the filter each time -> removes everything that isn't "this"
function handleSidebarNode(title) {
  const detailNodes = document.querySelectorAll("#detail div");

  for (let detailElement of detailNodes) {
    if (this.children[0].innerText === detailElement.children[0].innerText) {
        detailElement.style.display = "inline";
    } else {
        detailElement.style.display = "none";
        //.remove()
    }
  }
  //for loop
      //check if this === detail things
        //if true --> display content
      //



}

//find closest stable parent
// console.log();


// sidebar.addEventListener("click", function(e) {
//     debugger;
//     this
// });



const displayNotes = (notes) => {

  notes.forEach( note => {
    sidebar.innerHTML += `<div><h2>${note.title}</h2><p>${note.body.slice(0,20)}...</p></div>`

    detail.innerHTML += `<div><h2>${note.title}</h2><p>${note.body}</p><button id="edit">Edit</button> <button id="delete">Delete</button></div>`
  })

}
