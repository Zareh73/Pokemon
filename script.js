const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 10;
let offset = 0;
let idx = 1;

async function getPosts(){
const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
const data = await res.json()
console.log(data)
return data.results;
// .then(data => {
//     data.forEach(post => {
//         const postEl = document.createElement('div');
        // postEl.classList.add('post');
        // postEl.innerHTML = `
        //   <div class="number">${post.id}</div>
        //   <div class="post-info">
        //     <h2 class="post-title">${post.title}</h2>
        //     <p class="post-body">${post.body}</p>
        //   </div>
        // `;
//         postsContainer.appendChild(postEl);
//       });
// })
}

async function showPosts(){
  const data = await getPosts()
  data.forEach(post => {
    const el = document.createElement('div')
    el.classList.add('post');
        el.innerHTML = `
          <div class="number">${idx}</div>
          <div class="post-info">
            <h2 class="post-title">${post.name}</h2>
            <p class="post-body">${post.url}</p>
          </div>
        `;
        idx++
        postsContainer.appendChild(el)
  })

}

function showLoading(){
  setTimeout(() =>{
    loading.classList.remove('show');

  setTimeout(() => {
    offset += 5;
    showPosts();
  }, 300);
  }, 1000);
  
}

showPosts()

window.addEventListener('scroll', () => {
  const {
    scrollTop,
    scrollHeight,
    clientHeight
} = document.documentElement;

  if(scrollTop + clientHeight >= scrollHeight){
    showLoading()
  }
})



