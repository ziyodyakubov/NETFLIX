"use strict";
movies.splice(70);

let category = [];
let categoryOption = $('#category');
let filmname = $('#name')
let filmrating = $('#rating')
let cardWrapper = $('.cardWrapper');
let searchWrapper = $('.search');
let searchBtn = $('.searchBtn');
let loader = $('.loader');
let formAside = $('#formAside');



// NORMALIZE DATA STARTED

const allMovies = movies.map((el)=>{
        return{
        title:el.title,
        year:el.year,
        category:el.categories,
        id:el.imdbId,
        rating:`${Math.trunc(el.runtime/60)}:${Math.trunc(el.runtime%60)}:${Math.trunc(el.runtime/100)}`,
        time: el.runtime,
        language:el.language,
        youtube:`https://www.youtube.com/embed/${el.youtubeId}`,
        summary:el.summary,
        minImage: el.smallThumbnail,
        maxImage:el.bigThumbnail

    }
})
console.log(allMovies);

// NORMALIZE DATA ENDED






// GET CATEGORY STARTED

function getCategory(moviesList){
    if (moviesList.length) {
        moviesList.forEach((el) => {
           el.category.forEach((e)=> {
            if(!category.includes(e)){
                category.push(e)
            }
           }) 
        });
    }

    render(category)
}

getCategory(allMovies);

// GET CATEGORY ENDED





// RENDER DATA STARTED

function render(data){
if(data.length){
    data.sort().forEach((el)=>{
      
        const option = createElement('option','option_class',el)

        categoryOption.appendChild(option);

    })
}
}

// RENDER DATA ENDED



// CREATA A CARD WITH DATA STARTED

function renderMovies(moviesList){
    if(moviesList.length){
        moviesList.forEach((el)=>{
            const card = createElement('div', 'card', `
            
            <img src="${el.minImage}" alt="smth">
            <div class="card-body h-[310px]">
                <h2>${el.title.length > 26 ? el.title.substring(0,23)+"..." : el.title}</h2>
                <ul>
                    <li><strong>Year:</strong> ${el.year}</li>
                    <li><strong>Categories:</strong>${el.category}</li>
                    <li><strong>Rating:</strong>${el.rating}</li>
                    <li><strong>Language:</strong>${el.language}</li>
                </ul>

                <div class="flex btn-wrappeer items-center gap-x-3">
                   
                    <button 
                        data-like=${el.id}
                        class="grid hover:bg-red-700 hover:text-white duration-500 text-red-700 place-content-center p-4 border w-12 h-12 rounded-full">
                        <i class="bi bi-suit-heart-fill "></i>
                    </button>

                    <a href="${el.youtube}" target="_blank" class="flex hover:bg-black hover:text-white duration-500  justify-center gap-x-2 text-xl items-center border min-w-24 px-3 h-12 rounded-full"> 
                        <i class="bi bi-play-circle-fill"></i>
                        <span>watch movie</span>
                    </a>
                </div>

            </div>`
            )
            cardWrapper.appendChild(card);

        })
    }
}

renderMovies(allMovies)

// CREATA A CARD WITH DATA ENDED




// SEARCH PROCESSING STARTED

function SearchMovies(searchTerm){
    const SearchResult = allMovies.filter((el)=> el.title.toLowerCase().includes(searchTerm.toLowerCase()));
    cardWrapper.innerHTML = '';
    console.log(SearchResult);

    if(SearchResult.length){
        renderMovies(SearchResult);
    }else{
        cardWrapper.innerHTML = '<h1 class="found">NOT FOUND</h1>'
    }

}

searchBtn.addEventListener('keyup',(e)=>{
    cardWrapper.innerHTML ='<h1 class="text-center relative left-[600px] text-red-700 font-[1000] text-2xl">LOADING...</h1>';
    setTimeout(()=>{
        SearchMovies(e.target.value)
    },500)
})

// SEARCH PROCESSING ENDED





// DARK-MODE STARTED

let switchBtn = $('#switch');
let body2 = $('body');
let header2 = $('header');
let aside2 = $('#aside');
let inputs = $('input');
let selects = $('select');
let options = $('option');
let names = $('.name');
let names2 = $('.name-2');

function darkmode(){
    body2.classList.toggle('dark-mode');
    header2.classList.toggle('dark-mode');
    aside2.classList.toggle('dark-mode');
    inputs.classList.toggle('dark-mode');
    selects.classList.toggle('dark-mode');
    options.classList.toggle('dark-mode');
    names.classList.toggle('dark-mode');
    names2.classList.toggle('dark-mode');
    searchWrapper.classList.toggle('dark-mode');
}

switchBtn.addEventListener('click',()=>{
    darkmode()
})

// DARK-MODE ENDED





// MULTI SEARCH STARTED

function multiSearch(){
    let filmName = filmname.value;
    let filmRating = filmrating.value;
    let filmCategory = categoryOption.value;
    console.log(filmName);


    const SearchResult = allMovies.filter((el)=> {
        return el.title.toLowerCase().includes(filmName.toLowerCase()) && el.category.includes(filmCategory) && el.rating >= filmRating
})
    cardWrapper.innerHTML = '';
    console.log(SearchResult);

    if(SearchResult.length){
        renderMovies(SearchResult);
    }else{
        cardWrapper.innerHTML = '<h1 class="found">NOT FOUND</h1>'
    }
}

formAside.addEventListener('submit',(e)=>{
    cardWrapper.innerHTML ='<h1 class="text-center relative left-[600px] text-red-700 font-[1000] text-2xl">LOADING...</h1>';
    e.preventDefault()
    setTimeout(()=>{
        multiSearch()
    },500)
})

// MULTI SEARCH ENDED