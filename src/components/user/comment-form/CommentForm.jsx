import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import { selectUser } from '../../../redux/user/userSlice';
import './comment-form.scss'
const CommentForm = ({
    handleSubmit,
    submitLabel,
    initialText = "",
  }) => {
    const [text, setText] = useState(initialText);
    const onSubmit = (event) => {
      event.preventDefault();
      handleSubmit(text);
      setText("");
    };

    const user = useSelector(selectUser);
    console.log(text)

    const [active, setActive] = useState(false);
    const [hide, setHide] = useState(false);
    useEffect(() => {
      const inputDiv = document.querySelector(".comment__form__text")
      inputDiv.addEventListener("input", inputEvt => {
        setText(inputDiv.innerHTML);
        setActive(inputDiv.innerHTML !== '')
      }, false);
    }, [])

  return <div className='comment__form' onClick={onSubmit}>
            <img src={user.avatar} alt="" />
            <div
                contentEditable="true"
                className={active ? "comment__form__text active" : "comment__form__text"}
                onChange={(e) => setText(e.target.value)}
                placeholder='Viết bình luận của bạn...'
            />
            {
              hide ? null : <div className="comment__form__action">
                              <button className="cancel">Hủy</button>
                              <button onClick={onSubmit} className={active ? 'send-up active' : 'send-up'}>Bình luận</button>
                            </div>
            }
        </div>;
};

export default CommentForm;
