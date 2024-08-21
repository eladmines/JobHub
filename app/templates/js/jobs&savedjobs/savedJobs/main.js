import {deployJobsContainer} from '../actions.js'
import {sendUserId,checkUserLogin} from '../../utils.js'
var data= await sendUserId('/savedjobs')
deployJobsContainer(data)
