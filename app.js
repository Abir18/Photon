const auth = '563492ad6f91700001000001a5608eacac434ce99152fb9f46bcb4e2';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
// const submitButton = document.querySelector('.submit-btn');
const more = document.querySelector('.more');
let searchValue;
let page = 1;
let fetchLink;

searchInput.addEventListener('input', e => {
  searchValue = e.target.value;
});

form.addEventListener('submit', e => {
  e.preventDefault();
  searchPhotos(searchValue);
});

more.addEventListener('click', loadMore);

// submitButton.addEventListener('click', e => {
//   e.preventDefault();
//   searchPhotos(searchValue);
// });

const fetchApi = async url => {
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth
    }
  });
  const data = await dataFetch.json();
  return data;
};

function generatePictures(data) {
  data.photos.forEach(photo => {
    // console.log(photo);
    const galleryImage = document.createElement('div');
    galleryImage.classList.add('gallery-img');
    galleryImage.innerHTML = `
        <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original} target="_blank">Download</a>
        </div>
        <img src=${photo.src.large}></img>`;

    gallery.appendChild(galleryImage);
  });
}

async function curatedPhotos() {
  fetchLink = 'https://api.pexels.com/v1/curated?per_page=15';
  const data = await fetchApi(fetchLink);

  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);

  generatePictures(data);
}

function clear() {
  gallery.innerHTML = '';
  // searchInput.value = '';
}

// const loadMore = () => {
//   console.log('async');
// };

async function loadMore() {
  page++;
  if (searchValue) {
    fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();
