//loader
const mask = document.querySelector('.mask')
const main = document.querySelector('.main')

// window.addEventListener('load', () => {
//     mask.classList.add('hide')
//     setTimeout(() => {
//         mask.remove()
//     }, 400)
// })

// setTimeout(() => {
//     main.classList.remove('hideMain')
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

//slider
$('.slider').slick({
    slidesToShow: 2,
})

//news
const onEntry = (entry) => {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('news__item_visible')
        } else {
            change.target.classList.remove('news__item_visible')
        }
    })
}

const options = {
    threshold: [0.5]
}
const observer = new IntersectionObserver(onEntry, options)
const elements = document.querySelectorAll('.news__item')
for (let elm of elements) {
    observer.observe(elm);
}

//form 
const capitalize = (word) => {
    word = word.toLowerCase()
    const firsLetter = word[0].toUpperCase()
    const otherLetters = word.substring(1)

    return firsLetter + otherLetters
}

const form = document.querySelector('.contact__form')
const nameInput = document.querySelector('.input_name')
const surnameInput = document.querySelector('.input_surname')
const emailInput = document.querySelector('.input_email')
const formButton = document.querySelector('.submitForm')
const nameHelper = document.querySelector('.name-helper')
const surnameHelper = document.querySelector('.surname-helper')
const emailHelper = document.querySelector('.email-helper')

const engRegex = /^[a-zA-Z]+$/
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const showCongratulation = () => {
    
}

formButton.addEventListener('click', (event) => {
    event.preventDefault()
    const name = nameInput.value
    const surname = surnameInput.value
    const email = emailInput.value

    if (engRegex.test(name) && engRegex.test(surname) && emailRegex.test(email)) {

        if(name === 'Sigma') {
            showCongratulation()
        }

        localStorage.setItem('name', capitalize(name))
        localStorage.setItem('surname', capitalize(surname))
        localStorage.setItem('email', email)
        form.reset()
    }

    if (!engRegex.test(name)) {
        nameInput.classList.add('input_error')
        nameHelper.classList.add('show-helper')
    } else {
        nameInput.classList.remove('input_error')
        nameHelper.classList.remove('show-helper')
    }

    if (!engRegex.test(surname)) {
        surnameInput.classList.add('input_error')
        surnameHelper.classList.add('show-helper')
    } else {
        surnameInput.classList.remove('input_error')
        surnameHelper.classList.remove('show-helper')
    }

    if (!emailRegex.test(email)) {
        emailInput.classList.add('input_error')
        emailHelper.classList.add('show-helper')
    } else {
        emailInput.classList.remove('input_error')
        emailHelper.classList.remove('show-helper')
    }
})
