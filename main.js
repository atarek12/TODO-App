// variables
var input = document.querySelector('.input-text');
var addSign = document.querySelector('.add-sign');
var list = document.querySelector('.list');
var listItems = Array.from(document.querySelectorAll('ul li'));
var checkArray = Array.from(document.querySelectorAll('.check'));
var DeleteArray = Array.from(document.querySelectorAll('.dlt-btn'));
var deleteAll = document.querySelector('.delete-all');
var finishAll = document.querySelector('.finish-all');
var tasks = document.querySelector('.tasks');
var completed = document.querySelector('.completed');
var tasksCount = 0;
var completedCount = 0;
var tempDelete =0;    // temp is a value added to make sure we add event only once and prevent the loop
var tempCheck =0;    // temp is a value added to make sure we add event only once and prevent the loop



//handle add button
addSign.addEventListener('click', addTask);

//handl enter button when we are focus on text input
input.addEventListener('keyup', function(e){
    e.preventDefault();
    if(e.keyCode == 13){
        addTask();
    }
});


//handle delete all button
deleteAll.addEventListener('click', deleteAllFunc );

//handle finish all button
finishAll.addEventListener('click', finishAllFunc );

//handle the check box
function checkButtons(){
    
    for(let i=tempCheck; i<checkArray.length; i++){

        checkArray[i].addEventListener('change', function(){
            let thisBox = this;

            if(checkArray[i].checked){
                addDone(thisBox);
            } else{
                removeDone(thisBox);
            }
        });
    }
    tempCheck++;
}

//handle delete button
function deleteButtons(){
    for(let i=tempDelete; i<DeleteArray.length ; i++){
        DeleteArray[i].addEventListener('click',function(){
            deleteTask(this);
        });
    }
    tempDelete++;
}
function addTask(){
    // read the input value
    let textInput = input.value;

    //check that the input is not empty
    if(textInput.length > 0){
        // create new check box
        let newCheck = document.createElement('input');
        newCheck.className = 'check';
        newCheck.setAttribute('type','checkbox');

        // create new span to put text in it
        let newSpan1 = document.createElement('span');
        newSpan1.className = 'todo-text';
        newSpan1.appendChild(document.createTextNode(`${textInput}`));

        // add the delete button
        let newSpan2 = document.createElement('span');
        newSpan2.className = 'dlt-btn btn';
        newSpan2.appendChild(document.createTextNode('delete'));

        // add them to a new list item li
        let newLi = document.createElement('li');
        newLi.appendChild(newCheck);
        newLi.appendChild(newSpan1);
        newLi.appendChild(newSpan2);
        newLi.className = 'listItem';

        //add the list item to the list
        list.appendChild(newLi);

        // increment tasks badge
        tasksCount++;
        updateTask();

        //update buttons
        update();
    }
}

function addDone(thisBox){
    thisBox.nextElementSibling.classList.add('done');
    // increment completed badge
    completedCount++;
    updatecompleted()
}

function removeDone(thisBox){
    thisBox.nextElementSibling.classList.remove('done');
    // decrement completed badge
    completedCount--;
    updatecompleted()
}

function deleteTask(thisTask){
    thisTask.parentNode.remove('listItem');
    tasksCount--;
    updateTask();
    //if it was completed decrement the badge
    console.log(thisTask);
    if(thisTask.previousElementSibling.previousElementSibling.checked) // i got it from inspecting the element :)
    {
        completedCount--;
        updatecompleted() 
    }
}

function update(){
    checkArray = Array.from(document.querySelectorAll('.check'));
    DeleteArray = Array.from(document.querySelectorAll('.dlt-btn'));
    checkButtons();
    deleteButtons();
}

function deleteAllFunc(){
    while(list.firstChild) list.removeChild(list.firstChild);   // list.innerHTML = "";
    // reset badges
    completedCount=0;
    tasksCount=0;
    updatecompleted()
    updateTask();
}

function updateTask(){
    tasks.textContent = `${tasksCount}`;
}

function updatecompleted(){
    completed.textContent = `${completedCount}`;
}

function finishAllFunc(){
    for(let i=0; i<checkArray.length; i++){
        checkArray[i].checked=true;
        checkArray[i].nextElementSibling.classList.add('done');
    }
    completedCount=checkArray.length;
    updatecompleted();

    Swal.fire({                              // pop up sweet alert
        icon: 'success',
        title: 'Good job!',                         // search about sweet alert
        text: 'You have finished your work',
      })
}