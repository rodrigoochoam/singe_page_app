/* var history = ""; */

var routes = {
  "": "home.html",
  "/": "home.html",
  "#/home": "home.html",
  "#/signin": "signin.html",
  "#/blog": "blog.html",
  "#/pricing": "pricing.html",
};

async function router() {
  console.log(location.hash);
  var innerElement = "";

  // get requested page
  var link = window.location.hash;

  // ----------------------------------------
  // If more than one parameter in the link,
  // I am targeting an element in the page,
  // an anchor. First load page, the scroll
  // the element into view.
  // ----------------------------------------

  var count = link.split("/").length - 1;
  if (count > 1) {
    // anchor element
    innerElement = link.split("/")[count];
    console.log(link.split("/"));

    // page to load
    link = "#/" + link.split("/")[1];
  }

  /*   //Avoid reloading page if internal link
  if (history === link && innerElement) {
    scrollIntoView(innerElement);
    history = link;
    return;
  }
  history = link;
 */
  // get path (route) for page
  var route = routes[link];

  // if route exists, load page
  if (route) loadPage(route, innerElement);
}
router();

async function loadPage(url, innerElement) {
  // load page
  const res = await fetch(url);
  const content = await res.text();
  const element = document.getElementById("content");
  element.innerHTML = content;

  // element scroll into view
  if (innerElement) {
    scrollIntoView(innerElement);
  }
}

function scrollIntoView(id) {
  document.getElementById(id).scrollIntoView();
}

window.addEventListener("hashchange", router);
