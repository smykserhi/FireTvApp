import React, { useState, useEffect } from "react"
import styled, { keyframes } from 'styled-components';
import { keyboard } from "../../constants"
import { colors, VIDEO, LOGIN, PAGES, HOME, MYLIST, SETTINGS } from "../../constants"
import { RouteComponentProps, withRouter } from 'react-router';
import api from "../../api"
import { videoDisListType } from "../Home"
import { CarSport } from "@styled-icons/ionicons-outline/CarSport"
import Logo from "../../images/main-logo.png"
import { BackspaceOutline } from "@styled-icons/evaicons-outline/BackspaceOutline"
import { SpaceBar } from "@styled-icons/material/SpaceBar"
import { ArrowBack } from "@styled-icons/ionicons-sharp/ArrowBack"
import { useSelector, useDispatch } from 'react-redux';
import { StorageType } from "../../store/types"
import { addVideo, addSearch, clearSearch } from "../../store/actions"
import { SideMenu } from "../SideMenu"
import { sideMenuType } from "../Home"

interface CharBoxProps {
    selected: boolean
}
const selectedCategory = keyframes`
    from{        
        transform: scale(1.1) translateY(-10px);
        /*opacity: 1;*/
    }
    to{
        transform: scale(1) translateY(0px)   ;   
        /*opacity: 0;*/
    }    
`

const CarMoveAnime = keyframes`
0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-5px, 5px);
  }
  40% {
    transform: translate(-5px, -5px);
  }
  60% {
    transform: translate(5px, 5px);
  }
  80% {
    transform: translate(5px, -5px);
  }
  100% {
    transform: translate(0);
  }
`

const MainBox = styled.div`
    display: flex;
    flex-direction: row;    
    margin: 20px;

`
const KeysBox = styled.div`
    width: 33vw;
    display: grid;
    margin: 4rem 1rem 0 2rem;
    justify-content: flex-end;
    grid-template-columns: repeat(6, 70px);
    grid-template-rows: repeat(8, 70px);
    gap: 6px 6px;   

`
const ResultBox = styled.div`
    width: 70vw;
    margin: 4rem 0 0 1rem;
`
const CharBox = styled.div<CharBoxProps>`
    border: ${colors.textPrimary} 1px solid;
    font-size: xx-large;
    display: flex;
    align-items: center;
    justify-content: center;    
    background: ${props => props.selected ? colors.primary : ""};
    transform: ${props => props.selected ? 'scale(1.1)' : 'scale(1)'}; 
    transition: all 0.3s ;
    border-radius: 5px;  
    
`
const SpaceBox = styled(CharBox)`
    grid-column: 1/4;
`
const BackspaceBox = styled(CharBox)`
    grid-column: 4/7;
`
const BackBox = styled(CharBox)`
    grid-column: 1/7;
    grid-row: 8/9;
`

const SearchResult = styled.div`
    min-height: 3rem;
    font-size: 2rem;
    border: solid 1px ${colors.textPrimary};
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    width: 80%;
`
const SearchResultTitle = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`
const ContentBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: start;
    gap: 10px;
    font-size: 25px;
    z-index: 1; 
    margin-top: 20px;
    width: 80%;
`
const VideoElementNormal = styled.div`  
    margin: 10px;
    min-width: 12vw;
    
`
const Image = styled.img`    
    width: 100%;
    border-radius: 5px;
    
`
const SelectedImage = styled.img`  
    border: solid ${colors.borderPrimary} 2px;
    width: 100%;
    border-radius: 5px;
    transform: scale(1.1) translateY(-10px);
    animation: ${selectedCategory}  0.3s ease-in-out  reverse; 
`
const SearchQwery = styled.div`    
    margin-left: 5px;
`
const StyledCarSport = styled(CarSport)`
    width: 5rem;
    animation: ${CarMoveAnime} 2s infinite;
`
const NoResult = styled.div`
    margin-top: 6rem;
    grid-column: 1/5;
    text-align: center;
    font-size: 3rem;
`
const StyledLogo = styled.img`
    width: 15rem;
    grid-column: 2;
    margin-top: 8rem;
`
const StyledBackspaceOutline = styled(BackspaceOutline)`
  height: 60%;
`
const StyledSpaceBar = styled(SpaceBar)`
  height: 60%;
`
const StyledArrowBack = styled(ArrowBack)`
  height: 60%;
  margin-right: 10px;
`

