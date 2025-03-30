
<div align="center">
  <a href="https://github.com/Hermayni/AWD-Xplora-Fuecoco">
    <img src="Untitled design (6).png" alt="Xplora" width="330" height="300">
  </a>
  <h3 align="center" style="font-size: 25px;">Urban Explorer: Xplora</h3>
</div>

## Persona
<br>

**Name:** Xplora <br>
**Age:** 28 years old <br>
**Background:** <br>
- An urban professional passionate about discovering new neighborhoods, hidden cafes, and local events.

**Key Characteristics:** 
- Adventurous 
- Spontaneous
- Curious
- Passionate


## UX Flow
<ol>
<li> User Authentication</li>

- **Login/Registration:** Secure sign-in via Authentication.
- **Welcome/Tutorial:** Quick onboarding to highlight app features.

<li> Landing Page:</li>

- **Xplora's hot spots:** Highlights popular places to the people right now.
- **Navigation Menu:**  Quick links to business, *tambayan*, and tourists spots
- **Search Bar:** Users could search places that other users have posted.

<li> Posts Interaction:
</li> 

- **Upvoting and Downvoting of posts:** Users can rate whether the place is a good spot or not.
- **User Rating:** Users can rank other users as to how trustable they are.

<li>Community Engagement:</li>

- **Forum:** Browse and participate in discussion threads.

</ol>

## Layout and Navigation

 <li> Navigation Bar

 - **Home:** Featured Hot spots recommended by Xplora.
 - **Submit Posts:** The users can submit posts.
 - **About us:** Learn more abou the developers
 - **Community:** Explore other user's posts
</li>

<li>
Screen Layout

- **Home Screen:**  Card-based layout with project previews, images, and brief descriptions.
- **Submitted Posts SCreen:**  Scrollable view with images, text, and interactive review submission.
- **Submission Screen:** Form layout with input fields, image uploader, and submit button.
- **Community Screen:** List of threads with new post button and sorting/filter options.
</li>
 

 ## Color Scheme and Visual Style
 <li>
Primary Colors:

- **Deep Charcoal:**  Creates a modern and sleek background.
- **Electric Blue:** Adds vibrancy and highlights interactive elements.
</li>

<li>
Accent Colors:

- **Soft White:** Ensures readability and provides contrast against darker backgrounds.
- **Muted Gray:** Used for subtle UI elements and text for a balanced look.

</li>

<li>
Visual Style:

- **Modern and Minimalist:** Emphasizes a clean, streamlined layout with a focus on functionality.
- **Bold Typography:** Uses large, clear fonts for easy navigation and readability.
- **Intuitive Navigation:** Simple and accessible design that enhances user experience through clear pathways and calls to action.
</li>   

## Entity Relational Database (ERD)
Key Entitites: 

1. **User**
   - `user_id` (Primary Key)
   - `name`

   - `email`

   - `password_hash`

   - `profile_image_url`

   - `date_joined`


##  Dataflow

1. **User Authentication & Registration:**
   - **Authentication** is used to create new users or sign in existing ones.
   - **Dataflow:** User credentials → Firebase Auth → Secure session token.