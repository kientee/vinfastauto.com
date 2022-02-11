import axiosClient from './axiosClient'

const accountApi = {
    getAll: () => axiosClient.get('user/ReadAccount.php'),
    create: (params) => axiosClient.post('user/CreateAccount.php', params),
    getOne: (id) => axiosClient.get(`user/showAccount.php?id=${id}`),
    update: (params) => axiosClient.post(`user/UpdateAccount.php`, params),
    delete: (id) => axiosClient.post(`admin/deleteProduct.php?id=${id}`),
    
    createByAdmin: (params) => axiosClient.post('admin/createAccount.php', params),
    updateByAdmin: (params) => axiosClient.post(`admin/updateAccount.php`, params),
    deleteByAdmin: (id) => axiosClient.delete(`admin/deleteAccount.php?id=${id}`),
}

export default accountApi