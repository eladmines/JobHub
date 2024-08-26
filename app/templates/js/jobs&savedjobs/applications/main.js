import {deployJobsContainer} from '../actions.js'
import {sendUserId,checkLoginAndNavigate} from '../../utils.js'
var data= await sendUserId('/applications')
deployJobsContainer(data)
checkLoginAndNavigate();