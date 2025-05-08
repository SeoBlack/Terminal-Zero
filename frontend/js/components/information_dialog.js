// information dialog that can take title and content as parameters
export function createInformationDialog(title, content) {
    // Create the dialog element
    const dialog = document.createElement('div');
    dialog.className = 'information-dialog';
    dialog.innerHTML = `
        <div class="information-dialog-content">
            <span class="close-button">&times;</span>
            <h2 class="heading">${title}</h2>
            <p>${content}</p>
        </div>
    `;
    document.body.appendChild(dialog);

    // Add event listener to close button
    const closeButton = dialog.querySelector('.close-button');
    closeButton.addEventListener('click', function () {
        dialog.style.display = 'none';
    });

    // Close the dialog when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === dialog) {
            dialog.style.display = 'none';
        }
    });

    // Add basic styles for the information dialog
    const style = document.createElement('style');
    style.textContent = `
        .information-dialog {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            z-index: 999;
        }
        .information-dialog-content {
            max-width: 600px;
            text-wrap: break-word;
            color: white;
            border: 1px solid rgba(255,255,100,0.4);
            backdrop-filter: blur(10px);
            margin: 15% auto;
            padding: 20px;
            border-radius: 5px;
            width: 80%;
        }
        .close-button {
            float: right;
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
        .information-dialog p {
            color: #efb302;
            font-size: 18px;
        }
        .information-dialog p:hover {
            color: #fff;
        }
        .information-dialog h2 {
            color: #efb302;
            font-size: 24px;
            margin-bottom: 10px;
        }
        .information-dialog h2:hover {
            color: #fff;
        }
    `;
    document.head.appendChild(style);
    // Show the dialog
    dialog.style.display = 'block';
    // Animate dialog on load
    dialog.style.transform = 'scale(0)';
    setTimeout(() => {
        dialog.style.transform = 'scale(1)';
    }, 1000);
    // Return the dialog element for further manipulation if needed
    return dialog;
}


export function showInformationDialog(title, content) {
    const dialog = createInformationDialog(title, content);
    // Show the dialog
    dialog.style.display = 'block';
    // Animate dialog on load
    dialog.style.transform = 'scale(0)';
    setTimeout(() => {
        dialog.style.transform = 'scale(1)';
    }, 1000);
    return dialog;
}