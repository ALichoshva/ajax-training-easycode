class CustomHttp {
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('load', () => callback(JSON.parse(xhr.responseText)));
    }
};

const httpClient = new CustomHttp();

let nameWrapper = document.querySelector('.name-wrapper');
let infoWrapper = document.querySelector('.info-wrapper');

httpClient.get('https://jsonplaceholder.typicode.com/users', (response) => {
    response.forEach(element => {
        nameWrapper.insertAdjacentHTML('beforeend', `
            <a class="waves-effect waves-light btn" id="${element.id}">
                ${element.name}
            </a>
            `)
    })

    response.forEach(element => {
        infoWrapper.insertAdjacentHTML('beforeend', `
            <div class="collection d-none" data-id="${element.id}">
                <h4 class="title">User information</h1>
                <div class="user-info">
                    <p>name: ${element.name}</p>
                    <p>phone: ${element.phone}</p>
                    <p>username: ${element.username}</p>
                    <p>website: ${element.website}</p>
                </div>
            </div>
        `)
    })
})

nameWrapper.addEventListener('click', function(e) {
    let userInfo = document.querySelectorAll('.collection');
    let eTarget = document.querySelectorAll(`div[data-id="${e.target.getAttribute('id')}"]`)[0]

    if(!eTarget.classList.contains('d-none')) {
        eTarget.classList.toggle('d-none');
        return
    }

    userInfo.forEach(element => {
        element.classList.add('d-none');
    })

    eTarget.classList.remove('d-none');
})




