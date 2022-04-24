export default (response) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(response, 'application/xml');
  const errorNode = doc.querySelector('parsererror');
  if (errorNode) {
    throw new Error('invalidRss');
  } else {
    const channel = doc.querySelector('channel');
    const fid = {
      title: channel.querySelector('title').textContent,
      description: channel.querySelector('description').textContent,
    };
    const items = channel.querySelectorAll('item');
    const posts = [];
    [...items].forEach((item) => {
      const title = item.querySelector('title');
      const link = item.querySelector('link');
      const description = item.querySelector('description');
      const post = {};
      if (title && link && description) {
        post.title = title.textContent;
        post.link = link.textContent;
        post.description = description.textContent;
        posts.push(post);
      }
    });
    return { fid, posts };
  }
};
