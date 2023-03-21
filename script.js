"use strict";

const getDataBtn = document.getElementById("get-data"),
    usersList = document.getElementById("users-list"),
    formSubmitBtn = document.getElementById("form-submit"),
    nameInput = document.getElementById("name"),
    idInput = document.getElementById("number-id"),
    sexInput = document.getElementById("sex"),

    buttonPost = document.getElementById("button-post")


const ehor = {"name": "Yehor", "password": "Mystring"}

buttonPost.addEventListener("click", () => {
    postElement("http://127.0.0.1:5000/user");
})

async function postElement(url){
    try{
        const result = await fetch(url, {
            method: "POST",
            body: JSON.stringify(ehor),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if(!result.ok){
            throw new Error(error);
        } else {
            const answer = await result.json();

            console.log(answer);
        }

    } catch(error){
        console.log(error);
    }
}



/* const state = {
    usersData: [],
    newUser: {
        name: "",
        sex: "",
        id: "",
    },
    editUserData: {}
}

getDataBtn.addEventListener("click", () => {
    getData("http://localhost:3000/users_data")
    .then((data) => 
    {
        const sortData = sortUsersData(data);
        state.usersData = [...sortData]
        console.log(state.usersData);
        fillData(state.usersData)

    })
})

async function getData(url){
    try{
        const result = await fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if(!result.ok){
            throw new Error(error)
        } else {
            return await result.json();
        }
    }catch(error){
        console.log(error);
    }
}



sexInput.addEventListener("change", event => {
    if(!!state.editUserData.sex){
        return state.editUserData.sex = event.target.value;
    }
    return state.newUser.sex = event.target.value;
})


nameInput.addEventListener("change", event => {
    if(!!state.editUserData.name){
        return state.editUserData.name = event.target.value;
    }
    return state.newUser.name = event.target.value;
})

idInput.addEventListener("change", event => {
    if(!!state.editUserData.id){
        idInput.value = state.editUserData.id;
        return state.editUserData.id = state.editUserData.id
    }
    return state.newUser.id = event.target.value;
})


formSubmitBtn.addEventListener("click", event => {
    event.preventDefault();

    if(!!state.editUserData.name || !!state.editUserData.id || !!state.editUserData.sex){
        editRequest(`http://localhost:3000/users_data/${state.editUserData.id}`);  
    } else {
        addNewUser("http://localhost:3000/users_data")
        .then(newUser => {
                const newInfoUser = toNumberID(newUser);
                state.usersData = [newInfoUser, ...state.usersData]
                const data = sortUsersData(state.usersData)
                fillData(data)
                clearState();
        })
    }

})

async function addNewUser(url) {
    try{
        const result = await fetch(url, {
            method: "POST",
            body: JSON.stringify(state.newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if(!result.ok){
            throw new Error(error)
        } else {
            return await result.json();
        }
    } catch(error){
        console.log(error);
    }
}

function render(user, index) {
    return `
        <div class="user-list__block-card">
            <div class="user-list__photo">
                <img class="user-list__img" src="" alt="user profile img">
            </div>
            <div class="user-list__texts">
                <div class="user-single-block user-list__name">My names is - ${user.name}
                </div>
                <div class="user-single-block user-list__id">User id - ${user.id}</div>
                <div class="user-single-block user-list__sex">male - ${user.sex}</div>
            </div>
            <div class="user-list__block-buttons">
                <button type="button" class="button user-list__block-button" onclick="editUser(${index})">Change some informations about user</button>
                <button type="button" class="button user-list__block-button" onclick="deleteUser(${index})">Delete User</button>
            </div>
        </div>
    `
}

function fillData(usersData){
    usersList.innerHTML = "";

    usersData.map((item, index) => usersList.innerHTML += render(item, index))
}  

function toNumberID(user){
    return {...user, id: +user.id}
}

function sortUsersData(arr){
    state.usersData = arr.map((item) => {
        if(typeof item.id === "string"){
            return {...item, id: +item.id}
        }
        return item
    })

    return state.usersData.sort((a, b) => a.id - b.id);;
}


function clearState() {
    nameInput.value = "";
    idInput.value = "";
    sexInput.value = "";

    state.newUser.name = "";
    state.newUser.sex = "";
    state.newUser.id = "";

    state.editUserData = {};
    idInput.placeholder = "write id";
}


function editUser(index){
    const editData = state.usersData[index];
    console.log(index)
    state.editUserData = editData;
    nameInput.value = state.editUserData.name;
    idInput.value = state.editUserData.id;
    sexInput.value = state.editUserData.sex;

    idInput.placeholder = "Нельзя менять id"
}

async function editRequest(url){
    try{
        const result = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(state.editUserData),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if(!result.ok){
            return new Error(error);
        } else {
            getDataBtn.click();
            clearState();
        }
    } catch(error){
        console.log(error);
    }
}


function deleteUser(index){
    const shouldDeleteUser = state.usersData[index];
    const userID = shouldDeleteUser.id;
    deleteRequest(userID)
}

async function deleteRequest(id) {
    try{
        const result = await fetch(`http://localhost:3000/users_data/${id}`, {
            method: "DELETE"
        })

        if(!result.ok){
            throw new Error(error);
        } else {    
            getDataBtn.click();
        }
    } catch(error){
        console.log(error);
    }
} */