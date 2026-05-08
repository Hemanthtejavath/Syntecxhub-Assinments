const apiUrl = "https://picsum.photos/v2/list?page=3&limit=30";
const gallery = document.querySelector("#gallery");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");
const lightboxText = document.querySelector("#lightboxText");
const closeLightbox = document.querySelector("#closeLightbox");

function openLightbox(image) {
  lightboxImage.src = image.url;
  lightboxImage.alt = image.title;
  lightboxTitle.textContent = image.title;
  lightboxText.textContent = image.caption;
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeImagePreview() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function createGalleryCard(image) {
  const card = document.createElement("article");
  card.className = "gallery-card";
  card.tabIndex = 0;

  card.innerHTML = `
    <img src="${image.url}" alt="${image.title}">
    <div class="caption">
      <h2>${image.title}</h2>
      <p>${image.caption}</p>
    </div>
  `;

  card.addEventListener("click", () => openLightbox(image));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image);
    }
  });

  gallery.appendChild(card);
}

function renderMessage(message) {
  gallery.innerHTML = `<p class="gallery-message">${message}</p>`;
}

async function loadImages() {
  renderMessage("Loading images...");

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Images could not be loaded.");
    }

    const apiImages = await response.json();
    gallery.innerHTML = "";

    apiImages.forEach((item, index) => {
      createGalleryCard({
        title: `Gallery Image ${index + 1}`,
        caption: `Photo by ${item.author}`,
        url: `https://picsum.photos/id/${item.id}/900/650`,
      });
    });
  } catch (error) {
    renderMessage(
      "Sorry, images failed to load. Please check your internet connection.",
    );
  }
}

closeLightbox.addEventListener("click", closeImagePreview);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeImagePreview();
  }
});

loadImages();

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("active")) {
    closeImagePreview();
  }
});
