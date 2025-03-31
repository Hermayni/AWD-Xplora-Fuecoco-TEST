document.addEventListener("DOMContentLoaded", function () {
    let existingPosts = [
        { user: "Alice", content: "Exploring the city today! #UrbanAdventure", img: "pages\Spots\assets\img\hh.jpg" },
        { user: "Bob", content: "Just found an amazing hidden coffee shop! ☕",},
        { user: "Charlie", content: "The architecture downtown is stunning! 🏙️",},
    ];

    // Load existing posts without images
    existingPosts.forEach(post => createPostElement(post.user, post.content, post.img));
});

document.getElementById("postImage").addEventListener("change", function (event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("imagePreview").src = e.target.result;
            document.getElementById("imagePreview").style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

function addPost() {
    let userName = document.getElementById("userName").value.trim();
    let postContent = document.getElementById("postContent").value.trim();
    let postImageInput = document.getElementById("postImage");

    if (postContent === "" || userName === "") return;

    if (postImageInput.files.length > 0) {
        let file = postImageInput.files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            createPostElement(userName, postContent, e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        createPostElement(userName, postContent, ""); // No image
    }

    document.getElementById("postContent").value = "";
    document.getElementById("userName").value = "";
    postImageInput.value = "";
    document.getElementById("imagePreview").style.display = "none";
}

function createPostElement(user, content, imgSrc) {
    let postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.innerHTML = `
        <p class="post-text"><strong>${user}:</strong> ${content}</p>
        ${imgSrc ? `<img class="post-img" src="${imgSrc}" alt="User uploaded image">` : ""}
        <div class="reactions">
            <button onclick="upvotePost(this)">⭐ <span>0</span></button>
            <button onclick="downvotePost(this)">👎 <span>0</span></button>
        </div>
    `;
    document.getElementById("feed").prepend(postDiv);
}

function upvotePost(button) {
    let countSpan = button.querySelector("span");
    countSpan.textContent = parseInt(countSpan.textContent) + 1;
    updateTopPosts();
}

function downvotePost(button) {
    let countSpan = button.querySelector("span");
    countSpan.textContent = parseInt(countSpan.textContent) - 1;
}

function updateTopPosts() {
    let posts = Array.from(document.querySelectorAll(".post"));
    posts.sort((a, b) => {
        let upvotesA = parseInt(a.querySelector(".reactions button span").textContent);
        let upvotesB = parseInt(b.querySelector(".reactions button span").textContent);
        return upvotesB - upvotesA;
    });

    let topPostsContainer = document.getElementById("topPosts");
    topPostsContainer.innerHTML = "";
    posts.slice(0, 3).forEach(post => {
        let clonedPost = post.cloneNode(true);
        topPostsContainer.appendChild(clonedPost);
    });
}

