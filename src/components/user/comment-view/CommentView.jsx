import React, { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { selectUser } from '../../../redux/user/userSlice';
import CommentForm from '../comment-form/CommentForm';
import CommentDetail from '../comment-detail/CommentDetail';
import axios from 'axios'
import './comment-view.scss'

const CommentView = (props) => {

  const user = useSelector(selectUser)
  const [backendComments, setBackendComments] = useState([]);

  useEffect( () => {
    const getCommentsApi = async () => {
      try {
          // const res = await block1Api.getAll()
          const res = await axios.get(`http://localhost/vinfast/vinfast-backend/api/post/readComment.php?post_id=${props.post_id}`)
          setBackendComments(res.data.data)
      } catch(err) {
          console.log(err)
      }
  }
  getCommentsApi()
  }, [props.post_id]);
    return (
        <>
          <CommentForm submitLabel="Write" />
          <div className="comments__container">
            {
              backendComments ? backendComments.map((item, index) => (
                <div className="comments__container__detail">
                  <div className="comments__avatar">
                    <img src={user.avatar} alt="" />
                  </div>
                  <div className="comments__container__content">
                    <h5 className="comments__arthor">{user.name}</h5>
                    <div className="comments__text">{item.content}</div>
                    <p className='comments__created'>
                      <span>{item.created_at}</span>
                      <span className='comments__likeComment'></span>
                    </p>
                  </div>
                </div>
              )) : null
            }
          </div>
        </>
    )
}

export default CommentView
