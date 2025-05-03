'use strict';
// A button that when clicked, shows a help dialog with information about the game, including controls and tips. The dialog can be closed by clicking a close button or outside the dialog area. content will be replaced later when we finsih the game
import {Icons} from "./icons.js";

export function createHelpButton() {
    const helpButton = document.createElement('button');
    helpButton.innerHTML = Icons.HELP;
    helpButton.className = 'help-button';
    document.body.appendChild(helpButton);
    const helpDialog = document.createElement('div');
    helpDialog.className = 'help-dialog';
    helpDialog.innerHTML = `
        <div class="help-dialog-content">
            <span class="close-button">&times;</span>
            <h2 class="heading">Game Help</h2>
            <p>Welcome to the game! Here are some tips to get you started:</p>
            <h3 class="heading">Controls</h3>
            <ul>
                <li><strong>Arrow Keys:</strong> Move your character</li>
                <li><strong>Spacebar:</strong> Jump</li>
                <li><strong>Enter:</strong> Interact with objects</li>
            </ul>
            <h3 class="heading">Tips</h3>
            <ul>
                <li>Explore the environment to find hidden items.</li>
                <li>Use your inventory wisely.</li>
                <li>If you get stuck, try talking to other characters.</li>
            </ul>
        </div>
    `;
    document.body.appendChild(helpDialog);
    const closeButton = helpDialog.querySelector('.close-button');
    closeButton.addEventListener('click', function () {
        helpDialog.style.display = 'none';
    });
    helpButton.addEventListener('click', function () {
        helpDialog.style.display = 'block';
    });
    // Close the dialog when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === helpDialog) {
            helpDialog.style.display = 'none';
        }
    });
    // Add basic styles for the help dialog
    const style = document.createElement('style');
    style.textContent = `
        .help-button {
            width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(0,0,0,0.5);
      border: none;
      color: #efb302;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
            border: 1px solid rgba(255,255,100,0.4);
        backdrop-filter: blur(10px);
        }
        .help-dialog {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            z-index: 1000;
        }
        .help-dialog-content {
            max-width: 600px;
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
            margin-top: 20px;
        }
    `;
    document.head.appendChild(style);
    // Add event listener to close the dialog when the close button is clicked

      helpButton.style.transform = 'scale(0)';
  setTimeout(() => {
    helpButton.style.transform = 'scale(1)';
  }, 1000)
    return helpButton;
}