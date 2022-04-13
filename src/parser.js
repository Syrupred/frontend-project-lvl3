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
    const posts = [...items].map((item) => ({
      title: item.querySelector('title').innerHTML,
      link: item.querySelector('link').innerHTML,
    }));
    output = { fid, posts };
  }

  return output;
};
