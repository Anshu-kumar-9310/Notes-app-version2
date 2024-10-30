//====== For Open and Close FormContainer ========
const addNew = document.querySelector(".add-new");
const formContainer = document.querySelector(".form-container");
let closeicon = formContainer.querySelector(".cross");
// ====== For Open and Close FormContainer ========

let setting = formContainer.querySelector(".setting");
let submitbtn = formContainer.querySelector("#submitbtn");
let titletext = formContainer.querySelector(".titletext");
let longtext = formContainer.querySelector(".longtext");
let formTitle = formContainer.querySelector("#formTitle");

// for Assess Localstorage data if exist or Return an Empty Array
const notelist = JSON.parse(localStorage.getItem('Notes') || '[]') ;

// For Updated Notes Values 
let isUpdated = false, updatedId;

// function to show all local storage data
function ShowNotes(){

    // Remove all previous Notes If New Note is Added Because without it duplicate old notes when added new note Start =================
    document.querySelectorAll('.singleNotes').forEach((snotes)=>snotes.remove());
    //  Remove all previous Notes If New Note is Added Because without it duplicate old notes when added new note End =============

    notelist.forEach((note, IndexNo)=>{
        // console.log(note);
        let notetag = `
        <div class="singleNotes">
            <p class="title">${note.title}</p>
            <p class="desc">${note.desc}</p>
            <div class="footcontent">
                <span class="date">${note.Date}</span>
                <span class="dot" onclick='showMenu(this)'>. . .</span>
                <div class="setting">
                    <li onclick="EditNote(${IndexNo}, '${note.title}', '${note.desc}')"><img src="edit.png">Edit</li>
                    <hr>
                    <li onclick="DeleteNote(${IndexNo})"><img src="delete.png">Delete</li>
                </div>
            </div>
        </div>`;
        // ========= Add new Note after AddNew Box ===========
    addNew.insertAdjacentHTML('afterend',notetag);
    })
}
ShowNotes();

// Show Setting Box When Clicked on dot or Setting box 
// Outside other area clicked setting Box is removed
function showMenu(elem){
    // console.log(elem);
    elem.parentElement.classList.add('show');
    // confirm("first clicked");
    document.addEventListener('click', e=>{
        if(e.target != elem && e.target.tagName != 'LI'){
            // console.log(e.target.tagName);
            // console.log(e.target == elem);
            elem.parentElement.classList.remove('show');
            // confirm("second clicked");
        }
    }
    )
}



//When clicked on addnew Button formContainer Is show
addNew.addEventListener('click',()=>{
    submitbtn.innerHTML= "Add Note";
    formTitle.innerHTML= "Add a new note";
    titletext.value='';
    longtext.value='';
    formContainer.style.display = 'grid';
    titletext.focus();
})

// for Closing FormContainer Box
closeicon.addEventListener('click',()=>{
    formContainer.style.display = 'none';
})


// For Naming the dateMonth to Alphabhates
const Monthlist = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// onClicking Add new Note and Updated A note
submitbtn.addEventListener('click',()=>{
    
    let Dateobj = new Date();
    let year = Dateobj.getFullYear(),
    day = Dateobj.getDate(),
    month = Monthlist[Dateobj.getMonth()];
    
    if(titletext.value || longtext.value){
        // creating a object to store one Note values before inserting into array
        let newnotesadd = {
            title : titletext.value,
            desc : longtext.value,
            Date : `${month} ${day}, ${year}`
        }
        
        // check new note is created or old note updated
        if(!isUpdated){
            notelist.push(newnotesadd);
        }else{
            // set Isupdated = false 
            isUpdated = false;
            // Change Note Value to the refer Note
            notelist[updatedId] = newnotesadd;
        }
        
        // Saving all Notes in localstorage into Array Notelist as Name Notes
        localStorage.setItem('Notes',JSON.stringify(notelist));
        // call the CloseFuction to Close the FormContainer
        closeicon.click();
        // After Adding or Updating Notes is diaplay
        ShowNotes();
    }
    
});

// for Delete the Note By Index No 
function DeleteNote(IndexNo){
    // console.log(IndexNo);
    notelist.splice(IndexNo, 1);
    // console.log(notelist);

    // Saving all Notes in localstorage into Array Notelist as Name Notes
    localStorage.setItem('Notes',JSON.stringify(notelist));
    // After Deleting Notes, All Notes is  diaplay
    ShowNotes();
}

// For Updating notes
function EditNote(IndexNo, title, desc){
    // console.log(IndexNo ,title, desc );
    // Open FormContainer And Display Previous Data
    addNew.click();
    // Set Isupdated=true to update a data not creating a new one and take indexNo of the Updating Note
    isUpdated = true;
    updatedId = IndexNo;

    // Display Previous Data
    titletext.value=title;
    longtext.value=desc;
    // Set update Note Text instead of Add Note
    submitbtn.innerHTML= "Update Note";
    formTitle.innerHTML= "Update a note";
    
}