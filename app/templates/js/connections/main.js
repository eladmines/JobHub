import {initPage} from "./actions.js"
import {removeSearchBar,checkLoginAndNavigate} from "../utils.js";
//Entry point
initPage();
removeSearchBar();
checkLoginAndNavigate();