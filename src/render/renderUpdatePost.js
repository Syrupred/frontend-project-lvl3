const renderUpdatePost = (value, i18nextInstance, state, elements) => {
  const listPosts = document.querySelector('.posts ul');
  value.forEach((obj) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    listPosts.prepend(li);
    const a = document.createElement('a');
    a.innerHTML = obj.title;
    a.setAttribute('href', obj.link);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
    a.classList.add('fw-bold');
    a.setAttribute('data-bs-id', obj.id);
    li.append(a);
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.setAttribute('data-bs-id', obj.id);
    button.innerHTML = i18nextInstance.t('view');
    li.append(button);
    button.addEventListener('click', () => {
      const recipient = obj.id;
      const modalTitle = elements.modal.querySelector('.modal-title');
      const modalBody = elements.modal.querySelector('.modal-body p');
      const buttonLink = elements.modal.querySelector('a');
      modalTitle.innerHTML = obj.title;
      modalBody.innerHTML = obj.description;
      buttonLink.setAttribute('href', obj.link);
      state.postsRead.push(recipient);

      a.classList.add('fw-normal');
      a.classList.remove('fw-bold');
    });
  });
};

export default renderUpdatePost;
