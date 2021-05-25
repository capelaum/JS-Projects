export const UserInterface = {
  container: document.querySelector(".postsContainer"),
  postsArea: document.querySelector("#postsArea"),
  cardForm: document.querySelector(".card-form"),
  formEnd: document.querySelector(".form-end"),

  titleInput: document.querySelector("#title"),
  bodyInput: document.querySelector("#body"),
  hiddenInput: document.querySelector("#hidden"),
  postSubmitBtn: document.querySelector(".post-submit"),
  forState: "add",

  showPosts(posts) {
    let output = "";

    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
    });

    postsArea.innerHTML = output;
  },

  fillForm(post) {
    UserInterface.titleInput.value = post.title;
    UserInterface.bodyInput.value = post.body;
    UserInterface.hiddenInput.value = post.id;

    UserInterface.changeFormState("edit");
  },

  changeFormState(type) {
    
    if (type === "edit") {
      UserInterface.postSubmitBtn.textContent = "Update Post";
      UserInterface.postSubmitBtn.className =
        "post-submit btn btn-warning btn-block";

      // Create cancel edit state button
      const cancelButton = document.createElement("button");
      cancelButton.className = "post-cancel btn btn-danger btn-block mt-2";
      cancelButton.appendChild(document.createTextNode("Cancel Edit"));

      // Insert Before form end
      UserInterface.cardForm.insertBefore(cancelButton, UserInterface.formEnd);
    }

    if (type !== "edit") {
      UserInterface.postSubmitBtn.textContent = "Post it";
      UserInterface.postSubmitBtn.className =
        "post-submit btn btn-primary btn-block";

      // remove Cancel Button if it's there
      if(document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }

      // reset
      UserInterface.hiddenInput.value = "";
      UserInterface.clearFields();
    }
  },

  showAlert(message, className) {
    UserInterface.clearAlert();

    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(message));

    // Insert in DOM
    UserInterface.container.insertBefore(div, postsArea);

    setTimeout(() => {
      UserInterface.clearAlert();
    }, 3000);
  },

  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) currentAlert.remove();
  },

  clearFields() {
    UserInterface.titleInput.value = "";
    UserInterface.bodyInput.value = "";
  },
};
