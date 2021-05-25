import { EasyHTTP as http } from "./easyHttp";
import { UserInterface as ui } from "./userInterface";

// Get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

// Add Post Event
ui.postSubmitBtn.addEventListener("click", submitPost);
ui.postsArea.addEventListener("click", deletePost);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitPost() {
  const title = ui.titleInput.value;
  const body = ui.bodyInput.value;

  const postData = {
    title,
    body,
  };

  // Create Post
  http
    .post("http://localhost:3000/posts", postData)
    .then(() => {
      ui.clearFields();
      ui.showAlert("Post added", "alert alert-success");
      getPosts();
    })
    .catch(err => console.log(err));
}

function deletePost(e) {
  e.preventDefault();
  console.log(e.target);

  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;

    if (confirm(`Are you sure you want to delete post ${id}?`)) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert("Post removed", "alert alert-success");
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}