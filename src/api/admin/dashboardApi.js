import axiosClient from '../axiosClient'

const dashboardApi = {
    getMonth: () => axiosClient.get('admin/readMonth.php'),
    // create: (params) => axiosClient.post('user/CreateAccount.php', params),
    // getOne: (id) => axiosClient.get(`user/showAccount.php?id=${id}`),
    // update: (params) => axiosClient.post(`user/UpdateAccount.php`, params),
    // delete: (id) => axiosClient.post(`admin/deleteProduct.php?id=${id}`),
}

export default dashboardApi