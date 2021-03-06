const sidebar = document.getElementById('sidebar')
const detail = document.getElementById('detail')

document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/api/v1/notes")
    .then(response => response.json())
    .then(json => displayNotes(json))
    .then(() => console.log("Fetch complete"))
    .then(() => findSidebarNode())
    .then(() => console.log("findSidebarNode complete"))
    .then(() => deletePostListener())
    .then(() => console.log("delete complete"))
    .then(() => editPostListener())
    .then(() => console.log("edit complete"))
});

function generateForm () {
  let createForm = document.createElement("form");
  detail.append(createForm);
  createForm.style.padding = "03%";

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

function beginPost () {
  let currentTitleValue = document.getElementById("title-value").value;
  let currentBodyValue = document.getElementById("body-value").value;
  let submissionBody = { "title": currentTitleValue, "body": currentBodyValue, "user_id": 1}
  postToServer(submissionBody)
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
    }
    return fetch(url, postConfig)
  }
  createPost(url,body)
}

const displayNotes = (notes) => {
  notes.forEach( note => {
    sidebar.innerHTML += `<div id="sidebar__post-container-${note.id}" class="${note.id}" ><h2>${note.title}</h2><p>${note.body.slice(0,20)}...</p></div>`

    detail.innerHTML += `<div id="detail__post-container-${note.id}" class="${note.id}"><h2>${note.title}</h2><p>${note.body}</p><button id="edit" class="${note.id}">Edit</button> <button id="delete" class="${note.id}">Delete</button></div>`
  })
  sidebar.innerHTML += `<div><button style="height:03%; width:100%;" id="create-button">Create a new post!</button></div>`
  const createButton = document.getElementById('create-button');
  createButton.addEventListener("click", displayCreateForm)
}


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

function deletePostListener() {
    const deleteButtons = document.querySelectorAll("#delete")
    for (let individualDeleteButton of deleteButtons) {
      individualDeleteButton.addEventListener("click", function(){
        removeFromServer(this.className);
        removeFromFront(this.className);
      })
    }
}

function removeFromServer (id) {
  let url = "http://localhost:3000/api/v1/notes"
  let url_with_id = url + "/" + id

  fetch(url_with_id, {
    method: 'DELETE',
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    }
  })
  .then( () => console.log("delete complete?"))
  .catch(function(error) {
    console.log(error);
  });
}
//code

function removeFromFront(className){
    let sidebarContainerToDelete = document.getElementById(`sidebar__post-container-${className}`);
    let detailContainerToDelete = document.getElementById(`detail__post-container-${className}`);
    sidebarContainerToDelete.style = "display: none";
    detailContainerToDelete.style = "display: none";
}

function editPostListener() {
    const editButtons = document.querySelectorAll("#edit")
    for (let individualeditButton of editButtons) {
      individualeditButton.addEventListener("click", function(){
        generateForm();
        displayEditForm(this.className)

      })
    }
}

    //{title: "Brooke's Note", body: "This is brooke's note", user_id: id}
function displayEditForm(className) {
    //can't access class and keep getting promise pending
    //className has a value here from displayEditForm(className)
    let editSubmit = document.getElementById("submit-button")

    editSubmit.addEventListener("click", function () {

          //className is uncaughtreference error here.
          var currentTitleValue = document.getElementById("title-value").value;
          var currentBodyValue = document.getElementById("body-value").value;
          var submissionBody = { "title": "DOES THIS WORK", "body": "I HOPE SO", "user_id": 1}
          var className = parseInt("4")
          const url = "http://localhost:3000/api/v1/notes/"
          const url_with_id = url + className
          debugger;

          //this fetch works in console and postman. But not in code.
          fetch(url_with_id, {
            //Accept: "application/json",
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            //body: JSON.stringify({"title": "currentTitleValue", "body": "currentBodyValue", "user_id": 1})
            body: JSON.stringify(submissionBody)
          })
          .then( res => res.json())
          .then( json => {
          console.log(json);
          })


    })
}
//post func:
// function createPost(url,body) {
//   const postConfig = {
//     Accept: "application/json",
//     method: "POST",
//     headers: {
//       "Content-type": "application/json"
//     },
//     body: JSON.stringify(body),
//   }
//   return fetch(url, postConfig)
// }
// createPost(url,body)



//old edit functions
//
// fetch(`http://localhost:3000/api/v1/notes/${"className"}`, {
//   method: 'PUT',
//   headers: {
//     'Content-type': 'application/json',
//     //'Accept': 'application/json'
//   },
//   //body: JSON.stringify({"title": "currentTitleValue", "body": "currentBodyValue", "user_id": 1})
//   body: JSON.stringify(submissionBody)
// })

// let updateMsg = (id, message, real_name) => {
//     const patchConfig = {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({title: "Brooke's Note", body: "This is brooke's note", user_id: id});
//         }
//     }




//
// function seeEditButtons() {
//   const editButtons = document.querySelectorAll("#edit")
//     for (let individualeditButton of editButtons) {
//       // debugger;
//       if (individualeditButton.style.display === "inline");
//         return individualeditButton.className;
//       }
// }

//
// function newPut(id){
//
//   fetch(`http://localhost:3000/api/v1/notes/${id}`, {
//   method: 'PUT',
//   headers: {
//     'Content-type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({title: "Brooke's Note", body: "This is brooke's note", user_id: 2})
// })
//   .then( res => res.json())
//   .then( json => {console.log(json)})
//
// }

// function editOnServer(editBody, id) {
//   let url = "http://localhost:3000/api/v1/notes"
//   //let id = "3" //somehow find ID
//   let url_with_id = url + "/" + id
//   debugger;
//   fetch(url_with_id, {
//     Accept: 'application/json',
//     method: 'PUT',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify(editBody)
//   })
//   .then( res => res.json())
//   .then( json => console.log(json));
// }

// function editOnServer(body, id) {
//   let url = "http://localhost:3000/api/v1/notes"
//   let url_with_id = url + "/" + id
//   // debugger;
//     function createUpdate(url_with_id,body) {
//       const postConfig = {
//         method: "PUT",
//         headers: {
//           "Accept": "application/json",
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(body),
//       };
//       // debugger;
//       return fetch(url_with_id, postConfig)
//     }
//     // debugger;
//   createUpdate(url_with_id,body)
//   // debugger;
//   //stuck at promise pending. NOt sure why??
// }

// function beginEdit () {
//   let currentTitleValue = document.getElementById("title-value").value;
//   let currentBodyValue = document.getElementById("body-value").value;
//   let submissionBody = { "title": currentTitleValue, "body": currentBodyValue, "user_id": 1}
//   editOnServer(submissionBody)
// }


//finds first parent with selector
//https://stackoverflow.com/questions/22119673/find-the-closest-ancestor-element-that-has-a-specific-class
