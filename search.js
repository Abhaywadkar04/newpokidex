const inputElement = document.querySelector("#search-input");
const search_icon = document.querySelector("#search-close-icon");
const sort_wrapper = document.querySelector(".sort-wrapper");
const filterWrapper = document.querySelector(".filter-wrapper");
const body = document.querySelector("body");

inputElement.addEventListener("input", () => {
  handleInputChange(inputElement);
});

search_icon.addEventListener("click", handleSearchCloseOnClick);

sort_wrapper.addEventListener("click", () => {
  const isDropdownOpen = filterWrapper.classList.contains("filter-wrapper-open");
  filterWrapper.classList.toggle("filter-wrapper-open", !isDropdownOpen);
  body.classList.toggle("filter-wrapper-overlay", !isDropdownOpen);
});

function handleInputChange(inputElement) {
  const inputValue = inputElement.value;

  if (inputValue !== "") {
    search_icon.classList.add("search-close-icon-visible");
  } else {
    search_icon.classList.remove("search-close-icon-visible");
  }
}

function handleSearchCloseOnClick() {
  inputElement.value = "";
  search_icon.classList.remove("search-close-icon-visible");
}

