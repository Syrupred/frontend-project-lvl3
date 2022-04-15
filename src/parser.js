export default (response) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(response, 'application/xml');
  const errorNode = doc.querySelector('parsererror');
  let output;
  if (errorNode) {
    output = 'errorNode';
  } else {
    const channel = doc.querySelector('channel');
    const fid = {
      title: channel.querySelector('title').innerHTML,
      description: channel.querySelector('description').innerHTML,
    };
    const items = channel.querySelectorAll('item');
    const posts = [];
    [...items].forEach((item) => {
      const title = item.querySelector('title');
      const link = item.querySelector('link');
      const obj = {};
      if (title && link) {
        obj.title = title.innerHTML;
        obj.link = link.innerHTML;
        posts.push(obj);
      }
    });
    output = { fid, posts };
  }
  return output;
};
