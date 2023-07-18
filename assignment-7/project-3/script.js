(function() {
    async function fetchUserData() {
        let search = document.getElementById("username").value.split(" ").join("");
        let url = "https://api.github.com/users/";

        try {
            let response = await fetch(url + search);
            let data = await response.json();

            // Access the desired properties from the data object
            let name = data.name;
            let location = data.location || "Data not available";
            let followers = data.followers || "Data not avilable";
            let portfolio = data.blog || "Data not available";
            let publicRepos = data.public_repos || "Data not available";
            let bio = data.bio || "Data not available";
            let avatarUrl = data.avatar_url;


            // Update the content of the list items
            let nameSpan = document.getElementById("name").querySelector("span");
            nameSpan.textContent = `Name: ${name}`;
            let locationSpan = document.getElementById("location").querySelector("span");
            locationSpan.textContent = `Location: ${location}`;
            let followersSpan = document.getElementById("followers").querySelector("span");
            followersSpan.textContent = `Followers: ${followers}`;
            let portfolioSpan = document.getElementById("portfolio").querySelector("span");
            portfolioSpan.textContent = `Portfolio: ${portfolio}`;
            let publicSpan = document.getElementById("public").querySelector("span");
            publicSpan.textContent = `Public_repo: ${publicRepos}`;
            let bioSpan = document.getElementById("bio").querySelector("span");
            bioSpan.textContent = `Bio: ${bio}`;

            let avatarImage = document.querySelector('.img-box img');
            avatarImage.src = avatarUrl;
            avatarImage.alt = name;
        } catch (error) {
            console.error(error);
        }
    }

    document.getElementById("submit").addEventListener("click", fetchUserData);
})();