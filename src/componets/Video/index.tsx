import React, { useState, useEffect } from "react"
import { RouteComponentProps, withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import { StorageType } from "../../store/types"
import { LOGIN, colors, hexToRGBA } from "../../constants"
import { Loading } from "../Loading"
import api from "../../api"
import styled, { keyframes } from 'styled-components';
import { AddCircleOutline } from "@styled-icons/material/AddCircleOutline"
import { RemoveCircleOutline } from "@styled-icons/material/RemoveCircleOutline"
import { Play } from "@styled-icons/ionicons-solid/Play"
import { VideoCamera } from "@styled-icons/heroicons-solid/VideoCamera"
import { LocationPin } from "@styled-icons/entypo/LocationPin"
import { metadataType } from "../Home"
import moment from 'moment';
import VideoPlayer from "./VideoPlayer"
import { ArrowBack } from "@styled-icons/ionicons-sharp/ArrowBack"


interface MainProps {
    bgImage: string
}
interface ButtonProps {
    selected: boolean
}

interface NumberProps {
    anime?: boolean
}

const ShowItemAnime = keyframes`

    0% {
      transform: rotateX(0deg);
      background: ${colors.counterColour};
    }   
    50% {
        transform: rotateX(90deg);
        background: ${colors.primary};
    }
    100% {
        transform: rotateX(0deg);
        background: ${colors.counterColour};
    }  
`
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
    background-color: ${hexToRGBA(colors.bgPrimary, 0.7)};
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
    font-weight: 700;
    /*animation: ${ShowItemAnime} 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;    */
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
const StyledArrowBack = styled(ArrowBack)`
    height: 80%;
    margin-right: 10px;
`
const LiveBox = styled.div`
    position: absolute;
    left: 40%;
    top: 40%;
    background-color: ${hexToRGBA(colors.bgPrimary, 0.7)};
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
const NumbersElement = styled.div<NumberProps>`    
    background: ${colors.counterColour};
    margin: 0 2px;
    font-weight: 700;
    display: flex;
    font-size: xxx-large;
    justify-content: center;
    border-radius: 5px;
    padding: 0 8px;
    align-items: center; 
    animation: ${ShowItemAnime} 0.5s ease-in-out both reverse  ;
`

const AnimeNumber = styled(NumbersElement)`
    animation: ${ShowItemAnime} 0.5s ease-in-out both  ;
`

const NumberText = styled.div`
    font-size: larger;
    font-weight: 700;
    margin-bottom: 2rem;
`
const MessageBox = styled(LiveBox)`
    top: 15%;   
`
const SupportMessageBox = styled(MessageBox)`
    top: 25%;
`
const WeatingMessageBox = styled(LiveBox)`
    top:40%   
`
const Span = styled.span`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`
const VideoBox = styled.div`
    width: 100vw;
    height: 100vh;
`

interface matchParamsType {
    id: string
}

interface VideoDosType {
    viewerState: string,
    videoState: string,
    startTime: string,
    videoID: string,
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

type MenuItemType = "play" | "list" | "location" | "producer" | "back"
interface Timer {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}


const Video: React.FC<RouteComponentProps<matchParamsType>> = ({ history, match }) => {
    const selectToken = (state: StorageType) => state.logIn.token
    const selectUserId = (state: StorageType) => state.logIn.userName
    const selectVideo = (state: StorageType) => state.data.videoDetails
    const videoDisRedux = useSelector(selectVideo)
    const Token = useSelector(selectToken) //token 
    const userId = useSelector(selectUserId) // user Id 
    const [loading, setLoading] = useState<boolean>(true)
    const [videoDis, setVideoDis] = useState<VideoDosType>()
    const [menuItem, setMenuItem] = useState<MenuItemType>("play")
    const [timer, setTimer] = useState<Timer>({ days: 365, hours: 59, minutes: 59, seconds: 59 })
    const [liveIn, setLiveIn] = useState<boolean>(false)
    const [showPlay, setShowPlay] = useState<boolean>(false)
    const [min5Loop, setMin5Loop] = useState<boolean>(true)
    const [min5LoopCounter, setmin5LoopCounter] = useState<number>(0)
    const [sec15Loop, setSec15Loop] = useState<boolean>(false)
    const [sec15LoopCounter, setSec15LoopCounter] = useState<number>(0)
    const [videoPlay, setVideoPlay] = useState<boolean>(false)
    const [eventWaitingMesage, setEwentWeatingMessage] = useState<string>("")
    const [magpieReportCall, setMagpieReportCall] = useState<boolean>(false)
    let timeOut5min: any
    let timeOut15sec: any

    //buttons
    const [play_pause, setPlay_pause] = useState<boolean>(false)
    const [speedUp, setSpeedup] = useState<boolean>(true)
    const [speedDown, setSpeedDown] = useState<boolean>(true)
    const [plus10s, setPlus10s] = useState<boolean>(true)
    const [minus10s, setMinus10s] = useState<boolean>(true)
    const [up, setUp] = useState<boolean>(true)
    const [down, setDown] = useState<boolean>(true)

    //animations 
    const [animateSec, setAnimateSec] = useState<number>(0)
    const [animateMin, setAnimateMin] = useState<number>(0)
    const [animateHour, setAnimateHour] = useState<number>(0)
    const [animateDays, setAnimateDays] = useState<number>(0)
    const [animateSecS, setAnimateSecS] = useState<number>(0)
    const [animateMinS, setAnimateMinS] = useState<number>(0)
    const [animateHourS, setAnimateHourS] = useState<number>(0)
    const [animateDaysS, setAnimateDaysS] = useState<number>(0)
    const videoId = match.params.id



    //keyboard  events
    useEffect(() => {
        addListeners()
        //if (timer.hours === 0) setSatrtUpdatingLoop(true)
        return () => {
            removeListeners()
        }
    })
    //timet animarion triger
    useEffect(() => {
        if (Math.floor(timer.days / 10) !== animateDays) setAnimateDays(Math.floor(timer.days / 10))
        if (timer.days % 10 !== animateDaysS) setAnimateDaysS(timer.days % 10)

        if (Math.floor(timer.hours / 10) !== animateHour) setAnimateHour(Math.floor(timer.hours / 10))
        if (timer.hours % 10 !== animateHourS) setAnimateHourS(timer.hours % 10)

        if (Math.floor(timer.minutes / 10) !== animateMin) setAnimateMin(Math.floor(timer.minutes / 10))
        if (timer.minutes % 10 !== animateMinS) setAnimateMinS(timer.minutes % 10)

        if (Math.floor(timer.seconds / 10) !== animateSec) setAnimateSec(Math.floor(timer.seconds / 10))
        if (timer.seconds % 10 !== animateSecS) setAnimateSecS(timer.seconds % 10)
    }, [timer, animateDays, animateDaysS, animateHour, animateHourS, animateMin, animateMinS, animateSec, animateSecS])

    //update data every 5 min
    useEffect(() => {
        //console.log("Start 5min loop", min5Loop)
        clearTimeout(timeOut5min)
        timeOut5min = setTimeout(function () {
            if (!min5Loop) {
                clearTimeout(timeOut5min)
            } else {
                reloadData()
                setmin5LoopCounter(min5LoopCounter + 1)
            }


        }, 300000)
        return () => clearTimeout(timeOut5min)
    }, [min5Loop, min5LoopCounter])
    //Update data every 15sec
    useEffect(() => {
        //console.log("Start 15s loop", sec15Loop,)
        clearTimeout(timeOut15sec)
        timeOut15sec = setTimeout(function () {
            if (!sec15Loop) {
                clearTimeout(timeOut15sec)
            } else {
                reloadData()
                setSec15LoopCounter(sec15LoopCounter + 1)
            }

        }, 15000)
        return () => clearTimeout(timeOut15sec)
    }, [sec15Loop, sec15LoopCounter])
    //timer
    useEffect(() => {
        if (liveIn) {
            // const countDownDate = moment(videoDisRedux?.metadata?.start_time)
            const countDownDate = moment(videoDis?.startTime)
            const locationTimeOfset = (): number => {
                const daylySavingTime = moment().isDST() ? -60 : 0 //if DST subtract 60min
                if (videoDis?.metadata.timezone === "Eastern") return -300 - daylySavingTime
                else if (videoDis?.metadata.timezone === "Central") return -360 - daylySavingTime
                else if (videoDis?.metadata.timezone === "Mountian") return -420 - daylySavingTime
                else return -480 - daylySavingTime
            }
            const timeOfset = new Date().getTimezoneOffset() + locationTimeOfset()
            var timerLoop = setInterval(function () {
                const now = moment()
                // Find the distance between now and the count down date            
                let distance = countDownDate.diff(now) - (timeOfset * 60000)
                // Time calculations for days, hours, minutes and seconds
                const time = {
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                }
                time.hours = 0
                distance = -1
                if (time.hours === 0) {
                    setMin5Loop(false) //stop updating very 5min
                    setSec15Loop(true) //start updating every 15sec
                }
                if (distance < 0) {
                    clearInterval(timerLoop)
                    //console.log("Stop Timer")
                    if (liveIn) setLiveIn(false)
                    setShowPlay(true)
                    setEwentWeatingMessage("Event will start soon")
                }
                setTimer(time)
            }, 1000)
        }

        return () => clearInterval(timerLoop);
    }, [liveIn, videoDisRedux?.metadata?.start_time, videoDis?.metadata.timezone, showPlay])

    //main content loading
    useEffect(() => {
        if (!Token) history.push(LOGIN)
        else if (loading) {
            api.getVideoItemNoLock(Token, videoDisRedux.id)
                .then(res => {
                    // res.supportMessage = "Support Message Test"
                    // res.message = "Test MEssage"
                    //console.log(videoDisRedux, res)
                    setVideoDis({ ...videoDisRedux, ...res })
                    if (res.viewerState === "watch") {
                        //if starts in the future                    
                        if (((new Date(videoDisRedux.metadata.start_time).getTime()) - (new Date().getTime()) > 0) && (res.videoState === "scheduled" || res.videoState === "upcoming")) {
                            setLiveIn(true) //start counter
                            setMenuItem("list") //selevt list item in menue
                        } else if (res.videoState === "available") setShowPlay(true) // show play button
                    }
                    if (res.videoState === "delist") {
                        //console.log("Go Back !!! videoState:", res.videoState)
                        history.goBack()
                    }
                    if (loading) setLoading(false)
                })
                .catch(error => console.log(error));
        }
    }, [Token, history, loading, videoDisRedux])

    //update data after add ar remove from myList
    const reloadData = () => {
        //console.log("Updating data...", videoPlay)
        //change api depend on playing video or not
        const apiCall = videoPlay ? api.getVideoItemState(Token, videoDisRedux.id) : api.getVideoItemNoLock(Token, videoDisRedux.id)
        apiCall.then(res => {
            //console.log("new data: ", videoDis, res)
            if (videoDis) setVideoDis({ ...videoDisRedux, ...res })
            if (res.viewerState === "watch") {
                if (res.videoState === "live") { // show paly 
                    //if (showPlay) setShowPlay(true)
                    if (liveIn) setLiveIn(false) // hide counter and show play mutton
                    if (showPlay) setShowPlay(true) //show play button
                    if (setMenuItem) setMenuItem("play") //select play button
                }
            } else {
                setVideoPlay(false) //close video 
                if (showPlay) setShowPlay(false) //hide play button
            }
        })
            .catch(error => console.log(error));
    }

    const addListeners = () => {
        //document.addEventListener("keydown", handleKeyUp, true);
        document.addEventListener("keyup", handleKeyUp, true);
    }

    const removeListeners = () => {
        //document.removeEventListener("keydown", handleKeyUp, true);
        document.removeEventListener("keyup", handleKeyUp, true);
    }

    const handleKeyUp = (e: KeyboardEvent) => {
        removeListeners();
        switch (e.key) {
            case 'Enter':
                handleEnter()
                break;
            case 'ArrowUp':
                handleArrowUp()
                break;
            case 'ArrowDown':
                handleArrowDown()
                break;
            case 'ArrowRight':
                handleArrowRight()
                break;
            case 'ArrowLeft':
                hendleArrowLeft()
                break;
            case 'MediaPlayPause':
                hendMediaPlayPause()
                break;
            case 'MediaFastForward':
                hendleMediaFastForward()
                break;
            case 'MediaRewind':
                hendleMediaRewind()
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
        if (videoPlay) {
            setMagpieReportCall(!magpieReportCall)
            handleCloseVideo()
        } else history.goBack()
    }
    const hendleMediaFastForward = () => {
        console.log("Hendled")
        if (videoPlay) {
            setSpeedup(!speedUp)
        } else addListeners()
    }
    const hendleMediaRewind = () => {
        if (videoPlay) {
            setSpeedDown(!speedDown)
        } else addListeners()
    }

    const handleCloseVideo = () => {
        console.log("close")
        setVideoPlay(false)
    }
    const hendMediaPlayPause = () => {
        if (videoPlay) {
            setPlay_pause(!play_pause)
        } else addListeners()
    }
    const handleArrowRight = () => {
        if (videoPlay) {
            setPlus10s(!plus10s)
        } else {
            addListeners()
        }

    }

    const hendleArrowLeft = () => {
        if (videoPlay) {
            setMinus10s(!minus10s)
        } else {
            addListeners()
        }
    }
    const handleArrowUp = () => {
        if (videoPlay) {
            setUp(!up)
        } else {
            if (menuItem === "back") setMenuItem("producer")
            else if (menuItem === "producer") setMenuItem("location")
            else if (menuItem === "location") setMenuItem("list")
            else if (menuItem === "list" && (!liveIn || showPlay)) setMenuItem("play")
            else addListeners()
        }

    }
    const handleArrowDown = () => {
        if (videoPlay) {
            setDown(!down)
        } else {
            if (menuItem === "play") setMenuItem("list")
            else if (menuItem === "list") setMenuItem("location")
            else if (menuItem === "location") setMenuItem("producer")
            else if (menuItem === "producer") setMenuItem("back")
            else addListeners()
        }
    }
    const handleEnter = () => {
        if (videoPlay) { //playing video  
            setPlay_pause(!play_pause)
        } else { //in details mode
            if (menuItem === "play") {
                console.log("play")
                clearTimeout(timeOut5min)
                clearTimeout(timeOut15sec)
                setMin5Loop(false) //stop updating very 5min
                setSec15Loop(false) //stop updating every 15sec          
                api.getVideoItem(Token, videoDisRedux.id)
                    .then(res => {
                        if (videoDis) setVideoDis({ ...videoDisRedux, ...res })
                        if (res.videoState === "live") { // show paly                             
                            api.timorLogs(userId, videoId, "info", `${res.url}`).catch((err) => console.log(err.message))
                            setLiveIn(false) // hide counter and show play mutton
                            if (setMenuItem) setMenuItem("play")
                        }
                        setVideoPlay(true)// start playing  
                        setSec15Loop(true)  //start update every 15s

                    })
                    .catch(error => console.log(error));
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
            else if (menuItem === "back") {
                hendleBack()
            }
            addListeners()
        }
    }
    return (
        <>
            {loading ? <Loading /> :
                <>
                    {videoPlay
                        ?
                        <VideoBox>
                            <VideoPlayer
                                closeVideo={handleCloseVideo}
                                url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                // url={videoDis ? videoDis.url : "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"}
                                play_pause={play_pause}
                                speedUp={speedUp}
                                speedDown={speedDown}
                                plus10s={plus10s}
                                minus10s={minus10s}
                                up={up}
                                down={down}
                                userId={userId}
                                videoId={videoDis ? videoDis.videoID : "0"}
                                keyId={videoDis ? videoDis.key : "0"}
                                magpieReportCall = {magpieReportCall}
                            />
                        </VideoBox>
                        :
                        <MainBox bgImage={videoDisRedux.mediumImage}>
                            <MenuBox>
                                {showPlay ? <Buttons selected={menuItem === "play"} ><StyledPlay /> Play</Buttons> : ""}
                                <Buttons selected={menuItem === "list"} > {videoDis?.saved ? <><StyledRemove />Remove from My List </> : <><StyledAdd /> Add to My List</>}</Buttons>
                                <Buttons selected={menuItem === "location"}><StyledLocation /> <Span>{videoDis?.metadata.facility.name}</Span></Buttons>
                                <Buttons selected={menuItem === "producer"}><StyledCameraMovie /> <Span>{videoDis?.metadata.producer.name}</Span></Buttons>
                                <Buttons selected={menuItem === "back"}><StyledArrowBack /> Go Back</Buttons>
                            </MenuBox>
                            {eventWaitingMesage !== "" ?
                                <SupportMessageBox>
                                    <h2>{eventWaitingMesage}</h2>
                                </SupportMessageBox>
                                : ""}
                            {videoDis?.supportMessage ?
                                <SupportMessageBox>
                                    <h2>{videoDis.supportMessage}</h2>
                                </SupportMessageBox>
                                : ""}
                            {videoDis?.message ?
                                <MessageBox>
                                    <h2>{videoDis.message}</h2>
                                </MessageBox>
                                : ""}
                            {liveIn
                                ? <LiveBox>
                                    {videoDis?.metadata.live && <LiveH1>Live In</LiveH1>}
                                    <Counter>
                                        <NumberContainer>
                                            <NumberBox>
                                                {Math.floor(timer.days / 100) > 0 ? animateDays !== Math.floor(timer.days / 100) ? <NumbersElement >{Math.floor(timer.days / 100)}</NumbersElement> : <AnimeNumber >{Math.floor(timer.days / 100)}</AnimeNumber> : ""}
                                                {animateDays !== Math.floor(timer.days / 10) ? <NumbersElement >{Math.floor(timer.days / 10)}</NumbersElement> : <AnimeNumber >{Math.floor(timer.days / 10)}</AnimeNumber>}
                                                {animateDaysS !== timer.days % 10 ? <NumbersElement >{timer.days % 10}</NumbersElement> : <AnimeNumber >{timer.days % 10}</AnimeNumber>}
                                            </NumberBox>
                                            <NumberText>Days</NumberText>
                                        </NumberContainer>
                                        <NumberContainer>
                                            <NumberBox>
                                                {animateHour !== Math.floor(timer.hours / 10) ? <NumbersElement >{Math.floor(timer.hours / 10)}</NumbersElement> : <AnimeNumber >{Math.floor(timer.hours / 10)}</AnimeNumber>}
                                                {animateHourS !== timer.hours % 10 ? <NumbersElement >{timer.hours % 10}</NumbersElement> : <AnimeNumber >{timer.hours % 10}</AnimeNumber>}
                                            </NumberBox>
                                            <NumberText>Hours</NumberText>
                                        </NumberContainer>
                                        <NumberContainer>
                                            <NumberBox>
                                                {animateMin !== Math.floor(timer.minutes / 10) ? <NumbersElement >{Math.floor(timer.minutes / 10)}</NumbersElement> : <AnimeNumber >{Math.floor(timer.minutes / 10)}</AnimeNumber>}
                                                {animateMinS !== timer.minutes % 10 ? <NumbersElement >{timer.minutes % 10}</NumbersElement> : <AnimeNumber >{timer.minutes % 10}</AnimeNumber>}
                                            </NumberBox>
                                            <NumberText>Minutes</NumberText>
                                        </NumberContainer>
                                        <NumberContainer>
                                            <NumberBox>
                                                {animateSec !== Math.floor(timer.seconds / 10) ? <NumbersElement >{Math.floor(timer.seconds / 10)}</NumbersElement> : <AnimeNumber >{Math.floor(timer.seconds / 10)}</AnimeNumber>}
                                                {animateSecS !== timer.seconds % 10 ? <NumbersElement >{timer.seconds % 10}</NumbersElement> : <AnimeNumber >{timer.seconds % 10}</AnimeNumber>}
                                            </NumberBox>
                                            <NumberText>Seconds</NumberText>
                                        </NumberContainer>
                                    </Counter>
                                </LiveBox> : ""}
                            <DisBox>
                                <TitleBox>
                                    <h2>{videoDis?.title}</h2>
                                    <DisTimeBox>
                                        <StyledTime>{moment(videoDis?.startTime).format("LT")} </StyledTime>
                                        <h2>{moment(videoDis?.startTime).format("ll")}</h2>
                                    </DisTimeBox>
                                </TitleBox>
                                <Dis>
                                    <h2>{videoDis?.description}</h2>
                                </Dis>
                            </DisBox>
                        </MainBox>
                    }
                </>
            }
        </>
    )
}

export default withRouter(Video)