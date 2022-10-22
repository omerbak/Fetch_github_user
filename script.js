// Main variables

const reposForm = document.querySelector(".get-repos");
const showData = document.querySelector(".show-data");
const warning = document.querySelector(".warning")

//submit form fonction
reposForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = reposForm.username.value;
    reposForm.username.value = "";
    if(username !== ""){
        console.log(username);
        getRepos(username); 
    }
    
})

// Get repos function

function getRepos(username){
    fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(user => {
        if(user.message === 'Not Found'){
            warning.textContent = "User is not found";

        } else{
            console.log(user);
            console.log(user.followers);

            warning.textContent = "";

            /* Get user info */

            const resultContainer = document.querySelector(".result-container");
            resultContainer.innerHTML = "";

            let info = `<div class="show-data">
            <div class="user-image">
                <img  src=${user.avatar_url} width="100px" height="100px" alt="profile pic">
            </div>
            <div class="user-info">
                <div class="name-date">
                    <h2 class="username">${user.login}</h2>
                    <p class="userDate">Joined ${new Date(user.created_at).toLocaleDateString()}</p>
                </div>
                <p class="user-bio">${user.bio || "Bio Is Not Available"}</p>
                <div class="user-repos-stats">
                    <div class="stat-item">
                        <h3>Repos</h3>
                        <p>${user.public_repos}</p>
                    </div>
                    <div class="stat-item">
                        <h3>Followers</h3>
                        <p>${user.followers}</p>
                    </div>
                    <div class="stat-item">
                        <h3>Following</h3>
                        <p>${user.following}</p>
                    </div>
                </div>
                <div class="user-social">
                    <div class="item">
                        <i class="fa-solid fa-location-dot"></i>
                        <p>${user.location || "Not Available"}</p>
                    </div>
                    <div class="item">
                        <i class="fa-brands fa-twitter"></i>
                        <p>${user.twitter_username|| "Not Available"}</p>
                    </div>
                    <div class="item">
                        <i class="fa-solid fa-link"></i>
                        <a href=${user.html_url} target=”_blank” >Github Adress</a>
                    </div>
                </div>
            </div>
        </div>`
        resultContainer.innerHTML = info;

        /* Get user repos */
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let userRepos = `<div class="repos-box">
                                <button class="toggle-repos"><span>See Repos</span><i class="fa-solid fa-arrow-down"></i></button>
                                <div class="repos-container">
                                </div>
                            </div>`;
            resultContainer.innerHTML += userRepos; 
            const reposContainer = document.querySelector(".repos-container");

            data.forEach(repo =>{
             let item = `<div class="repo-box">
                            <p class="repo-name">${repo.name}</p>
                            <span class="stars-number">${repo.watchers_count}⭐</span>
                            <a href=${repo.html_url} target="_blank" >Visit</a>
                        </div>`
            reposContainer.innerHTML += item;            
            }) ;
            
            console.log(userRepos)
            /* toggle reops on click */
            const toggleRepos = document.querySelector(".toggle-repos");
            toggleRepos.addEventListener("click", (e) => {
                toggleRepos.parentElement.classList.toggle("open");
            })
        })
        }
        
    })
    .catch((error) => {
        warning.textContent = error.message;
    })
}

/* Apply the dark mode and light mode */
let darkMode = true;

const darkModeToggle = document.querySelector(".dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {

    const circle = document.querySelector(".dark-mode-toggle span");
    circle.classList.toggle("clicked");
    darkMode = ! darkMode;
    if(!darkMode){
        document.documentElement.setAttribute("data-theme", "light");

    } else {
        document.documentElement.setAttribute("data-theme", "dark");
    }
})






/* function getRepos(username){
    
    if(username == ""){ //if value is empty
        
        showData.innerHTML = "<span>Please Write Github Username</span>"

    }else{



         fetch(`https://api.github.com/users/${theInput.value}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //empty data container
            showData.innerHTML ="";
            console.log(data)
            //Lopp over data
            data.forEach(repo => {
                
                // Create main dev element
                let mainDiv = document.createElement("div");

                // Create repo name text
                let repoName = document.createTextNode(repo.name)
                mainDiv.appendChild(repoName);

                // Create repo url
                let url =  document.createElement("a");
                // Create repos url text
                let urlText = document.createTextNode("Visit");
                // Append the repo url text 
                url.appendChild(urlText);
                //add href
                url.href = `https://github.com/${theInput.value}/${repo.name}`;

                // Set attribute _blank
                url.setAttribute("target", "_blank"); 

                // Creat span for repo stars
                let stars = document.createElement("span");
                stars.appendChild(document.createTextNode(`Stars: ${repo.stargazers_count}`))

                //Add class on main div
                mainDiv.setAttribute("class", "repo-box");

                // Append url to main div
                mainDiv.appendChild(url);
                mainDiv.appendChild(stars);
                showData.appendChild(mainDiv);
            })
        })
        
    } 

} */