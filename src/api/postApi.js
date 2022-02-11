import axiosClient from './axiosClient'

const postApi = {
    getAll: () => axiosClient.get('post/readPost.php'),
    getAllByUser: (user_id) => axiosClient.get(`post/readPostByUser.php?user_id=${user_id}`),
    create: (params) => axiosClient.post('post/CreatePost.php', params),
    getOne: (id) => axiosClient.get(`post/showPost.php?id=${id}`),
    update: (params) => axiosClient.post('post/updatePost.php', params),
    delete: (id) => axiosClient.post(`post/deletePost.php?id=${id}`),
}

export default postApi