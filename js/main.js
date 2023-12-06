import {keys} from "./keys.js";

const getNowPlaying = async () => {
    const url   = `https://api.themoviedb.org/3/movie/now_playing`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2NkYjkzYzRiYzY2YjlhMGM3MDliMWYwNjkxYTlmMSIsInN1YiI6IjY1NmEyYjdkODg2MzQ4MDE0ZDgzNWZmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3OOIJaTAwiHJ7CqrRLB5lL6WNr--SMu-unmiX451PeM'
            }
    };
    const response = await fetch(url, options)
    const data = await response.json();
    return data;
}
const renderNowPlaying = async ()=> {
    const nowPlaying = await getNowPlaying()
    console.log(nowPlaying)
    for(let i = 0; i < 20; i++) {
        const nowplaying =document.querySelector('#nowplaying')
        const playingNow = document.createElement('div')
        playingNow.classList.add(`movie`)
        playingNow.innerHTML = `
    <p>${nowPlaying.results[i].title}</p>
    <p>${nowPlaying.results[i].overview}</P>
    <p>${nowPlaying.results[i].vote_average}</p>
    <button class="addBtn">Add</button>
    `
        nowplaying.appendChild(playingNow)
        const addBtn = nowplaying.querySelector('.addBtn')
        addBtn.addEventListener('click',async () => {
            const title = `${nowPlaying.results[i].title}`
            const summary = `${nowPlaying.results[i].overview}`
            const rating = `${nowPlaying.results[i].vote_average}`
            const newMovie = {
                title,
                summary,
                rating
            }
            const body = JSON.stringify(newMovie)
            const url =`http://localhost:3000/movies`
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            }
            favMovieDiv.innerHTML=``
            renderFavMov();
            const response = await fetch(url, options)
            const data = await response.json();
            return data;

        })
    }
}
const getPopular = async () => {
    const url   = `https://api.themoviedb.org/3/movie/popular`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2NkYjkzYzRiYzY2YjlhMGM3MDliMWYwNjkxYTlmMSIsInN1YiI6IjY1NmEyYjdkODg2MzQ4MDE0ZDgzNWZmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3OOIJaTAwiHJ7CqrRLB5lL6WNr--SMu-unmiX451PeM'
        }
    };
    const response = await fetch(url, options)
    const data = await response.json();
    return data;
}
const renderPopular = async ()=> {
    const popularMovies = await getPopular()
    for(let i = 0; i < 20; i++) {
        const popular =document.querySelector('#popular')
        const popularMov = document.createElement('div')
        popularMov.classList.add(`movie`)
        popularMov.innerHTML = `
    <p>${popularMovies.results[i].title}
    <p>${popularMovies.results[i].overview}
    <p>${popularMovies.results[i].vote_average}</p>
    <button>Add</button>
    `
        popular.appendChild(popularMov)
    }
}

const add = document.querySelector('#add')
add.addEventListener('click',async ()=>{
    const title = document.querySelector('#title').value
    const summary = document.querySelector('#summary').value
    const rating = document.querySelector('#rating').value
    const newMovie = {
        title,
        summary,
        rating
    }
    const body = JSON.stringify(newMovie)
    const url =`http://localhost:3000/movies`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    }
    favMovieDiv.innerHTML=``
    renderFavMov();
    const response = await fetch(url, options)
    const data = await response.json();
    return data;
})

const favMov = async () => {
    const url   = `http://localhost:3000/movies`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2NkYjkzYzRiYzY2YjlhMGM3MDliMWYwNjkxYTlmMSIsInN1YiI6IjY1NmEyYjdkODg2MzQ4MDE0ZDgzNWZmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3OOIJaTAwiHJ7CqrRLB5lL6WNr--SMu-unmiX451PeM'
        }
    };
    const response = await fetch(url, options)
    const data = await response.json();
    return data;
}
const favMovieDiv = document.querySelector('#favorite')

const renderFavMov = async ()=> {
    const favorMovies = await favMov()
    for(let i = 0; i < favorMovies.length; i++) {
        const favoriteMovie = document.createElement('div')
        favoriteMovie.classList.add('favMovie')
        favoriteMovie.innerHTML = `
    <p>${favorMovies[i].title}</P>
    <p>${favorMovies[i].summary}</p>
    <P contenteditable="true">${favorMovies[i].rating}</P>
    <button class="edit">Update</button>
    <button class="delete">Delete</button>
    `
        favMovieDiv.appendChild(favoriteMovie)
        const deleteBtn = favoriteMovie.querySelector('.delete')
        deleteBtn.addEventListener('click',async ()=>{
            await deleteMovie(favorMovies[i].id);
            favoriteMovie.remove();
        })
        const editBtn = favoriteMovie.querySelector('.edit')
        editBtn.addEventListener('click',async ()=> {
            await patchMovie(favorMovies[i]);
            favMovieDiv.innerHTML=``
            renderFavMov();
        })
    }
}

const patchMovie = async (movie) => {
    const title = document.querySelector('#usertitle').value
    const summary = document.querySelector('#usersummary').value
    const rating = document.querySelector('#userrating').value
    const newMovie = {
        title,
        summary,
        rating
    }
    const body = JSON.stringify(newMovie)
    const url =`http://localhost:3000/movies/${movie.id}`
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    }
    const response = await fetch(url, options)
    const data = await response.json();
    return data;
}

const deleteMovie = async (id) => {
    const url =`http://localhost:3000/movies/${id}`
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await fetch(url, options)
    const data = await response.json();
    return data;
}


(async ()=>{
    renderNowPlaying();
    renderPopular();
    renderFavMov();
    const addMovie = document.querySelector('.addMovie')
    const showNew = document.querySelector('.new')
    addMovie.addEventListener('click',()=>{
        showNew.classList.toggle('open')
    })
   const updateBtn = document.querySelector('.update')
    const editNew = document.querySelector('.user')
    updateBtn.addEventListener('click',()=>{
        editNew.classList.toggle('new')
    })

})()