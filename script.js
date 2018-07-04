const sidebar = document.getElementById('sidebar')
const detail = document.getElementById('detail')

document.addEventListener("DOMContentLoaded", function() {

    fetch("http://localhost:3000/api/v1/notes")
    .then(response => response.json())
    .then(json => displayNotes(json))
    .then(() => console.log("Fetch complete"))
    .then(() => findSidebarNode());
    // .then(() => deletePost());
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
  }
}

//filter collection of the node list upon click
function handleSidebarNode(title) {
  const detailNodes = document.querySelectorAll("#detail div");
  for (let detailElement of detailNodes) {
    if (this.children[0].innerText === detailElement.children[0].innerText) {
      debugger;
        detailElement.style.display = "inline";
    } else {
        detailElement.style.display = "none";
    }
  }
}


function removeFromServer () {
  let url = "http://localhost:3000/api/v1/notes"
  let id = "#" //somehow find ID
  let url_with_id = url + "/" + id

  fetch(url_with_id, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json"
    }
  });

}

//finds first parent with selector
//https://stackoverflow.com/questions/22119673/find-the-closest-ancestor-element-that-has-a-specific-class



const displayNotes = (notes) => {
  notes.forEach( note => {
    sidebar.innerHTML += `<div class="${note.id}"><h2>${note.title}</h2><p>${note.body.slice(0,20)}...</p></div>`

    detail.innerHTML += `<div class="${note.id}"><h2>${note.title}</h2><p>${note.body}</p><button id="edit" class="${note.id}">Edit</button> <button id="delete" class="${note.id}">Delete</button></div>`
  })
}

function editOnServer() {

  let url = "http://localhost:3000/api/v1/notes"
  let id = "374"
  let url_with_id = url + "/" + id
  let editBody = {title: "Brooke's Note", body: "This is brooke's note", user_id: id}

  fetch(`url_with_id`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(editBody)
  })
  .then( res => res.json())
  .then( json => console.log(json));

}
