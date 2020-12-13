//user urls
const REGISTER = '/users'
const LOGIN = '/user/login'
const LOGOUT = '/user/logout'
const ME = '/me'
//workspace urls
const CREATE_WORKSPACE = '/workspace/create'
const GET_WORKSPACES = '/workspaces'
const PUBLISH_WORKSPACE = '/workspace/<int:workspace_id>/publish'
const EDIT_WORKSPACE = '/workspace/<int:workspace_id>/edit'

//reservation urls
const GET_RESERVATIONS = '/reservations/available'
const CREATE_RESERVATION = '/reservations/create'
const MY_RESERVATIONS = '/users/reservations'
const DELETE_RESERVATION = '/reservations/delete'


module.exports ={
    LOGIN,
    REGISTER,
    CREATE_WORKSPACE,
    EDIT_WORKSPACE,
    GET_WORKSPACES,
    PUBLISH_WORKSPACE,
    LOGOUT,
    CREATE_RESERVATION,
    GET_RESERVATIONS,
    MY_RESERVATIONS,
    DELETE_RESERVATION,
    ME
}
