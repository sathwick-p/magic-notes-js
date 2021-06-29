// if user adds a note, add it to the local storage 
// localStorage.clear() type it in the console to clear all everything in the local storage
console.log("Welcome to notes app.This is the js of this app")
showNotes(); //This function is called here so that when reloaded all the written notes will be shown
let addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click',function (e) {
    let addTxt = document.getElementById("Textarea");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
        //notes are stored as a array as notesObj
    }
    else{
        notesObj = JSON.parse(notes); 
        //When receiving data from a web server, the data is always a string.
        // Parse the data with JSON.parse(), and the data becomes a JavaScript object.
        // and gets stores in notes as an array
    }
    notesObj.push(addTxt.value); //this will push the value from the textarea to js when pressed on add notes button
    localStorage.setItem("notes",JSON.stringify(notesObj));
    // this will convert the array to string as in local storage it should be in String form
    addTxt.value = ""; //it makes the text area blank after submitting
    console.log(notesObj)
    // TO DISPLAY THE NOTES IN THE WEBPAGE
    showNotes();
})
// Function to show the elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes ==  null) {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element,index) {
            html += `  
        
            <div class="noteCard card mx-2 my-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${index+1}.</h5>
                    <p class="card-text" id="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
            // This adds the notes part as the addNotes section gets filled up and submitted

    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show! Use "Add notes" section to add your note `
    }
}

// Function to delete a note
function deleteNote(index) {
    console.log("Deleting in process of note no",index);
    let notes = localStorage.getItem("notes");
    if (notes ==  null) {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1); //this will remove the notes 
    localStorage.setItem("notes", JSON.stringify(notesObj))//this updates the local storage after deleting the note
    showNotes();
}
//searching for the words:
let search = document.getElementById('searchTxt');
search.addEventListener('input',function () {
    //this fires the input event as soon as text is entered in the boc
    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal)
    let noteCards =  document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt)

    })
//editing inside the notes:
let editTxt = document.getElementById('card-text');
editTxt.addEventListener("dblclick",function () {
    
})
})