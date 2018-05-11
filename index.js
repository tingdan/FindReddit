import reddit from './redditapi';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
    // Get search keyword
    const searchTerm = searchInput.value;
    // Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    // Get Limit
    const searchLimit = document.getElementById('limit').value;
    

    if(searchInput.value === "" && document.querySelector(".alert") == null) {
        
        
        showMessage("Please input search keyword", "alert-danger");
    }
    
    searchInput.value = '';

    reddit.search(searchTerm, searchLimit, sortBy)
        .then(results => {
           let output = '<div class="card-columns">';
           // Loop through posts
           results.forEach(post => { 
           
               let image = post.preview 
                                ? post.preview.images[0].source.url
                                : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
               
           
                output += `
                <div class="card">
                    <img class="card-img-top" src=${image} alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${truncateText(post.selftext, 100)}</p>
                        <a href=${post.url} class="btn btn-primary">Read More</a>
                        <hr>
                        <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                        <span class="badge badge-dark">Score: ${post.score}</span>
                    </div>
              </div>
                `;
           });
           output += '</div>'
           document.getElementById('results').innerHTML = output;
        })


    e.preventDefault();
    
});

function showMessage(message, className) {
    var searchContainer = document.getElementById("searchContainer");
    var search=  document.getElementById("search");
    // Create div
    var div = document.createElement("DIV");
    // add class
    div.className = `alert ${className}`;
    // append message
    div.appendChild(document.createTextNode(message));
    // insert to...
    searchContainer.insertBefore(div, search );

    setTimeout(() => document.querySelector(".alert").remove(), 3000);

}

// Truncate Text 
function truncateText(text, limit) {
    const shortend = text.indexOf(' ', limit);
    if(shortend == -1) return text;
    return text.substring(0, shortend);
}