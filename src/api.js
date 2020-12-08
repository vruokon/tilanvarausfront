//user urls
const REGISTER = '/users'
const LOGIN = '/user/login'
const LOGOUT = '/user/logout'
//workspace urls
const CREATE_WORKSPACE = '/workspace/create'
const GET_WORKSPACES = '/workspaces'
const PUBLISH_WORKSPACE = '/workspace/<int:workspace_id>/publish'
//reservation urls
const GET_RESERVATIONS = '/reservations/available'
const CREATE_RESERVATION = '/reservations/create'

module.exports ={
    LOGIN,
    REGISTER,
    CREATE_WORKSPACE,
    GET_WORKSPACES,
    PUBLISH_WORKSPACE,
    LOGOUT,
    CREATE_RESERVATION,
    GET_RESERVATIONS
}