import React, { useState, useEffect } from "react"
import { RouteComponentProps, withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import { StorageType } from "../../store/types"
import { LOGIN, colors } from "../../constants"
import { Loading } from "../Loading"
import api from "../../api"
import styled from 'styled-components';
import { AddCircleOutline } from "@styled-icons/material/AddCircleOutline"
import { RemoveCircleOutline } from "@styled-icons/material/RemoveCircleOutline"
import { Play } from "@styled-icons/ionicons-solid/Play"
import { VideoCamera } from "@styled-icons/heroicons-solid/VideoCamera"
import { LocationPin } from "@styled-icons/entypo/LocationPin"
import { metadataType } from "../Home"
import moment from 'moment';

interface MainProps {
    bgImage: string
}
interface ButtonProps {
    selected: boolean
}

const MainBox = styled.div<MainProps>`
    background: url("${props => props.bgImage}") no-repeat ;    
    /*mask-image: linear-gradient(90deg, rgba(255,255,255,0) 10%, ${colors.bgPrimary} 25%) ;    */
    background-size: 100% 100%;
    background-position: 100%;    
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index:-1;
`
const MenuBox = styled.div`    
    position: absolute;
    top: 40%;
    width: 17vw;
    padding-left: 4rem;
`
const DisBox = styled.div`
    background-color: ${colors.bgPrimary}bd;
    height: 30vh;
    position: absolute;
    top: 70%;
    width: 100vw;  
    
`
const TitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 4rem;
    opacity: 1;
`
const Dis = styled.div`
    margin: 0 4rem;
    opacity: 1;
`
const Buttons = styled.div<ButtonProps>`
    width: 100%;
    height: 2.5rem;
    background-color: ${props => props.selected ? colors.bgPrimary : colors.textPrimary};
    color: ${props => props.selected ? colors.textPrimary : "black"};
    border: ${props => props.selected ? `solid ${colors.textPrimary} 2px` : ""} ;
    border-radius: 5px;
    margin: 1rem 0;
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
    font-weight: 700
`
const StyledAdd = styled(AddCircleOutline)`
    height: 80%;
    margin-right: 10px;

`
const StyledRemove = styled(RemoveCircleOutline)`
    height: 80%;
    margin-right: 10px;
`
const StyledPlay = styled(Play)`
    height: 80%;
    margin-right: 10px;
`
const StyledCameraMovie = styled(VideoCamera)`
    height: 80%;
    margin-right: 10px;
`
const StyledLocation = styled(LocationPin)`
    height: 80%;
    margin-right: 10px;
`
const LiveBox = styled.div`
    position: absolute;
    left: 40%;
    top: 40%;
    background-color: ${colors.bgPrimary}bd;
    /*width: 20vw;*/
    /*height: 4rem;*/
    padding: 0 10px;
    border-radius: 10px;
    text-align: center;
`
const LiveH1 = styled.h1`
    color: ${colors.primary};
    font-size: xxx-large;
`
const DisTimeBox = styled.div`
    display: flex;
    flex-direction: row;
`
const StyledTime = styled.h2`
    color: ${colors.primary};
    margin-right: 1rem;
`
const Counter = styled.div`
    display: flex;
    flex-direction: row;
`
const NumberContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const NumberBox = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 7px
`
const NumbersElement = styled.div`
    background: blue;
    /* width: 2rem; */
    background: blue;
    /*height: 3rem;*/
    margin: 0 2px;
    font-weight: 700;
    display: flex;
    font-size: xxx-large;
    justify-content: center;
    border-radius: 5px;
    padding: 0 8px;
    align-items: center;
    
}


`

const NumberText = styled.div`
font-size: larger;
font-weight: 700;
margin-bottom: 2rem;
`


interface matchParamsType {
    id: string
}

interface VideoDosType {
    viewerState: string,
    videoState: string,
    startTime: string,
    videoID: number,
    key: string,
    url: string,
    message: null | string,
    supportMessage: string,
    saved: boolean,
    description: string,
    id: number,
    image: string,
    mediumImage: string,
    metadata: metadataType,
    smallImage: string,
    title: string,
    type: string,
}

type MenuItemType = "play" | "list" | "location" | "producer"
interface Timer {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}

interface Props extends RouteComponentProps<matchParamsType> {
}
const Video: React.FC<Props> = ({ history, match }) => {
    const selectToken = (state: StorageType) => state.logIn.token
    const selectVideo = (state: StorageType) => state.data.videoDetails
    const videoDisRedux = useSelector(selectVideo)
    const Token = useSelector(selectToken) //token 
    const [loading, setLoading] = useState<boolean>(true)
    const [videoDis, setVideoDis] = useState<VideoDosType>()
    const [menuItem, setMenuItem] = useState<MenuItemType>("play")
    const [timer, setTimer] = useState<Timer>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    const [liveIn, setLiveIn] = useState<boolean>(false)
    const videoId = match.params.id

    //keyboard
    useEffect(() => {
        addListeners()
        return () => {
            //component will unmount
            removeListeners()
        }
    })
    //timer
    useEffect(() => {
        const countDownDate = moment(videoDisRedux?.metadata?.start_time)
        const locationTimeOfset = (): number => {
            const daylySavingTime = moment().isDST() ? -60 : 0 //if DST subtract 60min
            if (videoDis?.metadata.timezone === "Eastern") return -300 - daylySavingTime
            else if (videoDis?.metadata.timezone === "Central") return -360 - daylySavingTime
            else if (videoDis?.metadata.timezone === "Mountian") return -420 - daylySavingTime
            else return -480 - daylySavingTime
        }
        const timeOfset = new Date().getTimezoneOffset() + locationTimeOfset()
        if (liveIn) var timerLoop = setInterval(function () {
            const now = moment()
            // Find the distance between now and the count down date            
            const distance = countDownDate.diff(now) - (timeOfset * 60000)
            // Time calculations for days, hours, minutes and seconds
            const time = {
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            }
            if (distance < 0) {
                clearInterval(timerLoop)
                console.log("Stop Timer")
                if (liveIn) setLiveIn(false)
            }
            setTimer(time)
        }, 1000)
        return () => clearInterval(timerLoop);
    }, [liveIn, videoDisRedux.metadata.start_time, videoDis?.metadata.timezone])
    //main content loading
    useEffect(() => {
        if (!Token) history.push(LOGIN)
        else if (loading) {
            api.getVideoItem(Token, videoDisRedux.id)
                .then(res => {
                    setVideoDis({ ...videoDisRedux, ...res })
                    //if starts in the future
                    if ((new Date(videoDisRedux.metadata.start_time).getTime()) - (new Date().getTime()) > 0) {
                        setLiveIn(true)
                        setMenuItem("list")
                    }
                    setLoading(false)
                })
                .catch(error => console.log(error));
        }
    }, [Token, history, loading, videoDisRedux])

    //update data after add ar remove from myList
    const reloadData = () => {
        api.getVideoItem(Token, videoDisRedux.id)
            .then(res => setVideoDis({ ...videoDisRedux, ...res }))
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
            default:
                addListeners()
        }
        e.preventDefault();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        removeListeners();
        switch (e.key) {
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

    const handleArrowUp = () => {
        if (menuItem === "producer") setMenuItem("location")
        else if (menuItem === "location") setMenuItem("list")
        else if (menuItem === "list" && !liveIn) setMenuItem("play")
        else addListeners()
    }
    const handleArrowDown = () => {
        if (menuItem === "play") setMenuItem("list")
        else if (menuItem === "list") setMenuItem("location")
        else if (menuItem === "location") setMenuItem("producer")
        else addListeners()
    }
    const handleEnter = () => {
        if (menuItem === "play") {
            console.log("play")
        }
        else if (menuItem === "list") {
            if (videoDis?.saved) {
                //console.log("remove")
                api.removeFromMyList(Token, videoId)
                    .then(() => reloadData())
                    .catch(error => console.log(error));
            }
            else {
                api.addToMyList(Token, videoId)
                    .then(() => reloadData())
                    .catch(error => console.log(error));
            }
        }
        else if (menuItem === "location") {
            console.log("Location")
        }
        else if (menuItem === "producer") {
            console.log("producer")
        }
        addListeners()
    }

    return (
        <>
            {loading ? <Loading /> :
                <MainBox bgImage={videoDisRedux.mediumImage}>
                    <MenuBox>
                        {!liveIn ? <Buttons selected={menuItem === "play"} ><StyledPlay /> Play</Buttons> : ""}
                        <Buttons selected={menuItem === "list"} > {videoDis?.saved ? <><StyledRemove />Remove from My List </> : <><StyledAdd /> Add to My List</>}</Buttons>
                        <Buttons selected={menuItem === "location"}><StyledLocation /> {videoDis?.metadata.facility.name}</Buttons>
                        <Buttons selected={menuItem === "producer"}><StyledCameraMovie /> {videoDis?.metadata.producer.name}</Buttons>
                    </MenuBox>
                    {liveIn
                        ? <LiveBox>
                            <LiveH1>Live In</LiveH1>
                            <Counter>
                                <NumberContainer>
                                    <NumberBox>
                                        <NumbersElement>{Math.floor(timer.days / 10)}</NumbersElement>
                                        <NumbersElement>{timer.days % 10}</NumbersElement>
                                    </NumberBox>
                                    <NumberText>Days</NumberText>
                                </NumberContainer>
                                <NumberContainer>
                                    <NumberBox>
                                        <NumbersElement>{Math.floor(timer.hours / 10)}</NumbersElement>
                                        <NumbersElement>{timer.hours % 10}</NumbersElement>
                                    </NumberBox>
                                    <NumberText>Hours</NumberText>
                                </NumberContainer>
                                <NumberContainer>
                                    <NumberBox>
                                        <NumbersElement>{Math.floor(timer.minutes / 10)}</NumbersElement>
                                        <NumbersElement>{timer.minutes % 10}</NumbersElement>
                                    </NumberBox>
                                    <NumberText>Minutes</NumberText>
                                </NumberContainer>
                                <NumberContainer>
                                    <NumberBox>
                                        <NumbersElement>{Math.floor(timer.seconds / 10)}</NumbersElement>
                                        <NumbersElement>{timer.seconds % 10}</NumbersElement>
                                    </NumberBox>
                                    <NumberText>Seconds</NumberText>
                                </NumberContainer>
                            </Counter>
                        </LiveBox> : ""}
                    <DisBox>
                        <TitleBox>
                            <h2>{videoDis?.title}</h2>
                            <DisTimeBox>
                                <StyledTime>{moment(videoDis?.metadata.start_time).format("LT")} {videoDis?.metadata.timezone} </StyledTime>
                                <h2>{moment(videoDis?.metadata.start_time).format("ll")}</h2>
                            </DisTimeBox>

                        </TitleBox>
                        <Dis>
                            <h2>{videoDis?.description}</h2>
                        </Dis>

                    </DisBox>

                </MainBox>
            }
        </>
    )
}

export default withRouter(Video)