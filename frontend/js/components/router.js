export class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentRoute = null;
        this.currentCSS = null;

        // Handle initial load
        window.addEventListener('DOMContentLoaded', () => {
            this.handleRouteChange();
        });

        // Handle hash changes
        window.addEventListener('hashchange', () => {
            this.handleRouteChange();
        });

        // Delegate link clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-route]')) {
                e.preventDefault();
                const route = e.target.getAttribute('data-route');
                window.location.hash = `#/${route}`;
            }
        });
    }

    handleRouteChange() {
        // Get current path (remove # and trailing slashes)
        console.log(window.location)
        const path = window.location.hash.replace(/^#\/?|\/$/g, '');

        // Find matching route
        const route = this.routes[path] || this.routes['404'];
        console.log(path);

        // Clean up previous route
        if (this.currentRoute && this.currentRoute.cleanup) {
            this.currentRoute.cleanup();
        }

        // Remove previous CSS
        if (this.currentCSS) {
            document.head.removeChild(this.currentCSS);
            this.currentCSS = null;
        }

        // Load new CSS if exists
        console.log(route)
        if (route.css) {
            this.currentCSS = document.createElement('link');
            this.currentCSS.rel = 'stylesheet';
            this.currentCSS.href = route.css;
            document.head.appendChild(this.currentCSS);
        }



        // Execute route function and render
        const app = document.getElementById('app');
        app.innerHTML = '';
        // Check if the route is a function
        if (typeof route.handler === 'function') {
            // If the route is a function, create a new instance
            this.currentRoute = route.handler();
        }

        const renderedElement = this.currentRoute.render();
        if (renderedElement) {
            app.appendChild(renderedElement);
             if (this.currentRoute.init) {
                this.currentRoute.init();
            }

        } else {
            console.error('Render function did not return a valid element');
        }

    }
}