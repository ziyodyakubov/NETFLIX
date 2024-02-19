"use strict";
movies.splice(100);

let category = [];
let categoryOption = $('#category');
let cardWrapper = $('.cardWrapper');
let searchWrapper = $('.search');
let searchBtn = $('.searchBtn');



// NORMALIZE DATA STARTED
const allMovies = movies.map((el)=>{
        return{
        title:el.title,
        year:el.year,
        category:el.categories,
        id:el.imdbId,
        reting:`${Math.trunc(el.runtime/60)}:${Math.trunc(el.runtime%60)}:${Math.trunc(el.runtime/100)}`,
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
searchBtn.addEventListener('input',function(e){
    searchWrapper.classList.toggle('hidden');

        if (searchWrapper.classList[5] !== "hidden") {
        searchWrapper.style.display = 'flex';
        searchWrapper.style = 'flex-col';
        searchWrapper.style = 'gap-[102px]';
    }
})

searchBtn.addEventListener("input", function (e) {
    let searchStr = e.target.value;
    let searched = allMovies.filter(el => {
        return el.title.toLowerCase().includes(searchStr.toLowerCase())
    })

    if(searchStr == ""){
        searchWrapper.style.display = "hidden";
    }

    RenderData2(searched)
})



function RenderData2(data) {
    searchWrapper.innerHTML = ''
    data.forEach(el => {
        let searchTitle = document.createElement('li')
        searchTitle.classList.add("list-none")
        searchTitle.classList.add("text-[#666]")
        searchTitle.classList.add("pt-[10px]")
        searchTitle.classList.add("cursor-pointer")
        searchTitle.textContent = el.title;
        searchWrapper.appendChild(searchTitle);
    })


}
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


switchBtn.addEventListener('click',function(e){
    body2.classList.toggle('dark-mode');
    header2.classList.toggle('dark-mode');
    aside2.classList.toggle('dark-mode');
    inputs.classList.toggle('dark-mode');
    selects.classList.toggle('dark-mode');
    options.classList.toggle('dark-mode');
    names.classList.toggle('dark-mode');
    names2.classList.toggle('dark-mode');
    searchWrapper.classList.toggle('dark-mode');
})
// DARK-MODE ENDED
