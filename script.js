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
        detailElement.style.display = "inline";
    } else {
        detailElement.style.display = "none";
    }
  }
}

const displayNotes = (notes) => {
  notes.forEach( note => {
    sidebar.innerHTML += `<div class="${note.id}"><h2>${note.title}</h2><p>${note.body.slice(0,20)}...</p></div>`
    detail.innerHTML += `<div class="${note.id}"><h2>${note.title}</h2><p>${note.body}</p><button id="edit" class="${note.id}">Edit</button> <button id="delete" class="${note.id}">Delete</button></div>`
  })
  sidebar.innerHTML += `<div><button style="height:03%; width:100%;" id="create-button">Create a new post!</button></div>`
  const createButton = document.getElementById('create-button');
  createButton.addEventListener("click", displayCreateForm)
}

function displayCreateForm () {
    //hide all of the current stories in the detail section
    const detailNodes = document.querySelectorAll("#detail div");
    for (let detailElement of detailNodes) {
          detailElement.style.display = "none";
    }
    generateForm();
    newSubmit = document.getElementById("submit-button");
    newSubmit.addEventListener("click", beginPost)
}

function displayEditForm () {
    //{title: "Brooke's Note", body: "This is brooke's note", user_id: id}
    const detailNodes = document.querySelectorAll("#detail div");
    for (let detailElement of detailNodes) {
          detailElement.style.display = "none";
    }
    generateForm();
    editSubmit = document.getElementById("submit-button");
    editSubmit.addEventListener("click", beginEdit)
}

function generateForm () {
  let createForm = document.createElement("form");
  detail.append(createForm);
  createForm.style.padding = "03%";

  //this renders but can't see? covered?
  let titleField = document.createElement("input")
  titleField.id = "title-value";
  titleField.defaultValue = "Create title here"
  createForm.append(titleField);

  let bodyField = document.createElement("textarea")
  bodyField.id = "body-value";
  bodyField.defaultValue = "Add your description here"
  bodyField.style.width = "100%";
  bodyField.style.height = "20%";
  createForm.append(bodyField);

  let submitButton = document.createElement("button")
  submitButton.id = "submit-button";
  submitButton.style.width = "100%";
  submitButton.style.height = "02%";
  submitButton.innerHTML = "Submit"
  createForm.append(submitButton);

}

function beginPost () {
  let currentTitleValue = document.getElementById("title-value").value;
  let currentBodyValue = document.getElementById("body-value").value;
  let submissionBody = { "title": currentTitleValue, "body": currentBodyValue, "user_id": 1}
  postToServer(submissionBody)
}

function beginEdit () {
  let currentTitleValue = document.getElementById("title-value").value;
  let currentBodyValue = document.getElementById("body-value").value;
  let submissionBody = { "title": currentTitleValue, "body": currentBodyValue, "user_id": 1}
  editOnServer(submissionBody)
}

function postToServer(body){
  let url = "http://localhost:3000/api/v1/notes"
  //{title: "Brooke's Note", body: "This is brooke's note", user_id: id}
  function createPost(url,body) {
     const postConfig = {
       Accept: "application/json",
       method: "POST",
       headers: {
         "Content-type": "application/json"
       },
       body: JSON.stringify(body),
     };
     debugger;
     return fetch(url, postConfig)
   }
   createPost(url,body)
}

function editOnServer(editBody) {
  let url = "http://localhost:3000/api/v1/notes"
  let id = "#" //somehow find ID
  let url_with_id = url + "/" + id

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
