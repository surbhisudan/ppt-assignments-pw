const form = document.querySelector(".form");
const contentContainer = document.querySelector(".content");

// Handle form submission
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Get the form values and create the new story object
    const title = document.getElementById("title").value;
    const imageUrl = document.getElementById("img-url").value;
    const author = document.getElementById("name").value;
    const category = document.getElementById("catagory").value;
    const story = document.querySelector(".form textarea").value;
    const newStoryData = {
        title: title,
        imageUrl: imageUrl,
        author: author,
        category: category,
        story: story,
    };

    // Get existing stories from local storage or initialize an empty array
    const existingStories = JSON.parse(localStorage.getItem("stories")) || [];

    // Add the new story data to the existing stories array
    existingStories.push(newStoryData);

    // Save the updated stories array back to local storage
    localStorage.setItem("stories", JSON.stringify(existingStories));

    // Call a function to update the content container with the stored stories
    updateContentContainer();

    // Reset the form fields
    form.reset();
});

// Function to update the content container with the stored stories
function updateContentContainer() {
    // Clear the content container
    contentContainer.innerHTML = "";

    // Get the stories from local storage or initialize an empty array
    const storedStories = JSON.parse(localStorage.getItem("stories")) || [];

    // Iterate through the stored stories and create the HTML structure for each story
    storedStories.forEach(function(storyData, index) {
        const { title, imageUrl, story, author, category } = storyData;
        const newStory = document.createElement("div");
        newStory.classList.add("card");
        newStory.innerHTML = `
      <div class="img-box">
        <img src="${imageUrl}" alt="error">
      </div>
      <div class="text">
        <h2 class="title">${title}</h2>
        <p class="paragraph">${story}</p>
        <div class="author-name">Authored: ${author}</div>
        <div class="btns">
        <button class="delete-card" data-index="${index}">Delete Post</button>
        </div>
        <div class="category">${category}</div>
      </div>
    `;
        contentContainer.appendChild(newStory);
    });

    // Add event listeners to the "Delete" buttons
    const deleteButtons = document.querySelectorAll(".delete-card");
    deleteButtons.forEach(function(deleteButton) {
        deleteButton.addEventListener("click", function(event) {
            const index = event.target.dataset.index;
            deleteStory(index);
        });
    });
}

// Function to delete a story card
function deleteStory(index) {
    // Get existing stories from local storage
    const existingStories = JSON.parse(localStorage.getItem("stories")) || [];

    // Remove the story at the given index
    existingStories.splice(index, 1);

    // Save the updated stories array back to local storage
    localStorage.setItem("stories", JSON.stringify(existingStories));

    // Call a function to update the content container with the stored stories
    updateContentContainer();
}

// Call the updateContentContainer function on page load
window.addEventListener("load", updateContentContainer);
