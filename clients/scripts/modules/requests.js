import { getDataRequest } from "../resources/resources";
import {postRequest} from "../resources/resources"
import getToken from "../verification/verification";
import { deleteUser } from "../resources/resources";



function requests(state) {

    const getData = document.getElementById("get-data-button"),
        formLoginInput = document.getElementById("form-login-input"),
        formPasswordInput = document.getElementById("form-password-input"),
        // Войти
        signINButton = document.getElementById("form-sign_up-button"),
        // Регистрация
        signUPButton = document.getElementById("form-sign_in-button"),
        formIDInput = document.getElementById("form-get_id-input"),
        getOneDataUser = document.getElementById("form-get_one_user-button"),
        deleteUserButton = document.getElementById("form-delete-button");

    formLoginInput.addEventListener("change", event => {
        state.name = event.target.value;
    })

    formPasswordInput.addEventListener("change", event => {
        state.password = event.target.value;
    })

    formIDInput.addEventListener("change", event => {
        state.id = event.target.value;
    })

    getData.addEventListener("click", () => {
        getDataRequest('http://127.0.0.1/api/user/', getToken("token"))
        .then(response => {
            if(response.length > 0){
                console.log(response);
                document.body.innerHTML += response.map(item => item.name);
            } else {
                document.body.innerHTML = "Нет пользователей";
            }
        })
    })

    signINButton.addEventListener("click", event => {
        event.preventDefault();

        if(!state.name || !state.password){
            return;
        }

        postRequest("http://127.0.0.1/api/login/", state, getToken("token"))
        .then(response => {
            if(response.error){
                alert(response.error)
                return;
            }
            alert("Вы успешно авторизованы")
            localStorage.removeItem("token");
            localStorage.setItem("token", response.hash);
        })
        .finally(() => {
            Object.keys(state).forEach(key => delete state[key]);
            console.log(state);
        })
    })

    signUPButton.addEventListener("click", event => {
        event.preventDefault();

        if(!state.name || !state.password){
            return;
        }

        postRequest("http://127.0.0.1/api/user/", state, getToken("token"))
    })

    getOneDataUser.addEventListener("click", event => {
        event.preventDefault();

        if(!state.id){
            alert("напишите id пользователя")
            return;
        }

        getDataRequest(`http://127.0.0.1/api/user/${state.id}`, getToken("token"))
        .then(response => {
            if(response.error){
                console.log(response.error);
                return;
            }
            console.log(response);
            document.body.innerHTML += response.name;
        })

    })

    deleteUserButton.addEventListener("click", () => {  
        if(!state.id){
            alert("напишите id пользователя")
            return;
        }

        deleteUser(`http://127.0.0.1/api/user/${state.id}`, getToken("token"))
        .then(response => console.log(response))
    })
}

export default requests;