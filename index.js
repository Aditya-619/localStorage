const form = document.querySelector("form");
const main = document.querySelector(".show");
const clear = document.querySelector(".clearAll")

const user = [
    {
        'name': 'Aditya',
        'email': 'yoo@gmail.com',
        'contact': '2324234234',
        'query': 'NA'
    },
    {
        'name': 'Hero',
        'email': 'yrrro@gmail.com',
        'contact': '25454234234',
        'query': 'NA'
    }
]

localStorage.setItem('name', JSON.stringify(user));
// console.log(JSON.parse(localStorage.getItem('name')));

form.addEventListener('submit', (e) => {

    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const contact = e.target.contact.value;
    const query = e.target.query.value;

    const queryData = JSON.parse(localStorage.getItem('queryDetails')) ?? [];
    let isExists = 0;
    for (let v of queryData) {
        if (v.email == email || v.contact == contact) {
            isExists = 1;
            break;
        }
    }
    if (isExists == 1) {
        alert('User already exists');
    } else {
        queryData.push({
            'name': name,
            'email': email,
            'contact': contact,
            'query': query
        })
    }

    localStorage.setItem('queryDetails', JSON.stringify(queryData));
    e.target.reset();
    displayData();
    // console.log(queryData);
    // console.log(name, email, contact, query);

})

const displayData = () => {
    const queryData = JSON.parse(localStorage.getItem('queryDetails')) ?? [];
    // console.log(queryData);
    let finalData = '';
    queryData.forEach((element, index) => {
        console.log(element);
        finalData += `<div class="items">
        <span onClick='removeData(${index})'>&times;</span>
        <h5>Name</h5>
        <div>${element.name}</div>

        <h5>Email</h5>
        <div>${element.email}</div>

        <h5>Contact</h5>
        <div>${element.contact}</div>
        </div>`
    });
    main.innerHTML = finalData
}

const removeData = (index) => {
    const queryData = JSON.parse(localStorage.getItem('queryDetails')) ?? [];
    queryData.splice(index, 1);
    localStorage.setItem('queryDetails', JSON.stringify(queryData));
    displayData();
}

clear.addEventListener('click', () => {
    localStorage.clear('queryDetails');
    displayData();
})

displayData();