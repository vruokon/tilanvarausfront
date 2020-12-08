const LOGIN = '/user/login'
const LOGOUT = '/user/logout'
const REGISTER = '/users'
const CREATE_WORKSPACE = '/workspace/create'
const GET_WORKSPACES = '/workspaces'
const PUBLISH_WORKSPACE = '/workspace/<int:workspace_id>/publish'

module.exports ={
    LOGIN,
    REGISTER,
    CREATE_WORKSPACE,
    GET_WORKSPACES,
    PUBLISH_WORKSPACE,
    LOGOUT
}