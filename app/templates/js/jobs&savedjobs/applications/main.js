import {deployJobsContainer} from '../actions.js'
import {sendUserId,checkUserLogin} from '../../utils.js'
var data= await sendUserId('/applications')
deployJobsContainer(data)
//checkUserLogin()