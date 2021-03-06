import React, {useState, useEffect} from 'react'
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import accountApi from '../../api/account';

import './signin.scss';

const Signin = () => {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useState([])
    console.log(accountData)

    useEffect(() => {
        const getAccountApi = async () => {
            try {
                const res = await accountApi.getAll()
                setAccountData(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getAccountApi()
    }, [])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [passConfirm, setPassConfirm] = useState('')
    const [isShowPass, setIsShowPass] = useState(false)
    const [isShowPassConfirm, setIsShowPassConfirm] = useState(false)
    const [checkMail, setCheckMail] = useState(true)
    const [checkPass, setCheckPass] = useState(true)
    const [checkPassConfirm, setCheckPassConfirm] = useState(true)
    const [checkUpperCase, setCheckUpperCase] = useState(false)
    const [checkLowerCase, setCheckLowerCase] = useState(false)
    const [checkLengthCase, setCheckLengthCase] = useState(false)
    const [checkNumberCase, setCheckNumberCase] = useState(false)

    const [checkIsMail, setCheckIsMail] = useState(true)
    const [submit, setSubmit] = useState(false)

    // On change text
    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const arrayName = name.split(" ");
    const first_name = arrayName[0].slice(0, 1).toUpperCase()
    const last_name = arrayName[arrayName.length - 1].slice(0, 1).toUpperCase()
    console.log(first_name, last_name)

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePass = (e) => {
        setCheckUpperCase(/[A-Z]/.test(e.target.value))
        setCheckLowerCase(/[a-z]/.test(e.target.value))
        setCheckLengthCase(e.target.value.length >= 8)
        setCheckNumberCase(/\d/.test(e.target.value))
        setPass(e.target.value);

    }

    const onChangePassConfirm = (e) => {
        setPassConfirm(e.target.value);
    }

    const handleShowPass = () => {
        setIsShowPass(!isShowPass)
    }

    // Validation

    const emailValidation = () => {
        
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        setCheckMail(regex.test(email));
    }

    const passwordValidation = () => {
        if (pass === passConfirm) {
            setCheckPassConfirm(true);
        } else {
            // make API call
            setCheckPassConfirm(false);
        }
        
    }

    const handleShowPassConfirm = () => {
        setIsShowPassConfirm(!isShowPassConfirm)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        emailValidation();
        passwordValidation();

        const check = checkUpperCase && checkLowerCase && checkLengthCase && checkNumberCase;
        setCheckPass(check)

        const found = accountData.find(item => item.email === email);
        setCheckIsMail(found === undefined)

        setSubmit(checkMail && checkPass && checkPassConfirm && checkIsMail)
        
        if (submit === true) {

            // Khai b??o c??c bi???n canvas
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
    
            // L???y x, y c??n gi???a canvas
            var x = canvas.width / 2;
            var y = canvas.height / 2;
    
            // Ph??? m??u cho canvas
            context.rect(0, 0, 40, 40);
            context.fillStyle = "#" + Math.floor(Math.random() * 16777215).toString(16);
            context.fill();
    
            // Vi???t t???t h??? v?? t??n l??n canvas
            context.font = "15px Arial";
            context.textAlign = "center";
            context.fillStyle = "white";
            context.fillText(first_name + last_name, x, y + 5);
    
            const dataAvt = canvas.toDataURL(); // L???y d??? li???u canvas
            
            const formData = new FormData()
            formData.append("dataAvt", dataAvt)
            formData.append("name", name)
            formData.append("email", email)
            formData.append("password", pass)
            try {
                await accountApi.create(formData)
                alert("????ng k?? t??i kho???n th??nh c??ng")
                navigate("/login")
            } catch(err) {
                console.log(err)
            }
        }
    }
    return (
        <form action method="POST" className="form" id="form-2">
            <div className="sign__in">
                <p className="sign__in--title">????ng k?? t??i kho???n</p>
                <div className="form-group">
                    <input onChange={onChangeName} type="text" name="name" id="name" placeholder="H??? v?? t??n" />
                    <div className="form-message"></div>
                </div>
                <canvas style={{display: 'none'}} id="canvas" width="40" height="40"></canvas>
                <div className="form-group">
                    <input className={checkMail ? '' : "check" , checkIsMail ? '' : "check"} onChange={onChangeEmail} type="text" name="email" id="email" placeholder="Email" />
                    <div className="form-message">{checkMail ? "" : "Sai ?????nh d???ng email."}</div>
                    <div className="form-message">{checkIsMail ? "" : "?????a ch??? email ???? t???n t???i"}</div>
                </div>
                <div className="form-group">
                    <div className="password">
                        <input className={checkPass ? "" : "check"} onChange={onChangePass} type={isShowPass ? 'text': 'password'} name="password" id="passwword" placeholder="M???t kh???u" />
                        <div onChange={onChangePass} onClick={handleShowPass} className="password__show">
                            <i className={isShowPass ? "icon__hide" : "icon__show"}></i>
                        </div>
                    </div>
                    <div className="form-message">{checkPass ? "" : "M???t kh???u ph???i ????ng ?????nh d???ng."}</div>
                </div>
                <div className="form-group">
                    <div className="password">
                        <input className={checkPassConfirm ? "" : "check"} onChange={onChangePassConfirm} type={isShowPassConfirm ? 'text': 'password'} name="password" id="passwword1" placeholder="Nh???p l???i m???t kh???u m???i" />
                        <div onClick={handleShowPassConfirm} className="password__show">
                            <i className={isShowPassConfirm ? "icon__hide" : "icon__show"}></i>
                        </div>
                    </div>
                    <div className="form-message">{checkPassConfirm ? "" : "M???t kh???u kh??ng tr??ng kh???p."}</div>
                </div>
            </div>
            <div className="password-require">
                <p className="desc">M???t kh???u b???n ph???i c??:</p>
                <ul className="below-desc">
                    <li className={checkLengthCase ? 'checkCase' : ''} id="character">
                        <span>??t nh???t 8 k?? t???</span>
                    </li>
                    <li className={checkUpperCase ? 'checkCase' : ''} id="uppercase">
                        <span>Ch??? c??i vi???t hoa (A-Z)</span>
                    </li>
                    <li className={checkLowerCase ? 'checkCase' : ''} id="lowercase">
                        <span>Ch??? c??i vi???t th?????ng (a-z)</span>
                    </li>
                    <li className={checkNumberCase ? 'checkCase' : ''} id="number">
                        <span>??t nh???t 1 s???</span>
                    </li>
                </ul>
            </div>
            <div className="policy">
                B???ng vi???c b???m n??t ????ng k?? b??n d?????i, t??i x??c nh???n ???? ?????c, hi???u v?? ?????ng ?? v???i c??c <Link to="/">??i???u ki???n v?? ??i???u kho???n</Link> c???a VinFast.
            </div>
            <div className="submit">
                <button onClick={onSubmit}>????ng k??</button>
            </div>
            <p className="no__account">???? c?? t??i kho???n?</p>
            <div className="btn__sign__up">
                <Link to="/login">????ng nh???p</Link>
            </div>
        </form>
    )
}

export default Signin
