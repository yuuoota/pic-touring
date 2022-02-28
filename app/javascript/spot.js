document.addEventListener("DOMContentLoaded", () => {
  const spotNameInput = document.querySelector("#post_spot");
  if (spotNameInput){
    const inputElement = document.getElementById("post_spot");
    inputElement.addEventListener("input", () => {
      const keyword = document.getElementById("post_spot").value;
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/search/?keyword=${keyword}`, true);
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
              document.getElementById("post_spot").value = clickElement.textContent;
              clickElement.remove();
            });
          });
        };
      };
    });
  };
});