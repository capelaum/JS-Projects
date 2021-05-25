export const UserInterface = {
  postsArea: document.querySelector("#postsArea"),
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
};
