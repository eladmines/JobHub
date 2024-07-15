import {deployJobsContainer} from '../actions.js'
import {sendUserId} from '../../utils.js'
var data= await sendUserId('/applications')
deployJobsContainer(data)