"use strict";

function clean(state){
    Object.keys(state).forEach(key => delete state[key]);
}
export {clean};