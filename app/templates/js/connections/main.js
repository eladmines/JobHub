import {initPage} from "./actions.js"
import { checkUserLogin,removeSearchBar } from "../utils.js";
//Entry point
initPage();
checkUserLogin()
removeSearchBar();