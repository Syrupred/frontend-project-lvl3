import { v4 as uuidv4 } from 'uuid';

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
      const description = item.querySelector('description');
      const obj = {};
      if (title && link && description) {
        obj.title = title.innerHTML;
        obj.link = link.innerHTML;
        obj.description = description.innerHTML;
        obj.id = uuidv4();
        posts.push(obj);
      }
    });
    output = { fid, posts };
  }
  return output;
};
