// a dialog that will take a title and a function onConfirm as parameters
import {createTransparentButton} from "./buttons.js";
import {Icons} from "./icons.js";

export function createConfirmationDialog(title, onConfirm, onCancel = () => {}) {
    // Create the dialog element
    const dialog = document.createElement('div');
    dialog.className = 'confirmation-dialog';
    dialog.innerHTML = `
        <div class="confirmation-dialog-content">
            <span class="close-button">${Icons.CLOSE}</span>
            ${title}
            <div id="buttons">
       </div>

        </div>
    `;
    dialog.querySelector('#buttons').appendChild(createTransparentButton('Confirm', 'confirm-button', 'transparent-button', () => {

        dialog.style.display = 'none';
        onConfirm();
    }));
    dialog.querySelector('#buttons').appendChild(createTransparentButton('Cancel', 'cancel-button', 'transparent-button', function () {

        dialog.style.display = 'none';
        onCancel()
    }));
    // Set initial focus to the confirm button
setTimeout(() => {
    dialog.querySelector('#confirm-button').focus();
}, 150);
    document.body.appendChild(dialog);

    // Add event listener to close button
    const closeButton = dialog.querySelector('.close-button');
    closeButton.addEventListener('click', function () {
        dialog.style.display = 'none';
    });


    // Close the dialog when clicking outside of it
    const windowClickHandler = function (event) {
        if (event.target === dialog) {
            dialog.style.display = 'none';
            window.removeEventListener('click', windowClickHandler);
        }

    }
    window.addEventListener('click', windowClickHandler);

    // Add basic styles for the confirmation dialog
    const style = document.createElement('style');
    style.textContent = `
        .confirmation-dialog {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            z-index: 999;
        }
        .confirmation-dialog-content {
            position: relative;
            max-width: 600px;
            color: white;
            border: 1px solid rgba(255,255,100,0.4);
            backdrop-filter: blur(10px);
            margin: 15% auto;
            padding: 20px;
            border-radius: 5px;
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .close-button {
            position: absolute;
            top: 10px;
            right: 20px;
            font-size: 28px;
            font-weight: bold;
            color: #efb302;
            cursor: pointer;
            }
        .heading {
            color: #efb302;
            font-size: 24px;
            margin-bottom: 10px;
        }
        .confirmation-dialog p {
            color: #efb302;
            font-size: 18px;
        }

        
    `;
    document.head.appendChild(style);
    // Show the dialog
    dialog.style.display = 'block';
    // Animate dialog on load
    dialog.style.transform = 'scale(0)';
    setTimeout(() => {
        dialog.style.transform = 'scale(1)';
    }, 100);
    return dialog;

}

export function showConfirmationDialog(htmlContent, onConfirm, onCancel = () => {}) {
    const dialog = createConfirmationDialog(htmlContent, onConfirm, onCancel);
    // Show the dialog
    dialog.style.display = 'block';
    // Animate dialog on load
    dialog.style.transform = 'scale(0)';
    setTimeout(() => {
        dialog.style.transform = 'scale(1)';
    }, 100);
}