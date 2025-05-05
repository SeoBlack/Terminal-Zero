// information dialog that can take title and content as parameters
export function createLoadingDialog() {
    // Create the dialog element
    const dialog = document.createElement('div');
    dialog.className = 'loading-dialog';
    dialog.innerHTML = `
        <div class="loading-dialog-content">
        
            <div class="spinner"></div>
            <h2 class="loading-text">Loading</h2>
            
        </div>
    `;
    document.body.appendChild(dialog);

    // Add basic styles for the information dialog
    const style = document.createElement('style');
    style.textContent = `
        .loading-dialog {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            z-index: 999;
        }
        .loading-dialog-content {
            max-width: 600px;
            text-wrap: break-word;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 40px;
            color: white;
            border: 1px solid rgba(255,255,100,0.4);
            backdrop-filter: blur(10px);
            margin: 15% auto;
            padding: 20px;
            border-radius: 5px;
            width: 80%;
        }
        .loading-dialog h2 {
            color: #efb302;
            font-size: 24px;
            margin-bottom: 10px;
        }
                .spinner {
                margin-top: 20px;
            width: 100px;
            height: 100px;
            animation: spin 2s linear infinite;
            background-image: url('../../assets/images/unexplored-airport.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            transform-origin: center;
        }
        .loading-text::after {
            content: '';
            animation: dots 1.5s steps(4, end) infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes dots {
            0%, 25% { content: ''; }
            50% { content: '.'; }
            75% { content: '..'; }
            100% { content: '...'; }
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


export function showLoadingDialog() {
    const dialog = createLoadingDialog();
    // Show the dialog
    dialog.style.display = 'block';
    // Animate dialog on load
    dialog.style.transform = 'scale(0)';
    setTimeout(() => {
        dialog.style.transform = 'scale(1)';
    }, 1000);
    return dialog;
}

export function hideLoadingDialog(dialog) {
    // Hide the dialog
    dialog.style.transform = 'scale(0)';
    setTimeout(() => {
        dialog.style.display = 'none';
        document.body.removeChild(dialog);
    }, 500);
}