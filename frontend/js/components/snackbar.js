export const  snackbarType  = {
    ERROR: 'error',
    INFO : 'info',


}

export const showSnackbar = (type, message) => {
    // Check if the snackbar already exists
    // let snackbar = document.getElementById('snackbar');
    // if (!snackbar) {
    // Create the snackbar element
    const snackbar = document.createElement('div');
    snackbar.classList.add('snackbar');          // use a class for styling
    snackbar.dataset.snackbarId = crypto.randomUUID(); // optional: diagnostic attr
    snackbar.style.cssText = `
    position: fixed;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    background-color: transparent;
    padding: 16px;
    border-radius: 5px;
    border: 1px solid rgba(255,255,100,0.4);
    backdrop-filter: blur(10px);
    z-index: 1000;
    display: none;
    font-size: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
    opacity: 0;
        `;


    document.body.appendChild(snackbar);


    // Set the message and style based on the type
    snackbar.textContent = message;
    if (type === snackbarType.ERROR) {
        snackbar.style.color = '#ef5c52';
    } else if (type === snackbarType.INFO) {
        snackbar.style.color = '#efb302';
    }


// Show the snackbar
    snackbar.style.display = 'block';
    setTimeout(() => {
        snackbar.style.transform = 'translateX(-50%) translateY(70px)';
        snackbar.style.opacity = '1';
    }, 10);

// Hide the snackbar after 3 seconds
    setTimeout(() => {
        snackbar.style.transform = 'translateX(-50%) translateY(-50px)';
        snackbar.style.opacity = '0';
        setTimeout(() => {
            snackbar.style.display = 'none';
        }, 500);

    }, 3000)
// Remove the snackbar after it is hidden
    setTimeout(()=> {
        snackbar.remove();
    }, 3500)
}

// };