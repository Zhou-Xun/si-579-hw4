const addTask = (descriptionInput, dueTime=false) => {
    const task = document.querySelector('#task_list');
    const localeString = new Date(dueTime).toLocaleString();

    if (dueTime !== false) {
        task.innerHTML += `<li>${descriptionInput.value}<span class="due">due ${localeString}</span><button class="btn btn-sm btn-outline-danger done" type="button">Done</button></li>`
    } else {
        task.innerHTML += `<li>${descriptionInput.value}<button class="btn btn-sm btn-outline-danger done" type="button">Done</button></li>`
    }

}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

const btn = document.querySelector('#add_task')
const descriptionInput = document.querySelector('#task_description_input');
const dateInput = document.querySelector('#duedate_input');
const timeInput = document.querySelector('#duetime_input');

const submitFunction = e => {
    const curTime = dateAndTimeToTimestamp(dateInput, timeInput);
    addTask(descriptionInput, curTime);
    descriptionInput.value = "";
    dateInput.value = "";
    timeInput.value = "";

    //    Removing "done" tasks, everytime after I create a new task, I need to add remove event to done button
    const done = document.querySelectorAll('.done')
    done.forEach(element => element.addEventListener('click', e => {
        element.parentElement.remove();
    }))
}

btn.addEventListener('click', submitFunction)

descriptionInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        btn.click();
    }
})



