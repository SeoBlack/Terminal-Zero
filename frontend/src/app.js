
// Define routes
import {StartScreen} from "./pages/StartScreen.js";
import {GameScreen} from "./pages/GameScreen.js";
import {WinScreen} from "./pages/WinScreen.js";
import {Router} from "../js/components/router.js";

const routes = {
        'start': {
        handler: StartScreen,
        css: './styles/startscreen.css'
    },
    'game': {
        handler: GameScreen,
        css: './styles/gamescreen.css'
    },
        'win': {
        handler: WinScreen,
        css: './styles/winscreen.css'
    },
        'lose': {
        handler: GameScreen,
        css: './styles/los.css'
    },

};
document.addEventListener('DOMContentLoaded', () => {
    // Create router instance
    const router = new Router(routes);

    // Optional: Programmatic navigation example
    window.navigateTo = (path) => {
        window.location.hash = `#/${path}`;
    };

    console.log('SPA initialized and ready!');
});