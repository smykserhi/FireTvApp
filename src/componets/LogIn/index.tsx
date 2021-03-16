import React, { useState, useEffect, useRef } from "react"
import Logo from "../../images/main-logo.png"
import styled from 'styled-components';
import api from "../../api"
import { RouteComponentProps, withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { saveToken, saveUserName } from "../../store/actions"
import { StorageType } from "../../store/types"
import { PAGES, HOME, colors } from "../../constants"

const LogInBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 25vw;
    height: 40vh;
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
    &:focus{
        border: solid 5px ${colors.primary}
      }
`
const LogInButton = styled.button`
    height: 50px;
    font-size: 1.5em;
    background-color: darkred;
    border: 1px solid ${colors.bgPrimary};    
    color: white;    
    border-radius: 5px;
    &:focus{
        border: solid 5px ${colors.primary}
      }
`


const LogIn: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordlRef = useRef<HTMLInputElement>(null)
    const submitRef = useRef<HTMLButtonElement>(null)
    const [selected, setSelected] = useState<"email" | "password" | "submit">("email")
    const selectToken = (state: StorageType) => state.logIn.token
    const LogIn = useSelector(selectToken)
    const dispatch = useDispatch()

    //add and remove listners every re rendering 
    useEffect(() => {
        addListeners()
        return () => {
            //component will unmount
            removeListeners()
        }
    })

    const addListeners = () => {
        document.addEventListener("keyup", handleKeyUp, true);
    }

    const removeListeners = () => {
        document.removeEventListener("keyup", handleKeyUp, true);
    }

    const handleKeyUp = (e: KeyboardEvent) => {
        removeListeners();
        switch (e.key) {
            case 'ArrowUp':
                handleArrowUp()
                break;
            case 'ArrowDown':
                handleArrowDown()
                break;
            case 'Enter':
                handleOnSubmit()
                break;
            default:
                addListeners()
        }
        e.preventDefault();
    }

    const handleArrowDown = () => {
        switch (selected) {
            case "email":
                passwordlRef.current?.focus()
                setSelected("password")
                break;
            case "password":
                submitRef.current?.focus()
                setSelected("submit")
                break;
            default:
                addListeners()
        }
    }

    const handleArrowUp = () => {
        switch (selected) {
            case "email":
                addListeners()
                break;
            case "password":
                emailRef.current?.focus()
                setSelected("email")
                break;
            case "submit":
                passwordlRef.current?.focus()
                setSelected("password")
                break
            default:
                addListeners()
        }
    }
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
                .then((res) => {    // Login success   
                    dispatch(saveToken(res.data.token)) // save token  to redux
                    dispatch(saveUserName(email)) // save user name to redux
                    //clearStates() // clear fields
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user', email);
                    history.push(`${PAGES}/${HOME}`)
                })
                .catch((err) => {
                    setError(err.response.data.error);
                    clearStates()
                });
        }
    }

    useEffect(() => {
        if (LogIn) history.push(`${PAGES}/${HOME}`) //Token exist in redux       
        else if (localStorage.getItem('token') && localStorage.getItem('user')) {
            const token = localStorage.getItem('token')
            const user = localStorage.getItem('user')
            if (user && token) { // save in redux
                dispatch(saveUserName(user))
                dispatch(saveToken(token))
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
                    ref={emailRef}
                    autoFocus
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChageHandler}
                />
                <Input
                    ref={passwordlRef}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChageHandler}
                />
                <LogInButton ref={submitRef} type="submit" onClick={handleOnSubmit}>
                    Log In
                </LogInButton>
            </FormControlsBox>
        </LogInBox>
    )
}

export default withRouter(LogIn)