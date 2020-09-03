const posts = [
  {
    id: 1,
    author_name: "Williams",
    author_email: "williams@gmail.com",
    body:
      "First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words per minute and your writing skills are sharp. From the seed of the idea to finally hitting “Publish,” you might spend several days or maybe even a week “writing” a blog post, but it’s important to spend those vital hours planning your post and even thinking about your post (yes, thinking counts as working if you’re a blogger) before you actually write it.",
  },
  {
    id: 2,
    author_name: "Theresa",
    author_email: "theresa@gmail.com",
    body:
      "Great blog posts don’t just happen. Even the best bloggers need a rough idea to keep them on-track. This is where outlines come in An outline doesn’t need to be lengthy, or even detailed – it’s just a rough guide to make sure you don’t ramble on and on about something tangential to your topic",
  },
];

export function getPosts() {
  return posts;
}

export function getPost(id) {
  return posts.find((p) => p.id === id);
}

export function savePost(post) {
  let postInDb = posts.find((p) => p.id === post.id) || {};
  postInDb.author_name = post.author_name;
  postInDb.author_email = post.author_email;
  postInDb.body = post.body;

  if (!postInDb.id) {
    postInDb.id = posts.length + 1;
    posts.push(postInDb);
  }

  return posts;
}

export function deletePost(post) {
  let postToDelete = posts.find((p) => p.id === post.id);
  posts.splice(posts.indexOf(postToDelete), 1);
  return postToDelete;
}
