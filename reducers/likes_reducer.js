import _ from 'lodash'
import {
  LIKE_JOB,
  CLEAR_LIKE_JOBS
} from '../actions/types';
import { REHYDRATE } from 'redux-persist/constants'

export default function(state = [], action) {
  switch (action.type) {
    
    case LIKE_JOB:
      return _.uniqBy([
        action.payload, ...state
      ], 'jobkey');
    
    case CLEAR_LIKE_JOBS:
      return [];

    case REHYDRATE:
      return action.payload.likedJobs || []

    default:
      return state;
  }
}
