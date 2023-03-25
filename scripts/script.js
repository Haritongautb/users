
require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import requests from "./modules/requests";
import "./modules/done";


window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const state = {};

    requests();

})