// Base API URL for interacting with the server
const API_BASE_URL = 'https://demo-api-skills.vercel.app/api/UrbanExplorer/places';

// Store posts in local storage
function storePost(post) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Load posts from local storage and render them
function loadPosts() {
    console.log('Loading posts...');
    fetch(API_BASE_URL)
        .then(response => {
            console.log('Posts response status:', response.status);
            return response.json();
        })
        .then(posts => {
            console.log('Loaded posts:', posts);
            
            // Sort posts by creation date in descending order (newest first)
            // If posts have a createdAt field, use that, otherwise use the current order
            const sortedPosts = [...posts].sort((a, b) => {
                // If posts have createdAt timestamps, use those
                if (a.createdAt && b.createdAt) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
                // If posts have id fields that are sequential, use those as a fallback
                // (assuming newer posts have higher IDs)
                if (a.id && b.id) {
                    return b.id - a.id;
                }
                // Default to current order if no sorting criteria available
                return 0;
            });
            
            console.log('Sorted posts (newest first):', sortedPosts);
            
            const postsContainer = document.getElementById('feed');
            postsContainer.innerHTML = '';
            sortedPosts.forEach(post => {
                // Get current user from localStorage
                const currentUser = JSON.parse(localStorage.getItem('user'));
                if (!post.ownerName && currentUser) {
                    post.ownerName = currentUser.name;
                }
                // Ensure likes array exists
                if (!post.likes) {
                    post.likes = [];
                }
                postsContainer.appendChild(createPostElement(post));
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}


function createPostElement(post) {
    const postCard = document.createElement('div');
    postCard.classList.add('post-card');

    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const displayName = post.ownerName || (currentUser ? currentUser.name : 'Anonymous');

    // Check if the current user has liked or bookmarked this post
    const isLiked = post.likes && Array.isArray(post.likes) && post.likes.includes(currentUser?.id);
    const isBookmarked = post.bookmarks && Array.isArray(post.bookmarks) && post.bookmarks.includes(currentUser?.id);
    const likeCount = post.likes && Array.isArray(post.likes) ? post.likes.length : 0;

    // Ensure category is properly set
    const category = post.category || 'Uncategorized';
    console.log('Creating post element with category:', category);

    postCard.innerHTML = `
        <div class="post-header">
    <div class="user-info">
        <i class="fas fa-user-circle"></i>
                <span class="post-user-name">${'Anonymous'}</span>
    </div>
    <div class="post-meta">
        <span class="post-card-location">${post.location}</span>
                <span class="post-card-category">${category}</span>
    </div>
    <i class="fas fa-ellipsis-h more-options" onclick="toggleOptionsMenu(this)"></i>
    <div class="post-options-menu">
        <button class="delete-btn" onclick="deletePost('${post.id}')">Delete</button>
    </div>
</div>
<div class="post-body">
    <p class="post-card-postplace-name">${post.name}</p>
    <p class="post-card-place-description">${post.description}</p>
</div>
<div class="post-footer">
            <button class="reaction-btn like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike(this)" data-place-id="${post.id}">
                <i class="fa fa-thumbs-up"></i> <span class="like-count">${likeCount}</span>
    </button>
            <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark(this)" data-place-id="${post.id}">
                <i class="fa fa-bookmark"></i>
            </button>
        </div>
    `;

    return postCard;
}


// Toggle the visibility of the options menu (Delete button)
// Toggle the visibility of the options menu (Delete button)
function toggleOptionsMenu(el) {
    const optionsMenu = el.nextElementSibling;  // Get the menu next to the clicked button
    // Toggle the display style of the menu
    optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';
}


// Delete post
function deletePost(postId) {
    console.log('Deleting post with ID:', postId); // Debugging log

    // Use postId to send the DELETE request to the API
    fetch(`${API_BASE_URL}/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert('Post deleted successfully!');
            loadPosts(); // Reload the posts after deletion
        }
    })
    .catch(error => console.error('Error deleting post:', error));
}

// Fill the hidden ownerId field with the value from localStorage when the page loads
window.addEventListener('load', function () {
    const user = JSON.parse(localStorage.getItem('user')); // Parse user object from localStorage
    if (user) {
        document.getElementById('ownerId').value = user.id; // Set ownerId
       
    }
});


// Handle post form submission to add new post
document.getElementById('postForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Retrieve the user object from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.id || !user.name) {
        alert('Please log in to create a post.');
        return;
    }

    // Create the post object
    const post = {
        ownerId: user.id,
        ownerName: user.name,
        name: document.getElementById('name').value.trim(),
        category: document.getElementById('category').value.trim(),
        location: document.getElementById('location').value.trim(),
        description: document.getElementById('description').value.trim(),
        createdAt: new Date().toISOString() // Add timestamp for sorting
    };
    
    // Validate the form fields
    if (!post.name || !post.category || !post.location || !post.description) {
        alert('Please fill out all required fields.');
        return;
    }

    // Send POST request to API
    fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to create post: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Post created successfully:', data);
        alert('Place successfully registered!');
        loadPosts(); // Reload posts after adding new one
    })
    .catch(error => {
        console.error('Error creating post:', error);
        alert('Failed to create post. Please try again.');
    });

    this.reset(); // Reset the form fields after submission
});

// Initial load of posts when the page loads
document.addEventListener('DOMContentLoaded', loadPosts);

// Filter posts by category
function filterPosts(category) {
    console.log('Filtering posts by category:', category);
    
    // Get all posts from the feed
    const feed = document.getElementById('feed');
    if (!feed) {
        console.error('Feed element not found');
        return;
    }
    
    const posts = feed.querySelectorAll('.post-card');
    console.log('Total posts found:', posts.length);
    
    // Update active button state
    const filterButtons = document.querySelectorAll('.filter-btn');
    console.log('Filter buttons found:', filterButtons.length);
    
    filterButtons.forEach(btn => {
        const btnCategory = btn.getAttribute('data-category');
        console.log('Button category:', btnCategory, 'Selected category:', category);
        if (btnCategory === category) {
            btn.classList.add('active');
            console.log('Added active class to button:', btnCategory);
        } else {
            btn.classList.remove('active');
        }
    });
    
    // If category is 'All Places', show all posts
    if (category === 'All Places') {
        console.log('Showing all posts');
        posts.forEach(post => {
            post.style.display = 'block';
        });
        return;
    }
    
    // Filter posts based on category
    let visibleCount = 0;
    posts.forEach(post => {
        const postCategoryElement = post.querySelector('.post-card-category');
        if (!postCategoryElement) {
            console.error('Post category element not found for post:', post);
            return;
        }
        
        const postCategory = postCategoryElement.textContent;
        console.log('Post category:', postCategory, 'Selected category:', category);
        
        if (postCategory === category) {
            post.style.display = 'block';
            visibleCount++;
        } else {
            post.style.display = 'none';
        }
    });
    
    console.log(`Filtered posts: ${visibleCount} posts visible for category "${category}"`);
}

// Toggle Like/Unlike action for a specific place
function toggleLike(buttonElement) {
    console.log('toggleLike function called');
    
    const place_id = buttonElement.getAttribute('data-place-id');
    console.log('Place ID:', place_id);
    
    const currentUser = JSON.parse(localStorage.getItem('user'));
    console.log('Current User:', currentUser);

    if (!currentUser || !currentUser.id) {
        alert('Please log in to like posts.');
        return;
    }

    const userId = currentUser.id;
    const likeCountElement = buttonElement.querySelector('.like-count');
    const isLiked = buttonElement.classList.contains('liked');
    const currentLikes = parseInt(likeCountElement.textContent) || 0;

    console.log('Toggle Like - Place ID:', place_id);
    console.log('Toggle Like - User ID:', userId);
    console.log('Toggle Like - Current State:', isLiked ? 'Liked' : 'Not Liked');

    const endpoint = `${API_BASE_URL}/${place_id}/like`;
    const requestMethod = isLiked ? 'DELETE' : 'POST';
    const body = JSON.stringify({ userId });

    console.log(`Making ${requestMethod} request to:`, endpoint);
    console.log('Request body:', body);

    fetch(endpoint, {
        method: requestMethod,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        
        // Update UI
        if (requestMethod === 'POST') {
            buttonElement.classList.add('liked');
            likeCountElement.textContent = currentLikes + 1;
            console.log('Post liked successfully');
        } else {
            buttonElement.classList.remove('liked');
            likeCountElement.textContent = Math.max(0, currentLikes - 1);
            console.log('Post unliked successfully');
        }
        
        // Update localStorage
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const postIndex = posts.findIndex(post => post.id === place_id);
        
        if (postIndex !== -1) {
            if (!posts[postIndex].likes) {
                posts[postIndex].likes = [];
            }
            
            if (requestMethod === 'POST') {
                if (!posts[postIndex].likes.includes(userId)) {
                    posts[postIndex].likes.push(userId);
                    console.log('Added like to localStorage');
                }
            } else {
                posts[postIndex].likes = posts[postIndex].likes.filter(id => id !== userId);
                console.log('Removed like from localStorage');
            }
            
            localStorage.setItem('posts', JSON.stringify(posts));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`Failed to ${isLiked ? 'unlike' : 'like'} post. Please try again.`);
    });
}

// Toggle Bookmark action for a specific place
function toggleBookmark(buttonElement) {
    console.log('toggleBookmark function called');
    
    const place_id = buttonElement.getAttribute('data-place-id');
    console.log('Place ID:', place_id);
    
    const currentUser = JSON.parse(localStorage.getItem('user'));
    console.log('Current User:', currentUser);

    if (!currentUser || !currentUser.id) {
        alert('Please log in to bookmark posts.');
        return;
    }

    const userId = currentUser.id;
    const isBookmarked = buttonElement.classList.contains('bookmarked');

    console.log('Toggle Bookmark - Place ID:', place_id);
    console.log('Toggle Bookmark - User ID:', userId);
    console.log('Toggle Bookmark - Current State:', isBookmarked ? 'Bookmarked' : 'Not Bookmarked');

    const endpoint = `${API_BASE_URL}/${place_id}/bookmark`;
    const requestMethod = isBookmarked ? 'DELETE' : 'POST';
    const body = JSON.stringify({ userId });

    console.log(`Making ${requestMethod} request to:`, endpoint);
    console.log('Request body:', body);

    fetch(endpoint, {
        method: requestMethod,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        
        // Update UI
        if (requestMethod === 'POST') {
            buttonElement.classList.add('bookmarked');
            console.log('Post bookmarked successfully');
        } else {
            buttonElement.classList.remove('bookmarked');
            console.log('Post unbookmarked successfully');
        }
        
        // Update localStorage
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const postIndex = posts.findIndex(post => post.id === place_id);
        
        if (postIndex !== -1) {
            if (!posts[postIndex].bookmarks) {
                posts[postIndex].bookmarks = [];
            }
            
            if (requestMethod === 'POST') {
                if (!posts[postIndex].bookmarks.includes(userId)) {
                    posts[postIndex].bookmarks.push(userId);
                    console.log('Added bookmark to localStorage');
                }
            } else {
                posts[postIndex].bookmarks = posts[postIndex].bookmarks.filter(id => id !== userId);
                console.log('Removed bookmark from localStorage');
            }
            
            localStorage.setItem('posts', JSON.stringify(posts));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`Failed to ${isBookmarked ? 'unbookmark' : 'bookmark'} post. Please try again.`);
    });
}

// Handle user logout
function handleLogout() {
    console.log('Logout function called');
    
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser || !currentUser.id) {
        window.location.href = '/index.html';
        return;
    }

    // Clear user data from localStorage
    localStorage.removeItem('user');
    console.log('User logged out, localStorage cleared');
    
    // Redirect to main index page
    window.location.href = '/index.html';
}

// Check authentication for protected routes
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser || !currentUser.id) {
        window.location.href = '/pages/page2/index.html';
        return false;
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function () {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }

    // Function to check if the user is logged in
    function isUserLoggedIn() {
        return localStorage.getItem("user") !== null;
    }

    // Redirect to login page if user is not logged in
    function handleAuthRedirect(targetPage) {
        if (!isUserLoggedIn()) {
            alert("Please login to continue.");
            window.location.href = "../../pages/page2/index.html"; // Redirect to login page
        } else {
            window.location.href = targetPage; // Redirect to the intended page
        }
    }

    // Profile Icon Click - Redirect if logged in, otherwise go to login
    document.querySelector(".profile-icon").addEventListener("click", function () {
        handleAuthRedirect("../../pages/profile/index.html");
    });

    // Post Form Handling
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your post submission logic here
            console.log('Post submitted');
        });
    }

    // Like Button Toggle
    window.toggleLike = function(button) {
        button.classList.toggle('liked');
        const likeCount = button.querySelector('.like-count');
        if (button.classList.contains('liked')) {
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
        } else {
            likeCount.textContent = parseInt(likeCount.textContent) - 1;
        }
    };

    // Bookmark Button Toggle
    window.toggleBookmark = function(button) {
        button.classList.toggle('bookmarked');
    };
});

// Add CSS for liked state
const style = document.createElement('style');
style.textContent = `
    .like-btn.liked {
        color:rgb(168, 168, 168);
    }
    .like-btn.liked i {
        color:rgb(168, 168, 168);
    }
`;
document.head.appendChild(style);

// Initialize event listeners when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Check authentication
    if (!checkAuth()) {
        return;
    }
    
    // Load initial posts
    loadPosts();
    
    // Load leaderboard
    loadLeaderboard();
    
    // Add event listeners for like buttons
    document.querySelectorAll('.like-btn').forEach(button => {
        console.log('Adding event listener to like button:', button);
        button.addEventListener('click', function() {
            console.log('Like button clicked');
            toggleLike(this);
        });
    });
    
    // Add event listeners for bookmark buttons
    document.querySelectorAll('.bookmark-btn').forEach(button => {
        button.addEventListener('click', function() {
            toggleBookmark(this);
        });
    });

    // Add event listener for power button (logout)
    const profileIcon = document.querySelector('.profile-icon');
    if (profileIcon) {
        profileIcon.addEventListener('click', handleLogout);
    }

    // Add event listener for post form submission
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createPost();
        });
    }

    // Add event listener for view top spots button
    const viewTopSpotsBtn = document.querySelector('.view-top-spots-btn');
    if (viewTopSpotsBtn) {
        viewTopSpotsBtn.addEventListener('click', function() {
            if (!checkAuth()) {
                return;
            }
            // Handle view top spots action
            loadLeaderboard();
        });
    }
    
    // Set initial active state for "All Places" button
    const allPlacesButton = document.querySelector('.filter-btn[onclick="filterPosts(\'All Places\')"]');
    if (allPlacesButton) {
        allPlacesButton.classList.add('active');
    }
});
