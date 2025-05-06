'use strict';
// A button that when clicked, shows a help dialog with information about the game.
// The content changes depending on whether we're on the start screen or game screen.

import {Icons} from "./icons.js";

export function createHelpButton() {
    const helpButton = document.createElement('button');
    helpButton.innerHTML = Icons.HELP;
    helpButton.className = 'help-button';
    document.body.appendChild(helpButton);

    const helpDialog = document.createElement('div');
    helpDialog.className = 'help-dialog';

    // Tarkista onko näkymä start screen (esim. tiedostopolku sisältää "start")
    const isStartScreen = window.location.pathname.includes("start");

    const helpContent = isStartScreen
        ? `
        <div class="help-dialog-content" style="line-height: 1.6">
            <span class="close-button">&times;</span>
            <h2 class="heading">🎮 Welcome to Terminal Zero</h2>
            <p>To begin your journey:</p>
            <ul>
                <li>Type your name and click <strong>New Game</strong> to start fresh</li>
                <li>Or choose an existing character to continue where you left off</li>
            </ul>
            <br />
            <p>💡 Tip: You can click the <strong>?</strong> icon anytime for help.<br>The content will change once you enter the game!</p>
        </div>
        `
        : `
        <div class="help-dialog-content">
            <span class="close-button">&times;</span>
            <h2 class="heading">🕹️ Game Help</h2>
            <p>You're now inside the terminal. Here's how to survive:</p>

            <h3 class="heading">🎮 Controls</h3>
            <ul>
                <li><strong>Moving between airports</strong> – Press "Scan nearby airports" and click on one of the airports</li>
                <li><strong>Using inventory</strong> – Click on the item you wish to use</li>
                <li><strong>Exploring</strong> – You can explore airports by pressing "Explore Airport"</li>
            </ul>

            <h3 class="heading">💡 Tips</h3>
            <ul>
                <li>Explore carefully — resources are limited.</li>
                <li>Pay attention to the danger level</li>
                <li>Talk to characters. They might help... or not.</li>
                <li>Use your inventory wisely. Some items are one-time use.</li>
                <li>Save whenever possible. Survival is not guaranteed.</li>
            </ul>
        </div>
        `;

    helpDialog.innerHTML = helpContent;
    document.body.appendChild(helpDialog);

    const closeButton = helpDialog.querySelector('.close-button');
    closeButton.addEventListener('click', function () {
        helpDialog.style.display = 'none';
    });

    helpButton.addEventListener('click', function () {
        helpDialog.style.display = 'block';
    });

    // Sulje klikattaessa dialogin ulkopuolelle
    window.addEventListener('click', function (event) {
        if (event.target === helpDialog) {
            helpDialog.style.display = 'none';
        }
    });

    // Tyyli
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

    // Animaatio napille
    helpButton.style.transform = 'scale(0)';
    setTimeout(() => {
        helpButton.style.transform = 'scale(1)';
    }, 1000);

    helpDialog.style.display = 'block';


    return helpButton;
}
