const loading = document.getElementById('loading'); // Loading element
const user_content = document.getElementById('user-content');
const inital_screen = document.getElementById('initial-screen');

// User info areas
const user_image = document.getElementById('user-img');
const name_user_area = document.getElementById('username');
const location_area = document.getElementById('location');
const followers_area = document.getElementById('followers-number');
const repos_area = document.getElementById('repos-number');

// Initial page state
loading.style.display = "none";
user_content.style.display = "none";
inital_screen.style.display = "flex";

const input_user_name = document.getElementById('input_user_name'); // input to search user name
const enter_input_event = input_user_name.addEventListener('keydown', (event) => {
    if (event.key == 'Enter'){
        user_content.style.display = "none";
        inital_screen.style.display = "none";
        loading.style.display = "flex";
        const userName = input_user_name.value;
        showUser(userName);
    }
});

// Async function to get the user data without stop the script
async function showUser(name){
    // wait the GET HTTP method
    const obj_getUser = await fetch(`https://api.github.com/users/${name}`);
    // console.log(obj_getUser);
    if (!obj_getUser.ok){ // If the HTTP request has failed
        loading.classList.add('hide');
        // console.log('Requisition Error');
    } else {
        const promise_dataUser = obj_getUser.json();
        promise_dataUser.then((data) => { // wait the catching data from the promise
            // Loading fron-end
            loading.style.display = "none";
            user_content.style.display = "flex";
            console.log(data); // Javascr5ipt object user data
            
            const name_user = data.login;
            const avatar_user = data.avatar_url;
            const local_user = data.location;
            const followersCount_user = data.followers;
            const reposCount_user = data.public_repos;
    
            console.log(local_user);
            user_image.src = avatar_user;
            name_user_area.innerText = name_user;
            name_user_area.href = `https://github.com/${name_user}`;
            location_area.innerText = local_user;
            followers_area.innerText = followersCount_user;
            repos_area.innerText = reposCount_user;

        });
    }
}