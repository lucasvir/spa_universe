export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#container").innerHTML = html;
      });

    const itsHome = route == "/pages/home.html";
    const itsUniverso = route == "/pages/universo.html";
    const itsExploracao = route == "/pages/exploracao.html";
    const body = document.body;

    switch (itsHome) {
      case itsUniverso:
        body.classList.remove("bg-home");
        body.classList.remove("bg-exploracao");
        body.classList.add("bg-universo");
        break;
      case itsExploracao:
        body.classList.remove("bg-home");
        body.classList.remove("bg-universo");
        body.classList.add("bg-exploracao");
        break;

      default:
        body.classList.remove("bg-exploracao");
        body.classList.remove("bg-universo");
        body.classList.add("bg-home");
        break;
    }
  }
}
