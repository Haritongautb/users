
// Получить инфу о пользователе
async function getRequest(url){
    try{
        const result = await fetch(url, {
            method: "GET"
        })
        if(!result.ok){
            throw new Error(error);
        } else {
            return await result.json();
        }
    } catch(error){
        return error
    }
}


// Зарегистрироваться
async function signUP(url, data){
    try{
        const result = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if(!result.ok){
            throw new Error(error);
        } else {
            return await result.json();
        }
    } catch(error){
        return error
    }
}

// Войти 
async function signIN(url, data) {
    try{
        const result = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headres: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if(!result.ok){
            throw new Error(error);
        } else {
            return await result.json();
        }
    } catch(error){
        return error;
    }
}

// Удалить пользователя
async function deleteRequest(url) {
    try{
        const result = await fetch(url, {
            method: "DELETE",
        })
        if(!result.ok){
            throw new Error(error);
        } else {
            return await result.json();
        }
    } catch(error){
        return error;
    }
}

// Поменять данные пользователя
async function updateRequest(url, data) {
    try{
        const result = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if(!result.ok){
            throw new Error(error);
        } else {
            return await result.json();
        }
    } catch(error){
        return error;
    }
}

export {getRequest};
export {signUP};
export {signIN};
export {deleteRequest};
export {updateRequest};

