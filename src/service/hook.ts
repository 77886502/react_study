import request from 'utils/request'

export const getUserIdentity = () => {
    return request.get('/api/get_user_identity')
}