import React, { useState, useEffect } from "react"
import styled, { keyframes } from 'styled-components';
import { keyboard } from "../../constants"
import { colors, VIDEO } from "../../constants"
import { RouteComponentProps, withRouter } from 'react-router';
import api from "../../api"
import { videoDisListType } from "../Home"
import {CarSport} from "@styled-icons/ionicons-outline/CarSport"
import Logo from "../../images/main-logo.png"

interface CharBoxProps {
    selected: boolean
}
const selectedCategory = keyframes`
    from{        
        transform: scale(1.1) translateY(-10px);
        opacity: 1;
    }
    to{
        transform: scale(0.8) translateY(0px)   ;   
        opacity: 0;
    }    
`

const CarMoveAnime = keyframes`
0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
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
    width: 30vw;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(6, 50px);
    grid-template-rows: repeat(8, 50px);
    gap: 6px 6px;
    margin-top: 4rem;
`
const ResultBox = styled.div`
    width: 70vw;
`
const CharBox = styled.div<CharBoxProps>`
    border: white 1px solid;
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
// const ChangeKeys = styled(CharBox)`
//     grid-column: 1/2;
//     grid-row: 8/9;
// `

const SearchResult = styled.div`
    min-height: 35px;
    border: solid 1px white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0 15px;

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
`
const VideoElementNormal = styled.div`  
    margin: 10px;
    min-width: 300px;
    max-width: 300px;
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
    /*color: ${colors.primary};*/
    margin-left: 5px;
`
const StyledCarSport = styled(CarSport)`
    width: 50px;
    animation: ${CarMoveAnime} 2s infinite;
`
const NoResult = styled.div`
    margin-top: 6rem;
    grid-column: 1/5;
    text-align: center;
`
const StyledLogo = styled.img`
    width: 15rem;
    grid-column: 2;
    margin-top: 8rem;
`

const Search: React.FC<RouteComponentProps> = ({ history }) => {
    const [search, setSearch] = useState<string>("")
    const [selectedKey, setSelectedKey] = useState<number>(0)
    const [selectedVideo, setSelectedVideo] = useState<number>(-1)
    const [searchResult, setSearchResult] = useState<videoDisListType[]>([])    

    useEffect(() => {
        addListeners()
        return () => {
            //component will unmount
            removeListeners()
        }
    })
    

    useEffect(() => {
        if (search !== "") {
            api.searchContent(search)
                .then(res => {
                    setSearchResult(res)
                    console.log("res", res)
                })
        }
    }, [search])

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
            default:
                addListeners()
        }
        e.preventDefault();
    }
    const handleEnter = () => {
        if (selectedVideo < 0) { // on keyboard
            console.log("Hit Enter")
            if (selectedKey >= 0 && selectedKey < keyboard.length) {
                if (keyboard[selectedKey] === "<" && search.length > 0 ) setSearch(search.slice(0, -1))
                else if (keyboard[selectedKey] === "<" && search.length === 0 ) addListeners()
                else if (keyboard[selectedKey] === "_") setSearch(search + " ")
                else setSearch(search + keyboard[selectedKey])
            } else if (selectedKey === keyboard.length) history.goBack()
            else addListeners()
        } else { // on vodeo search
            history.push(`${VIDEO}/${searchResult[selectedVideo].id}`)
        }

    }

    const handleArrowUp = () => {
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
            console.log("Up on search field")

        }

    }
    const handleArrowDown = () => {
        if (selectedVideo < 0) { // on keyboard
            if (selectedKey < keyboard.length) {
                if (selectedKey > keyboard.length - 9 && selectedKey < keyboard.length - 5) setSelectedKey(keyboard.length - 2)
                else if (selectedKey >= keyboard.length - 5 && selectedKey < keyboard.length - 2) setSelectedKey(keyboard.length - 1)
                else if (selectedKey >= keyboard.length - 2 && selectedKey < keyboard.length) setSelectedKey(keyboard.length)
                else setSelectedKey(selectedKey + 6)
            } else {
                if (selectedKey !== keyboard.length) setSelectedKey(keyboard.length)
                else addListeners()
                console.log("out of board")
            }
        } else { // on vodeo search
            console.log("Down on search field ")
            if (selectedVideo < searchResult.length - 4) {
                setSelectedVideo(selectedVideo + 4)
            } else addListeners()

            //addListeners()
        }
    }
    const hendleArrowLeft = () => {
        if (selectedVideo < 0) {// on keyboard
            if (selectedKey > 0) setSelectedKey(selectedKey - 1)
            else addListeners()
        } else { // on vodeo search
            if (selectedVideo === 0 || (selectedVideo % 4) === 0) { //return to keyboard
                setSelectedVideo(-1)
                setSelectedKey(5)
            } else setSelectedVideo(selectedVideo - 1)
        }


    }
    const handleArrowRight = () => {
        if (selectedVideo < 0) {// on keyboard
            if (selectedVideo < 0) { //if on keyboard
                if (((selectedKey + 1) % 6 === 0 || selectedKey === keyboard.length - 1) && searchResult.length > 0 ) {
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
            if (selectedVideo < searchResult.length - 1) {
                setSelectedVideo(selectedVideo + 1)
            } else addListeners()
        }
    }



    return (
        <MainBox>
            <KeysBox>
                {keyboard.map((el, index) => {
                    if (el === "_") return (<SpaceBox key={index} selected={selectedKey === index ? true : false}> {el.toUpperCase()}</SpaceBox>)
                    else if (el === "<") return (<BackspaceBox key={index} selected={selectedKey === index ? true : false}>{el.toUpperCase()}</BackspaceBox>)
                    else return (<CharBox key={index} selected={selectedKey === index ? true : false}> {el.toUpperCase()}</CharBox>)
                })}
                {/* <ChangeKeys selected={selectedKey === keyboard.length ? true : false}>QWE</ChangeKeys> */}
                <BackBox selected={selectedKey === keyboard.length ? true : false}>Go Back</BackBox>
                <StyledLogo src={Logo} alt="Logo"/>
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
                                        <div>{el.title}</div>
                                    </VideoElementNormal>
                                )
                            } else {
                                return (
                                    <VideoElementNormal key={index} >
                                        <Image src={el.smallImage} alt="Imag"></Image>
                                        <div>{el.title}</div>
                                    </VideoElementNormal>
                                )
                            }
                        } return false

                    }) : <NoResult><p>Try type something</p> <StyledCarSport/></NoResult>}
                </ContentBox>
            </ResultBox>
        </MainBox>
    )
}
export default withRouter(Search)

