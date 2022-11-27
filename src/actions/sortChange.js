import { CHANGE_SORT } from './actionTypes'

const sortChange = (sortName) => ({
  type: CHANGE_SORT,
  payload: sortName,
})

export default sortChange
