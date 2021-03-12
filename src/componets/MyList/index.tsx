import React, { useEffect, useState } from "react"
import { RouteComponentProps, withRouter } from 'react-router';
import api from "../../api"
import { videoDisType, sideMenuType, videoDisListType } from "../Home"
import { useSelector, useDispatch } from 'react-redux';
import { StorageType } from "../../store/types"
import { addVideo } from "../../store/actions"
import { Loading } from "../Loading"
import Full from "../Home/Full"
import { SideMenu } from "../SideMenu"
import styled from 'styled-components';
import { LOGIN, PAGES, VIDEO, SEARCH, SETTINGS, HOME } from "../../constants"

const MainContainer = styled.div`
  
    
`
const MainBox = styled.div`
    margin: 3rem 15rem;
    width: 75%; 
   
     
`

const ListTitle = styled.h1`
    margin-bottom: 3rem;
    margin-left: 1rem;
`


const MyList: React.FC<RouteComponentProps> = ({ history }) => {
    const selectToken = (state: StorageType) => state.logIn.token
    const Token = useSelector(selectToken) //token 
    const dispatch = useDispatch()
    const [myListContent, setMyListContent] = useState<videoDisType[]>([{ id: 9999, list: [] }])
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedCol, setSelectedCol] = useState<number>(0)
    const [expandSideMenue, setExpandSideMenue] = useState<boolean>(false)
    const [sideMenuItem, setSideMenuItem] = useState<sideMenuType>(null)

    useEffect(() => {
        if (!Token) history.push(LOGIN)
        else if (loading) {
            api.getMyList(Token)
                .then((res) => {
                    let fullType = [{ id: 9999, list: res }]
                    setMyListContent(fullType)
                    setLoading(false)
                    //console.log(fullType)
                })
                .catch(error => console.log(error));
        }

    }, [loading, Token, history])


    useEffect(() => {
        addListeners()
        return () => {
            //component will unmount
            removeListeners()
        }
    })
    const uploadNewItems = () => {
        //console.log("myListContent[0].list.length",myListContent[0].list.length)
        api.getMyList(Token, myListContent[0].list.length)
            .then(res => {
                let tmp = myListContent
                res.forEach((element: videoDisListType) => {
                    tmp[0].list.push(element)
                });
                //console.log("new item uploded", tmp)
                setMyListContent(tmp)
            })
            .catch(error => console.log(error));
    }
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
        setLoading(true)
    }
    const handleKeyDown = (e: KeyboardEvent) => {
        removeListeners();
        switch (e.key) {
            case 'ArrowRight':
                handleArrowRight()
                break;
            case 'ArrowLeft':
                hendleArrowLeft()
                break;
            case 'ArrowUp':
                handleArrowUp()
                break;
            case 'ArrowDown':
                handleArrowDown()
                break;
            default:
                addListeners()
        }
        e.preventDefault();
    }

    const handleEnter = () => {
        console.log("Enter")
        if (expandSideMenue) {
            if (sideMenuItem === "home") {
                history.push(`${PAGES}/${HOME}`)
                setLoading(true)
                setSideMenuItem(null)
                setExpandSideMenue(false)
            } else if (sideMenuItem === "search") history.push(`${SEARCH}`)
            else if (sideMenuItem === "settings") history.push(`${SETTINGS}`)
            else {
                setSideMenuItem(null)
                setExpandSideMenue(false)
            }
        } else {
            dispatch(addVideo(myListContent[0].list[selectedCol])) // add to redux data
            history.push(`${VIDEO}/${myListContent[0].list[selectedCol].id}`)
        }
    }
    const handleArrowRight = () => {
        if (expandSideMenue) {
            setExpandSideMenue(false)
            setSideMenuItem(null)
        } else {
            if (selectedCol > myListContent[0].list.length - 20) uploadNewItems()
            if (selectedCol < myListContent[0].list.length - 1) {
                setSelectedCol(selectedCol + 1)
            } else addListeners()
        }

        //console.log("handleArrowRight")

    }
    const hendleArrowLeft = () => {
        //console.log("hendleArrowLeft")
        if (selectedCol % 5 !== 0) {
            setSelectedCol(selectedCol - 1)
        } else {
            if (!expandSideMenue) {
                setExpandSideMenue(true)
                setSideMenuItem("search")
            } else addListeners()

        }
    }
    const handleArrowUp = () => {
        //console.log("handleArrowUp")
        if (expandSideMenue) {
            switch (sideMenuItem) {
                case "settings":
                    setSideMenuItem("myList")
                    break
                case "myList":
                    setSideMenuItem("search")
                    break
                case "search":
                    setSideMenuItem("home")
                    break
                default:
                    addListeners()
            }
        } else {
            if (selectedCol > 4) { //at list on second row
                setSelectedCol(selectedCol - 5)
            } else addListeners()
        }

    }
    const handleArrowDown = () => {
        console.log("handleArrowDown")
        if (expandSideMenue) {
            switch (sideMenuItem) {
                case "home":
                    setSideMenuItem("search")
                    break
                case "search":
                    setSideMenuItem("myList")
                    break
                case "myList":
                    setSideMenuItem("settings")
                    break
                default:
                    addListeners()
            }
        } else {
            if (selectedCol > myListContent[0].list.length - 20) uploadNewItems()
            if (selectedCol < myListContent[0].list.length - 5) {
                setSelectedCol(selectedCol + 5)
            } else addListeners()
        }
    }
    //console.log("myListContent", myListContent)
    return (
        <>
            {loading ? <Loading />
                :
                <MainContainer>
                    <SideMenu expand={expandSideMenue} selected={sideMenuItem} />
                    <MainBox>
                        <ListTitle>My list:</ListTitle>
                        <Full categories={[]} sellIndex={0} categoriesContent={myListContent} selectedCol={selectedCol} selectedRow={0} />
                    </MainBox>

                </MainContainer>
            }


        </>
    )
}

export default withRouter(MyList)