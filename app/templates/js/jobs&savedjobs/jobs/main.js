import {deployJobsContainer} from '../actions.js'
import {sendUserId,checkUserLogin} from '../../utils.js'
import {checkForCard} from './actions.js'

var data= await sendUserId('/jobs')
deployJobsContainer(data)
checkForCard()