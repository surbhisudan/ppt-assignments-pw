import './App.css';

function App() {
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
  return (
    <>
       <div className="container">
        <div className="input-box">
            <input type="text" id="username" placeholder="your username:"/>
            <input type="submit" value="Get Data" id="submit"  onClick={fetchUserData}/>
        </div>
        <div className="img-box">
            <img src="" alt="error"/>
        </div>
        <div className="info">
            <ul>
                <li id="name"><span></span></li>
                <li id="location"><span></span></li>
                <li id="followers"><span></span></li>
                <li id="portfolio"><span></span></li>
                <li id="public"><span></span></li>
                <li id="bio"><span></span></li>
            </ul>
        </div>
    </div>
    </>
  );
}

export default App;