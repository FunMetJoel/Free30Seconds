function AddPlayerScript() {
    const addButton = document.getElementById('addButton');
    const newItemInput = document.getElementById('newItemInput');
    const myList = document.getElementById('PlayerList');

    function addPlayer() {
        const newItem = document.createElement('li');
        newItem.innerText = newItemInput.value;
        myList.appendChild(newItem);
        newItemInput.value = '';
    }

    addButton.addEventListener('click', addPlayer);
    newItemInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addPlayer();
        }
    });
}

function onStart() {
    AddPlayerScript();
}

document.addEventListener('DOMContentLoaded', onStart);