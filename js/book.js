
const toggleSpinner = spinnerStyle => {
    document.getElementById('loader').style.display = spinnerStyle;
}
const bodyResult = spinnerStyle => {
    document.getElementById('search-result').style.display = spinnerStyle;
}

const loadData = () => {
    toggleSpinner('block');
    bodyResult('none');
    const searchText = document.getElementById('search-text');
    const searchValue = searchText.value;


    if (searchText.value.length === 0) {
        toggleSpinner('none');
         document.getElementById('blank-search').textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `<h3 class="text-danger text-center fw-bold">Write Something...</h3>`;
         document.getElementById('blank-search').appendChild(div);

    } else {
        document.getElementById('blank-search').textContent = '';


        const url = `https://openlibrary.org/search.json?q=${searchValue}`;
        searchText.value = '';
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data.docs));

    }
}

const displayData = books => {

    if (books.length === 0) {
        toggleSpinner('none');
        document.getElementById('wrong-search').textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `<h3 class="text-dark text-center">No Result Found!</h3>`;
        document.getElementById('wrong-search').appendChild(div);
    }

    document.getElementById('total-result').innerHTML = `<p>Showing result ${books.slice(0,30).length}</p>`;
    document.getElementById('results-div').textContent = '';

    books.slice(0, 30).forEach(book => {

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card h-100 border border-primary rounded-3">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i?book.cover_i:6701651}-M.jpg"
                class = "p-3 h-100 card-img-top" >
                <div class="card-body">
                    <h5 class="card-title">Book Name:<span class="text-primary  fw-bold"> ${book.title}</span></h5>
                    <p class="card-text">Author Name: <span class="text-primary fw-bold">${book.author_name?book.author_name[0]:'Unknown'}</span></p>
                    <p class="card-text">First Publish:<span class="text-primary fw-bold"> ${book.first_publish_year?book.first_publish_year:'Unknown'}</span></p>
                    <p class="card-text">Publisher:<span class="text-primary fw-bold">${book.publisher?book.publisher[0]:
                    'Unknown'}</span></p>
                                       
                </div>
            </div>
        
        `;
        document.getElementById('results-div').appendChild(div);

    });
    toggleSpinner('none');
    bodyResult('block');
}

document.getElementById('search-btn').addEventListener('click', () => {
    document.getElementById('total-result').textContent = '';
    document.getElementById('wrong-search').textContent = '';

});