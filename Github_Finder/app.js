// Init Github Class
const github = new Github;

// Init UI class
const ui = new UI;

// Search input
const searchUse = document.getElementById('searchUser');

// Search input event listener
searchUser.addEventListener('keyup', (e) => {

  // Get input text
  const userText = e.target.value;

  if(userText !== '') {
    
    // Make http call 
    github.getUser(userText).then(data => {
      
      if(data.profile.message === 'Not Found') {

        // Show alert
        ui.showAlert('User not Found', 'alert alert-danger');

      } else {

        // Show Profile   
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }

    });
  } else {

    // Clear profile 
    ui.clearProfile();

  }
});