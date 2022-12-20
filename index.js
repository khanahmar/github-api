const APIURL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);
    creatUserCard(data);
  } catch (err) {
    if (err.response.status == 404) {
      creatErrorCard("No profile with this name");
    }
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
        <a href="#" class="repo">repo1</a>
        <a href="#" class="repo">repo2</a>
        <a href="#" class="repo">repo3</a>
      </div>
    </div>
  </div>`;
  main.innerHTML = cardHtml;
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