const Search: React.FC<RouteComponentProps> = ({ history }) => {
    const selectToken = (state: StorageType) => state.logIn.token
    const selectSearch = (state:StorageType)=>state.data.search
    const Token = useSelector(selectToken) //token 
    const reduxSearch = useSelector(selectSearch)
    const dispatch = useDispatch()
    const [search, setSearch] = useState<string>(reduxSearch)
    const [selectedKey, setSelectedKey] = useState<number>(0)
    const [selectedVideo, setSelectedVideo] = useState<number>(-1)
    const [searchResult, setSearchResult] = useState<videoDisListType[]>([])
    const [loading, setLoading] = useState<boolean>(false) //loading new results
    const [expandSideMenue, setExpandSideMenue] = useState<boolean>(false)
    const [sideMenuItem, setSideMenuItem] = useState<sideMenuType>(null)

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

    useEffect(() => {
        if (search !== "") {
            api.searchContent(search)
                .then(res => {
                    setSearchResult(res)                    
                })
                .catch(error => console.log(error));
        }
    }, [search])

    const getSearchContent = (search: string, offset = 0) => {
        if (!loading) {
            setLoading(true)
            api.searchContent(search, 20, offset)
                .then(res => {
                    let tmpSearchResult = searchResult
                    res.forEach((element: videoDisListType) => {
                        tmpSearchResult.push(element)
                    });
                    setSearchResult(tmpSearchResult)                    
                    setLoading(false)
                })
                .catch(error => console.log(error));
        }

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
            default:
                addListeners()
        }
        e.preventDefault();
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
    }
    const handleEnter = () => {
        if (expandSideMenue) {
            switch (sideMenuItem) {
                case "home":
                    history.push(`${PAGES}/${HOME}`)
                    break
                case "myList":
                    history.push(MYLIST)
                    break
                case "settings":
                    history.push(SETTINGS)
                    break
                default:
                    closeSideMenue()
            }
        } else {
            if (selectedVideo < 0) { // on keyboard
                console.log("Hit Enter")
                if (selectedKey >= 0 && selectedKey < keyboard.length) {
                    if (keyboard[selectedKey] === "<" && search.length > 0) setSearch(search.slice(0, -1))
                    else if (keyboard[selectedKey] === "<" && search.length === 0) addListeners()
                    else if (keyboard[selectedKey] === "_") setSearch(search + " ")
                    else setSearch(search + keyboard[selectedKey])
                } else if (selectedKey === keyboard.length){ 
                    dispatch(clearSearch()) // clear search from Redux
                    //setSearch("")
                    history.goBack()
                }
                else addListeners()
            } else { // on vodeo search
                dispatch(addVideo(searchResult[selectedVideo])) // add video to redux
                dispatch(addSearch(search))
                history.push(`${VIDEO}/${searchResult[selectedVideo].id}`)
            }
        }


    }

    const handleArrowUp = () => {
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
            if (selectedVideo < 0) { // on keyboard
                if (selectedKey > 5) { //if not first line
                    setSelectedKey(selectedKey - 6)
                    if (selectedKey === keyboard.length) setSelectedKey(keyboard.length - 2) // if "Go Beck"
                    else if (keyboard[selectedKey] === "<") setSelectedKey(keyboard.length - 3)
                    else if (keyboard[selectedKey] === "_") setSelectedKey(keyboard.length - 8)
                } else {
                    addListeners()
                }
            } else { // on vodeo search
                if (selectedVideo > 3) {
                    setSelectedVideo(selectedVideo - 4)
                } else addListeners()  
            }
        }
    }
    const handleArrowDown = () => {
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
            if (selectedVideo < 0) { // on keyboard
                if (selectedKey < keyboard.length) {
                    if (selectedKey > keyboard.length - 9 && selectedKey < keyboard.length - 5) setSelectedKey(keyboard.length - 2)
                    else if (selectedKey >= keyboard.length - 5 && selectedKey < keyboard.length - 2) setSelectedKey(keyboard.length - 1)
                    else if (selectedKey >= keyboard.length - 2 && selectedKey < keyboard.length) setSelectedKey(keyboard.length)
                    else setSelectedKey(selectedKey + 6)
                } else {
                    if (selectedKey !== keyboard.length) setSelectedKey(keyboard.length)
                    else addListeners()                    
                }
            } else { // on vodeo search                
                if (selectedVideo > searchResult.length - 19) getSearchContent(search, searchResult.length)//upload more search results
                if (selectedVideo < searchResult.length - 4) {
                    setSelectedVideo(selectedVideo + 4)
                } else addListeners()               
            }
        }
    }    
    const hendleArrowLeft = () => {
        if (expandSideMenue) { 
            closeSideMenue()
        }else if (selectedVideo < 0) {// on keyboard            
            if (selectedKey % 6 === 0 || selectedKey === 0 || selectedKey === keyboard.length) { //open side menue
                setExpandSideMenue(true)
                setSelectedKey(-1)
                setSideMenuItem("home")
            } else setSelectedKey(selectedKey - 1)            
        } else { // on vodeo search
            if (selectedVideo === 0 || (selectedVideo % 4) === 0) { //return to keyboard
                setSelectedVideo(-1)
                setSelectedKey(5)
            } else setSelectedVideo(selectedVideo - 1)
        }
    }
    const handleArrowRight = () => {
        if (expandSideMenue) { 
            closeSideMenue()
        } else {
            if (selectedVideo < 0) {// on keyboard
                if (selectedVideo < 0) { //if on keyboard
                    if (((selectedKey + 1) % 6 === 0 || selectedKey === keyboard.length - 1) && searchResult.length > 0) {
                        console.log("out")
                        setSelectedVideo(0) //move to search result 
                        setSelectedKey(-1)
                    } else if (selectedKey < keyboard.length) setSelectedKey(selectedKey + 1)
                    else {
                        addListeners()
                    }
                } else {
                    addListeners()
                }
            } else { // on vodeo search
                console.log("Right on search field ")
                if (selectedVideo > searchResult.length - 19) getSearchContent(search, searchResult.length)//upload more search results
                if (selectedVideo < searchResult.length - 1) {
                    setSelectedVideo(selectedVideo + 1)
                } else addListeners()
            }
        }

    }
    //close side menue
    const closeSideMenue = () => {
        setExpandSideMenue(false)
        setSelectedKey(0)
        setSideMenuItem(null)
    }

    return (
        <MainBox>
            <SideMenu expand={expandSideMenue} selected={sideMenuItem} />
            <KeysBox>
                {keyboard.map((el, index) => {
                    if (el === "_") return (<SpaceBox key={index} selected={selectedKey === index ? true : false}> <StyledSpaceBar /></SpaceBox>)
                    else if (el === "<") return (<BackspaceBox key={index} selected={selectedKey === index ? true : false}><StyledBackspaceOutline /></BackspaceBox>)
                    else return (<CharBox key={index} selected={selectedKey === index ? true : false}> {el.toUpperCase()}</CharBox>)
                })}               
                <BackBox selected={selectedKey === keyboard.length ? true : false}><StyledArrowBack />Go Back</BackBox>
                <StyledLogo src={Logo} alt="Logo" />
            </KeysBox>
            <ResultBox>
                <SearchResult>
                    Search : <SearchQwery>{search}</SearchQwery>
                </SearchResult>
                <ContentBox>
                    {searchResult.length > 0 ? searchResult.map((el, index) => {
                        if (index >= Math.floor(selectedVideo / 4) * 4) {
                            if (selectedVideo === index) {
                                return (
                                    <VideoElementNormal key={index} >
                                        <SelectedImage src={el.smallImage} alt="Imag"></SelectedImage>
                                        <SearchResultTitle>{el.title}</SearchResultTitle>
                                    </VideoElementNormal>
                                )
                            } else {
                                return (
                                    <VideoElementNormal key={index} >
                                        <Image src={el.smallImage} alt="Imag"></Image>
                                        <SearchResultTitle>{el.title}</SearchResultTitle>
                                    </VideoElementNormal>
                                )
                            }
                        } return false
                    }) : <NoResult><p>Try type something</p> <StyledCarSport /></NoResult>}
                </ContentBox>
            </ResultBox>
        </MainBox>
    )
}
export default withRouter(Search)

