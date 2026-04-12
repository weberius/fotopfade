let galleryItems = [];
let galleryLightbox;

fetch("service/gallery/" + namespace + ".json")
  .then(response => response.json())
  .then(data => {
    galleryItems = data.map(item => ({
      href: item.href,
      type: 'image',
      title: item.title,
      description: 'Copyright © Wolfram Eberius',
    }));

    galleryLightbox = GLightbox({
      elements: galleryItems,
      touchNavigation: true,
      loop: true
    });
  });

document.getElementById("gallery-btn").addEventListener("click", function (e) {
  e.preventDefault();
  if (galleryLightbox) {
    galleryLightbox.open();
  }
});