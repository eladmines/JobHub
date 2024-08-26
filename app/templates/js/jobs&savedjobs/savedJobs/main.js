import {deployJobsContainer} from '../actions.js'
import {sendUserId,checkLoginAndNavigate} from '../../utils.js'
checkLoginAndNavigate();
var data= await sendUserId('/savedjobs')
deployJobsContainer(data)

