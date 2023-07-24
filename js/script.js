//loader
const mask = document.querySelector('.mask')

// window.addEventListener('load', () => {
//     mask.classList.add('hide')
//     setTimeout(() => {
//         mask.remove()
//     }, 400)
// })

// setTimeout(() => {
//     mask.classList.add('hide')
//     setTimeout(() => {
//         mask.remove()
//     }, 400)
// }, 5000)

//progress bar
const progress = document.querySelector(".progress");

const progressBar = () => {
    let windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let per = windowScroll / windowHeight * 100;
    progress.style.width = per + "%";
}

window.addEventListener("scroll", progressBar);

//service
const filterButtons = document.querySelectorAll('.filter__button')
const serviceFilter = document.querySelector('.service__filter')
const servicePosts = document.querySelector('.service__posts')

const getAllPosts = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts')
    return data
}

const getPostsFromUser = async (id) => {
    const data = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    return data
}

const getLastPosts = () => {
    getAllPosts().then(posts => posts.json()).then(posts => {
        for (let i = 1; i <= 3; i++) {
            let post = posts.findLast(post => post.userId = i)
            servicePosts.innerHTML += generatePost(post.title, post.body)
        }
    }).catch((error) => console.log(error))
}

const generatePost = (title, text) => {
    return `
    <div class="service__post">
        <h3 class="service__post__title">${title}</h3>
        <div class="service__post__text">${text}</div>
    </div>
    `
}

getLastPosts()

serviceFilter.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        servicePosts.innerHTML = ''
        if (event.target.classList.contains('filter__button_active') && event.target.dataset.id !== 'all') {
            getLastPosts()
            event.target.classList.remove('filter__button_active')
            filterButtons[0].classList.add('filter__button_active')
        } else {
            filterButtons.forEach((button) => {
                button.classList.remove('filter__button_active')
            })

            if (event.target.dataset.id !== 'all') {
                getPostsFromUser(event.target.dataset.id).then(posts => posts.json()).then(posts => {
                    for (let i = 0; i < 5; i++) {
                        servicePosts.innerHTML += generatePost(posts[i].title, posts[i].body)
                    }
                }).catch((error) => console.log(error))
            } else {
                getLastPosts()
            }
            event.target.classList.add('filter__button_active')
        }
    }
})

