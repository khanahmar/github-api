const APIURL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);
    creatUserCard(data);
    getRepos(username);
  } catch (err) {
    if (err.response.status == 404) {
      creatErrorCard("No profile with this name");
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios(APIURL + username + "/repos?sort=created");
    addReposCard(data);
  } catch (err) {
    creatErrorCard("Problem fetching reps");
  }
}

function creatUserCard(user) {
  const cardHtml = `<div class="card">
    <div>
      <img
        class="avatar"
        src="${user.avatar_url}"
        alt="${user.username}"
      />
    </div>
    <div class="user-info">
      <h2>${user.name}</h2>
      <p>
        ${user.bio}
      </p>
      <ul>
        <li class="li">${user.followers}<strong>Follower</strong></li>
        <li class="li">${user.following}<strong>Following</strong></li>
        <li class="li">${user.public_repos}<strong>Repos</strong></li>
      </ul>
      <div id="repos">
      </div>
    </div>
  </div>`;
  main.innerHTML = cardHtml;
}

function addReposCard(repos) {
  const reposEl = document.getElementById("repos");
  repos.slice(0, 10).forEach((item) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = item.html_url;
    repoEl.target = "_blank";
    repoEl.innerHTML = item.name;

    reposEl.appendChild(repoEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});

function creatErrorCard(msg) {
  const cardHtml = `
    <div class="card">
    <h1>${msg}</h1>
  </div>
    `;
  main.innerHTML = cardHtml;
}
