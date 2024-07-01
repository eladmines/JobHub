import {deployJobsContainer} from '../actions.js'
import {sendUserId} from './actions.js'
var data= await sendUserId()
deployJobsContainer(data)

    