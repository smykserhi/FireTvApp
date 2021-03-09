import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { logOut, clearData } from "../../store/actions"
import { StorageType } from "../../store/types"
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';
import { colors, LOGIN, host, PAGES, HOME } from "../../constants"
import { ArrowBack } from "@styled-icons/ionicons-sharp/ArrowBack"
import { LogOut } from "@styled-icons/boxicons-regular/LogOut"
import api from "../../api"

const MainBox = styled.div`
    display: flex;
    flex-direction: row;

`
const LeftSide = styled.div`
display: flex;
flex-direction: column;
width: 30vw;
padding: 60px
`
const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;    
    justify-content: center;
`
const StyledLeftContent = styled.div`
/*width: 30%;*/
margin: 50px 0
`
const StyledRightContent = styled.div`

`
const ButtonsConteiner = styled.div`
display: flex;
justify-content: space-between;
margin-top: 2rem;
`
const Button = styled.div`
    width: 8rem;
    background-color: ${colors.textPrimary};
    color: black;
    height: 2.5rem;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    
`
const SelectedButton = styled(Button)`
    color: ${colors.textPrimary};
    background-color: ${colors.primary};    
`

const StyledArrowBack = styled(ArrowBack)`
    height: 60%;
    margin-right: 10px;
`
const StyledLogOut = styled(LogOut)`
    height: 60%;
    margin-right: 10px;
`

const Settings: React.FC<RouteComponentProps> = ({ history }) => {
    const selectToken = (state: StorageType) => state.logIn.token
    const selectUserName = (state: StorageType) => state.logIn.userName
    const Token = useSelector(selectToken) //token 
    const UserName = useSelector(selectUserName)
    const dispatch = useDispatch()
    const [goBackActive, setGoBackActive] = useState<boolean>(true)

    useEffect(() => {
        if (!Token) history.push(LOGIN)
        else {
            addListeners()
            return () => {
                //component will unmount
                removeListeners()
            }
        }
    })

    const addListeners = () => {
        document.addEventListener("keydown", handleKeyDown, true);
        document.addEventListener("keyup", handleKeyUp, true);
    }

    const removeListeners = () => {
        document.removeEventListener("keydown", handleKeyDown, true);
        document.removeEventListener("keyup", handleKeyUp, true);
    }
    const handleKeyUp = (e: KeyboardEvent) => {
        removeListeners();
        switch (e.key) {
            case 'Enter':
                handleEnter()
                break;
            default:
                addListeners()
        }
        e.preventDefault();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        removeListeners();
        switch (e.key) {
            case 'ArrowRight':
                handleArrow()
                break;
            case 'ArrowLeft':
                handleArrow()
                break;
            case 'GoBack':
            case 'Backspace':
                hendleBack()
                break;
            default:
                addListeners()
        }
        e.preventDefault();
    }
    const hendleBack = () => {
        history.push(`${PAGES}/${HOME}`)
        //setLoading(true)
    }
    const handleArrow = () => {
        setGoBackActive(!goBackActive)
    }
    const handleEnter = () => {
        console.log("enter")
        if (goBackActive) history.goBack()
        else {
            api.logout(Token)
            dispatch(logOut())
            dispatch(clearData())
            localStorage.clear()
            history.push(LOGIN)
        }

    }


    return (
        <MainBox>
            <LeftSide>
                <StyledLeftContent>
                    <h3>Account Email : </h3>
                    <h3>{UserName}</h3>
                </StyledLeftContent>
                <StyledLeftContent>
                    <h3>App info: </h3>
                    <h3>version : 2.0.0</h3>
                </StyledLeftContent>
            </LeftSide>
            <RightSide>
                <StyledRightContent>
                    <h1>To contact Cutomer Service: </h1>
                    <h3>visit https://{host}/support </h3>
                </StyledRightContent>
                <ButtonsConteiner>
                    {goBackActive ? <SelectedButton><StyledArrowBack />Go back </SelectedButton>
                        : <Button><StyledArrowBack />Go back</Button>}
                    {!goBackActive ? <SelectedButton><StyledLogOut /> Sing Out </SelectedButton>
                        : <Button><StyledLogOut /> Sing Out</Button>}
                </ButtonsConteiner>
            </RightSide>
        </MainBox>


    )
}
export default withRouter(Settings)