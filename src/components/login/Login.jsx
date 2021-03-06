import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import cookies from 'react-cookies'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/user/userSlice';

import accountApi from '../../api/account';
import './login.scss';

const Login = () => {

    const [userData, setUserData] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isShowPass, setIsShowPass] = useState(false)
    const [checkMail, setCheckMail] = useState(true)
    const [checkPass, setCheckPass] = useState(true)

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePass = (e) => {
        setPass(e.target.value);
    }

    const handleShowPass = () => {
        setIsShowPass(!isShowPass)
    }

    const dispatch = useDispatch();
    const navigate = useNavigate ();
    
    const onSubmit = (e) => {
        e.preventDefault();

        const getAccount = async () => {
            try {
                const res = await accountApi.getAll()
                setUserData(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getAccount()

        console.log(123)
        if (userData) {
            const getUserData = (email) => userData.find(e => e.email === email)
            const user = getUserData(email)
            if (user) {
                setCheckMail(true)
                if (pass === user.password) {
                    setCheckPass(true)
                    dispatch(login({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        password: user.pass,
                        avatar: user.avatar,
                        role: user.role,
                        loggedIn: true,
                    }))
                    if (user.role === 'sell') {
                        navigate('/admin/')
                    } else if (user.role === 'admin') {
                        navigate('/admin/')
                    } else {
                        navigate('/')
                    }
                    
                    cookies.save("user", user)
                } else {
                    setCheckPass(false)
                }
            } else {
                setCheckMail(false)
            }
        }
    }
    return (
        <form action method="POST" className="form" id="form-1">
            <div className="sign__in">
                <p className="sign__in--title">????ng nh???p</p>
                <div className="form-group">
                    <input className={checkMail ? '' : "check"} onChange={onChangeEmail} type="text" name="email" id="email" placeholder="Email" />
                    <div className="form-message">{checkMail ? "" : "Email kh??ng ????ng. Vui l??ng th??? l???i."}</div>
                </div>
                <div className="form-group">
                    <div className="password">
                        <input className={checkPass ? "" : "check"} onChange={onChangePass} type={isShowPass ? 'text': 'password'} name="password" id="passwword" placeholder="M???t kh???u" />
                    <div onClick={handleShowPass} className="password__show">
                        <i className={isShowPass ? "icon__hide" : "icon__show"}></i>
                    </div>
                    </div>
                    <div className="form-message">{checkPass ? "" : "M???t kh???u kh??ng ????ng. Vui l??ng th??? l???i."}</div>
                </div>
            </div>
            <div className="remember">
                <div className="form-group">
                    <input type="checkbox" name="note" id="note" />
                    <span className="checkmark-box"></span>
                    <label htmlFor='note' className="save__pass">Ghi nh??? t??i kho???n</label>
                </div>
                <div className="password__reset">Qu??n m???t kh???u?</div>
            </div>
            <div className="submit">
                <button onClick={onSubmit} disabled={email !== '' && pass !== '' ? false : true}>????ng nh???p</button>
            </div>
            <p className="no__account">Ch??a c?? t??i kho???n</p>
            <div className="btn__sign__up">
                <Link to="/signin">????ng k?? t??i kho???n</Link>
            </div>
        </form>
    )
}

export default Login
