import React, { useState, useEffect } from "react"
import Logo from "../../images/main-logo.png"
import styled from 'styled-components';
import api from "../../api"
import { RouteComponentProps, withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { saveToken, saveUserName } from "../../store/actions"
import { StorageType } from "../../store/types"

const LogInBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 300px;
    margin: auto;    
`
const LogoBox = styled.div`
    position: absolute;
    top: -100px;
    left: 0;
    right: 0;
    margin: auto;
    width: 200px;
`
const ErrorBox = styled.div`
    color: red;
    font-size: 1.3em;
    padding-bottom: 20px;
    text-align: center;
    transition: all 1s;
    
`
const FormControlsBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

`
const Input = styled.input`    
    height: 50px;
    margin-bottom: 25px;
    border-radius: 5px;
    font-size: 1.5em;
    padding-left: 10px;
    padding-right: 10px;
`
const LogInButton = styled.button`
    height: 50px;
    font-size: 1.5em;
    background-color: darkred;
    border: 1px solid black;
    /*width: 325px !important;*/
    color: white;    
    border-radius: 5px;

`


const LogIn: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const selectToken = (state: StorageType) => state.logIn.token
    const LogIn = useSelector(selectToken)
    const dispatch = useDispatch()    
    //localStorage.setItem('token', 'Tom');
    const onChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "email") setEmail(e.target.value)
        else setPassword(e.target.value)
    }
    const clearStates = (): void => {
        setEmail("")
        setPassword("")
    }

    const handleOnSubmit = (): void => {
        if (!email || !password) {
            setError("Please fill the fields")
        }
        else {
            api.login(email, password)
                .then((res) => {
                    //console.log("LogIn Succses", res.data.token)
                    //api.saveToken(res.data.token)
                    clearStates()
                    dispatch(saveToken(res.data.token))
                    dispatch(saveUserName(email))
                    localStorage.setItem('token', res.data.token);     
                    localStorage.setItem('user', email);                
                })
                .catch((err) => {
                    setError(err.response.data.error);
                    clearStates()
                });
        }
    }

    useEffect(() => { 
        if (LogIn)  history.goBack() // history.push(`${PAGES}/${HOME}`) //if user already LogIn        
        else{
            if(localStorage.getItem('token')){
                const token = localStorage.getItem('token')                
                if(token) dispatch(saveToken(token))
            }
            if(localStorage.getItem('user')){
                const user = localStorage.getItem('user')                
                if(user) dispatch(saveUserName(user))
            }

        }
    })

    return (
        <LogInBox >
            <LogoBox >
                <img src={Logo} height={110} alt="" />
            </LogoBox>
            {error ? <ErrorBox className="error">{error}</ErrorBox> : ""}
            <FormControlsBox >
                <Input
                    autoFocus
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChageHandler}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChageHandler}
                />
                <LogInButton type="submit" onClick={handleOnSubmit}>
                    Log In
                </LogInButton>
            </FormControlsBox>
        </LogInBox>
    )
}

export default withRouter(LogIn)