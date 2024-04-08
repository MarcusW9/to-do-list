export function toDoDialogComponent() {
    const dialogsContainer = document.querySelector("#dialogs");

    // Create dialog element
    const addTodoDialog = document.createElement('dialog');
    addTodoDialog.id = 'add-todo-dialog';

    // Create dialog content container
    const addTodoDialogInside = document.createElement('div');
    addTodoDialogInside.id = 'add-todo-dialog-inside';

    // Create dialog content
    const addTodoDialogContent = document.createElement('div');
    addTodoDialogContent.id = 'add-todo-dialog-content';

    // Create paragraph for dialog
    const addTodoDialogP = document.createElement('p');
    addTodoDialogP.id = 'add-todo-dialog-p';
    addTodoDialogP.textContent = 'Enter the details of your to-do:';
    addTodoDialogContent.appendChild(addTodoDialogP);

    // Create labels and inputs
    const labels = ['Title', 'Description', 'Due Date', 'Priority'];
    const inputTypes = ['text', 'text', 'date'];
    const selectOptions = ['Low', 'Medium', 'High'];

    labels.forEach((labelText, index) => {
        const label = document.createElement('label');
        label.setAttribute('for', `add-todo-${labelText.toLowerCase().replace(' ', '-')}`);
        label.textContent = labelText;
        addTodoDialogContent.appendChild(label);
    
        if (inputTypes[index]) {
            const input = document.createElement('input');
            input.id = `add-todo-${labelText.toLowerCase().replace(' ', '-')}`;
            input.type = inputTypes[index];
            if (input.type === 'text') input.required = true;
            addTodoDialogContent.appendChild(input);
        } else {
            const select = document.createElement('select');
            select.id = `add-todo-${labelText.toLowerCase().replace(' ', '-')}`;
            select.required = true;
            selectOptions.forEach(optionText => {
                const option = document.createElement('option');
                option.value = optionText;
                option.textContent = optionText;
                select.appendChild(option);
            });
            addTodoDialogContent.appendChild(select);
        }
    });

    const notesLabel = document.createElement('label');
    notesLabel.setAttribute('for', 'add-todo-notes');
    notesLabel.textContent = 'Notes:';
    addTodoDialogContent.appendChild(notesLabel);

    const notesTextarea = document.createElement('textarea');
    notesTextarea.id = 'add-todo-notes';
    addTodoDialogContent.appendChild(notesTextarea);

    // Create buttons
    const confirmButton = document.createElement('button');
    confirmButton.id = 'confirm-todo';
    confirmButton.textContent = 'Confirm';
    addTodoDialogContent.appendChild(confirmButton);

    const cancelButton = document.createElement('button');
    cancelButton.id = 'cancel-todo';
    cancelButton.textContent = 'Cancel';
    addTodoDialogContent.appendChild(cancelButton);

    // Append elements to the DOM
    addTodoDialogInside.appendChild(addTodoDialogContent);
    addTodoDialog.appendChild(addTodoDialogInside);
    dialogsContainer.appendChild(addTodoDialog);
    document.body.appendChild(dialogsContainer);
}

export function refreshToDoDialog() {
    const dialogsContainer = document.querySelector("#dialogs");
    dialogsContainer.innerHTML = ""
    toDoDialogComponent()
}