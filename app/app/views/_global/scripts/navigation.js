const pages = [...document.querySelectorAll('iframe.page')];
const links = [...document.querySelectorAll('li.link')];

links.forEach(link => {
  link.addEventListener('click', () => {
    pages.forEach(page => page.classList.remove('active'));
    links.forEach(linkB => linkB.classList.remove('active'));
    document.getElementById(`${link.dataset.link}-page`).classList.add('active');
    link.classList.add('active');
  });
});
