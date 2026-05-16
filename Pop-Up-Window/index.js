const apiUrl = "https://picsum.photos/v2/list?page=3&limit=9";

// FETCH DATA
const loader = document.getElementById("loader");

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

async function fetchData() {
  showLoader();

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data);
    displayImages(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    hideLoader();
  }
}

fetchData();

// MODAL ELEMENTS
const model = document.querySelector(".model");

const modelImage = document.getElementById("model-image");

const closeBtn = document.querySelector(".close");

// DISPLAY IMAGES
function displayImages(images) {
  const container = document.getElementById("image-container");

  images.forEach((each) => {
    const img = document.createElement("img");

    img.src = each.download_url;

    img.alt = each.author;

    img.classList.add("image");

    // OPEN MODAL
    img.addEventListener("click", () => {
      model.style.display = "flex";

      modelImage.src = each.download_url;
    });

    container.appendChild(img);
  });
}

// CLOSE MODAL
closeBtn.addEventListener("click", () => {
  model.style.display = "none";
});
