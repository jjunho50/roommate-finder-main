'use client'

import './register.css'
import React, { useState } from "react"

export default function Register() {

    const [dorm, setDorm] = useState("")
    const handleChange = (e) => {
        if (e.target.value == "female") {
            setDorm(selectDormitory());
        }
        else {
            setDorm(
                <input type='radio' name='dormitory' value="1" checked />
            );
        }
    }
    let selectDormitory = () => {
        return (
            <div className='gender-details'>
                <span className='gender-title'>기숙사</span>
                <div className='category'>
                    <label htmlFor="dorm-1">
                        <input type='radio' name='dormitory' id='dorm-1' value="1" checked />
                        <span className='dormitory'>제1 외성생활관</span>
                    </label>

                    <label htmlFor="dorm-2">
                        <input type='radio' name='dormitory' id='dorm-2' value="2" />
                        <span className='dormitory'>제2 외성생활관</span>
                    </label>
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='title'>회원가입</div>
            <form method="POST" action="/api/auth/signup">
                <div className="user-details">
                    <div className="input-box">
                        <span className="details" >이름</span>
                        <input type='text' name="name" maxLength={10} placeholder='이름을 입력해주세요' required />
                    </div>

                    <div className="input-box">
                        <span className="details" >학번</span>
                        <input type='text' name="studentId" inputMode="numeric" maxLength={8} pattern="\d{8}" placeholder='숫자 8자리를 입력해주세요' required />
                    </div>

                    <div className="input-box">
                        <span className="details" >이메일</span>
                        <input type='email' name="email" placeholder='이메일을 입력해주세요' required />
                    </div>

                    <div className="input-box">
                        <span className="details" >비밀번호</span>
                        <input type='password' name="password" placeholder='비밀번호를 정해주세요' required />
                    </div>
                </div>

                <div className='gender-details'>
                    <span className='gender-title'>성별</span>
                    <div className='category'>
                        <label for="gender-1">
                            <input type='radio' name='gender' id='gender-1' onChange={handleChange} value="male" />
                            <span className='gender'>&nbsp;&nbsp;&nbsp;남자</span>
                        </label>

                        <label for="gender-2">
                            <input type='radio' name='gender' id='gender-2' onChange={handleChange} value="female" />
                            <span className='gender'>&nbsp;&nbsp;&nbsp;여자</span>
                        </label>
                    </div>
                </div>

                {
                    dorm
                }

                <div className='roommate'>
                    <div className='title'>내 생활패턴</div>
                    <ul>
                        <li>기상시간
                            <label><input type="radio" name="wakeupTime" value="1" />5~7시</label>
                            <label><input type="radio" name="wakeupTime" value="2" />7~8시</label>
                            <label><input type="radio" name="wakeupTime" value="3" />9시~</label>
                        </li>
                        <li>수면시간
                            <label><input type="radio" name="sleepTime" value="1" />오후 9~11시</label>
                            <label><input type="radio" name="sleepTime" value="2" />11시~새벽 1시</label>
                            <label><input type="radio" name="sleepTime" value="3" />그 이상</label>
                        </li>
                        <li>흡연유무
                            <label><input type="radio" name="smoking" value="1" />예</label>
                            <label><input type="radio" name="smoking" value="2" />아니오</label>
                        </li>
                        <li>청소주기
                            <label><input type="radio" name="cleaning" value="매주 1회" />매주 1~2회</label>
                            <label><input type="radio" name="cleaning" value="매주 2회" />매주 3~4회</label>
                        </li>
                    </ul>
                </div>
                <br></br>
                <div className='button'>
                    <input type='submit' value='회원가입' />
                </div>







            </form>




        </div>

    )
}





