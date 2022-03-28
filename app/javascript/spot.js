document.addEventListener("DOMContentLoaded", () => {
  const spotNameInput = document.querySelector("#search-input");
  if (spotNameInput){
    const inputElement = document.getElementById("search-input");
    inputElement.addEventListener("input", () => {
      const keyword = document.getElementById("search-input").value;
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/searching/?keyword=${keyword}`, true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        const searchResult = document.getElementById("search-result");
        searchResult.innerHTML = "";
        if (XHR.response) {
          const spotName = XHR.response.keyword;
          spotName.forEach((spot) => {
            const childElement = document.createElement("div");
            childElement.setAttribute("class", "child");
            childElement.setAttribute("id", spot.id);
            childElement.innerHTML = spot.spot_name;
            searchResult.appendChild(childElement);
            const clickElement = document.getElementById(spot.id);
            clickElement.addEventListener("click", () => {
              document.getElementById("search-input").value = clickElement.textContent;
              clickElement.remove();
            });
          });
        };
      };
    });
  };
});