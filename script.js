// Get references to the DOM elements
const uploadForm = document.getElementById('uploadForm');
const imageGallery = document.getElementById('imageGallery');
const searchBox = document.getElementById('searchBox');

// Array to hold uploaded images
let images = [];

// Event listener for the form submission
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the file and input values
    const file = document.getElementById('imageFile').files[0];
    const name = document.getElementById('imageName').value;
    const title = document.getElementById('imageTitle').value;
    const keywords = document.getElementById('imageKeywords').value.split(',').map(k => k.trim());

    // Create a temporary URL for the uploaded image
    const imageUrl = URL.createObjectURL(file);
    
    // Create an object to store image data
    const imageData = { imageUrl, name, title, keywords };
    
    // Add the image data to the images array
    images.push(imageData);
    
    // Display the images
    displayImages();
    
    // Reset the form
    uploadForm.reset();
});

// Function to display images in the gallery
function displayImages() {
    imageGallery.innerHTML = ''; // Clear the gallery

    // Loop through the images array and create image elements
    images.forEach(image => {
        const div = document.createElement('div');
        div.classList.add('image-item');
        div.innerHTML = `
            <img src="${image.imageUrl}" alt="${image.title}">
            <div class="info">
                <h4>${image.title}</h4>
                <p>${image.name}</p>
                <p>Keywords: ${image.keywords.join(', ')}</p>
            </div>
        `;
        imageGallery.appendChild(div); // Append the image element to the gallery
    });
}

// Function to search images based on user input
function searchImages() {
    const query = searchBox.value.toLowerCase(); // Get the search query
    const filteredImages = images.filter(image => 
        image.name.toLowerCase().includes(query) || 
        image.keywords.some(keyword => keyword.toLowerCase().includes(query))
    );
    
    // Clear the gallery and display filtered images
    imageGallery.innerHTML = '';
    filteredImages.forEach(image => {
        const div = document.createElement('div');
        div.classList.add('image-item');
        div.innerHTML = `
            <img src="${image.imageUrl}" alt="${image.title}">
            <div class="info">
                <h4>${image.title}</h4>
                <p>${image.name}</p>
                <p>Keywords: ${image.keywords.join(', ')}</p>
            </div>
        `;
        imageGallery.appendChild(div);
    });
}