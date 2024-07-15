import {deployJobsContainer} from '../actions.js'
import {sendUserId} from '../../utils.js'
var data= await sendUserId('/savedjobs')
deployJobsContainer(data)
