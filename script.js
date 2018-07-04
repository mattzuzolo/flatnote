const sidebar = document.getElementById('sidebar')
const detail = document.getElementById('detail')
const deleteButtons = document.getElementsByClassName('detail')


document.addEventListener("DOMContentLoaded", function() {

    fetch("http://localhost:3000/api/v1/notes")
    .then(response => response.json())
    .then(json => displayNotes(json))
    .then(() => console.log("Fetch complete"))
    .then(() => findSidebarNode());
    // .then(() => deletePost());

    document.addEventListener("Click",

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
    }
  }
  //for loop
      //check if this === detail things
        //if true --> display content
      //
}

function deletePost () {
  // let delButton = document.getElementById('delete')
  var deletes = document.getElementsByClassName('delete-button');
  console.log
  for (var i = 0; i < deletes.length; i++) {
    deletes[i].addEventListener('click', function () {
      debugger;
    });
  }
}

function removeFromServer () {
  debugger;
  // let url = "http://localhost:3000/api/v1/notes"
  // let id = "#" //somehow find ID
  // let url_with_id = url + "/" + id
  //
  // fetch(url_with_id, {
  //   method: 'DELETE',
  //   headers: {
  //     "Content-type": "application/json"
  //   }
  // });

}

//finds first parent with selector
//https://stackoverflow.com/questions/22119673/find-the-closest-ancestor-element-that-has-a-specific-class



//find closest stable parent
// console.log();


// sidebar.addEventListener("click", function(e) {
//     debugger;
//     this
// });



const displayNotes = (notes) => {

  notes.forEach( note => {
    sidebar.innerHTML += `<div class="${note.id}"><h2>${note.title}</h2><p>${note.body.slice(0,20)}...</p></div>`

    detail.innerHTML += `<div class="${note.id}"><h2>${note.title}</h2><p>${note.body}</p><button id="edit" class="${note.id} edit-button">Edit</button> <button id="delete" class="${note.id} delete-button">Delete</button></div>`
  })

}
