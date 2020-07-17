class UI {

  constructor() {
    this.profile = document.getElementById('profile');
  }

  showProfile(user) {
    
    // show user Profile
    this.profile.innerHTML = `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <h2>${user.name}</h2>
            <h3>${user.login}</h3>
            <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-2">View Profile</a>

          </div>
          <div class="col-md-9">
            <span class="badge badge-primary p-md-2">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-secondary p-md-2">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-success p-md-2">Followers: ${user.followers}</span>
            <span class="badge badge-primary p-md-2">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div id="repos"></div>
    `;
  }

  // Show user repos 
  showRepos(repos) {

    let output = '';

    repos.forEach(function(repo) {
      output += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
              <span class="badge badge-primary p-md-2">Stars: ${repo.stargazers_count}</span>
              <span class="badge badge-secondary p-md-2">Watchers: ${repo.watchers_count}</span>
              <span class="badge badge-success p-md-2">Forks: ${repo.forks_count}</span>
            </div>
          </div>
        </div>
      `;
    });

    // Output repos
    document.getElementById('repos').innerHTML = output;

  }

  // If user searched is not found 
  showAlert(message, className) {

    // Clear any remaining alerts
    this.clearAlert();

    const div = document.createElement('div');
    div.className = className;

    // Add text to
    div.appendChild(document.createTextNode(message));

    // Get Parent to insert
    const container = document.querySelector('.searchContainer');

    // get search Box
    const search = document.querySelector('.search');

    // Insert the alert 
    container.insertBefore(div, search);

    // Timeout after alert is shown
    setTimeout(() => {
      this.clearAlert();
    }, 3000)

  }

  // Clear alert message
  clearAlert() {

    const currentAlert = document.querySelector('.alert');

    if(currentAlert) {
      currentAlert.remove();
    }
  }

  // clear Profile 
  clearProfile() {
    this.profile.innerHTML = '';
  }
}