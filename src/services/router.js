export class Router {
  constructor() {
    this.routes = new Map();
    window.addEventListener("popstate", () => this.handleRoute());
    // DOM hazır olunca app.js'de çağrılacak
  }

  addRoute(path, component) {
    this.routes.set(path, component);
  }

  navigate(path) {
    window.history.pushState({}, "", path);
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;

    let matchedRoute = null;
    let params = {};

    for (let [route, component] of this.routes) {
      if (route === path) {
        matchedRoute = { route, component };
        break;
      }

      const routeParts = route.split("/");
      const pathParts = path.split("/");

      if (routeParts.length === pathParts.length) {
        let isMatch = true;
        const routeParams = {};

        for (let i = 0; i < routeParts.length; i++) {
          if (routeParts[i].startsWith(":")) {
            routeParams[routeParts[i].substring(1)] = pathParts[i];
          } else if (routeParts[i] !== pathParts[i]) {
            isMatch = false;
            break;
          }
        }

        if (isMatch) {
          matchedRoute = { route, component, params: routeParams };
          break;
        }
      }
    }

    const outlet = document.getElementById("router-outlet");
    if (!outlet) {
      console.error("Router outlet not found");
      return;
    }

    outlet.innerHTML = "";

    let componentName = "employee-list"; // default component
    if (matchedRoute && matchedRoute.component) {
      componentName = matchedRoute.component;
    }

    const ctor = customElements.get(componentName);
    if (!ctor) {
      console.error("Custom element not defined:", componentName);
      outlet.innerHTML = `<div>Component ${componentName} not found</div>`;
      return;
    }

    const element = new ctor();

    if (matchedRoute && matchedRoute.params) {
      for (const [key, value] of Object.entries(matchedRoute.params)) {
        element[key] = value;
      }
    }

    outlet.appendChild(element);
  }

  getCurrentPath() {
    return window.location.pathname;
  }
}

export const router = new Router();
