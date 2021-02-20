import React, { useRef, useState, useEffect } from "react"
import styled, { keyframes } from 'styled-components';
import { Forward10 } from "@styled-icons/material/Forward10"
import { Replay10 } from "@styled-icons/material/Replay10"
import { Forward2 } from "@styled-icons/icomoon/Forward2"
import { Backward } from "@styled-icons/icomoon/Backward"
import { PlayCircle } from "@styled-icons/fa-regular/PlayCircle"
import { PauseCircle } from "@styled-icons/fa-regular/PauseCircle"
import { FlagCheckered } from "@styled-icons/boxicons-solid/FlagCheckered"
import { colors } from "../../constants"
import {CarSport} from "@styled-icons/ionicons-outline/CarSport"
import {ToriiGate}from "@styled-icons/fa-solid/ToriiGate"


interface ButtonProps {
    clicked?: boolean
}
interface ProgressProps {
    width: number
}
const ButtonClickAnimation = keyframes`
    0% {
        transform: scale(1);
        filter: blur(0px);
        opacity: 1;
        color: ${colors.textPrimary}
    }
    100% {
        transform: scale(0.8);
        filter: blur(4px);
       /* opacity: 0;*/
        color:${colors.primary}
    }
`


const Forward10Button = styled(Forward10) <ButtonProps>`
    width: 3rem;
    margin: 0 0.5rem;
    animation: ${props => props.clicked ? ButtonClickAnimation : ""} 0.2s cubic-bezier(0.165, 0.840, 0.440, 1.000) both reverse;
`
const Replay10Button = styled(Replay10) <ButtonProps>`
    width: 3rem;
    margin: 0 0.5rem;
    animation: ${props => props.clicked ? ButtonClickAnimation : ""} 0.2s cubic-bezier(0.165, 0.840, 0.440, 1.000) both reverse;
`

const Forward2Button = styled(Forward2) <ButtonProps>`
    width: 3rem;
    margin: 0 0.5rem;
    animation: ${props => props.clicked ? ButtonClickAnimation : ""} 0.2s cubic-bezier(0.165, 0.840, 0.440, 1.000) both reverse;
`
const BackwardButton = styled(Backward) <ButtonProps>`
    width: 3rem;
    margin: 0 0.5rem;
    animation: ${props => props.clicked ? ButtonClickAnimation : ""} 0.2s cubic-bezier(0.165, 0.840, 0.440, 1.000) both reverse;
`

const PlayCircleButton = styled(PlayCircle) <ButtonProps>`
    width: 5rem;
    margin: 0 0.5rem;
    animation: ${props => props.clicked ? ButtonClickAnimation : ""} 0.2s cubic-bezier(0.165, 0.840, 0.440, 1.000) both reverse;
`
const PauseCircleButton = styled(PauseCircle) <ButtonProps>`
    width: 5rem;
    margin: 0 0.5rem;
    animation: ${props => props.clicked ? ButtonClickAnimation : ""} 0.2s cubic-bezier(0.165, 0.840, 0.440, 1.000) both reverse;
`
const MenueContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 15vh;
    background-color: ${colors.bgPrimary}bd
`
const ProgressContainer = styled.div`
    width: 90%;
`
const StyledFlagCheckered = styled(FlagCheckered)`
    width: 2.5rem;
    position:absolute;
    top: 0%;
    right:0%;
    transform: translate(20px, -33px);     
`
const StyledCarSport = styled(CarSport)`
    width: 2rem;
    transform: translate(10px, -27px);  
`
const StyledToriiGate = styled(ToriiGate)`
    width: 2rem;
    position:absolute;
    top: 0%;
    left:0%;
    transform: translate(0px, -33px); 
`
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 100%;
    align-items: center;
    position: relative;
`
const StyledVideo = styled.video`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center  ;   
`
const TimeContainer = styled.div`
    width: 6rem;
    display: flex;
    flex-direction: row;
`
const CurrentTimeBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`
const SpeedBox = styled.div`
    position: absolute;
    left: 20%;
`
const ProgressBox = styled.div`   
    height: 100%
    width:100%;
    background-color: ${colors.textPrimary};
    border-radius: 10px;
    margin-top:1rem;
    height:1rem;
    position: relative;

`
const ProgressElement = styled.div<ProgressProps>`
    height:100%;
    width: ${props => props.width}%;
    background-color: ${colors.primary};
    border-radius: 10px;
    text-align: right;
    
`
type VideoProps = {
    url: string,
    closeVideo: () => void
}
type ClickedButton = "play" | "pause" | "+10" | "-10" | "fast" | "slow" | null

const VideoPlayer: React.FC<VideoProps> = ({ url, closeVideo }) => {
    const video = useRef<HTMLVideoElement>(null)
    //const progress = useRef<HTMLProgressElement>(null)
    const [playing, setPlaying] = useState<boolean>(true)
    const [currentTime, setCurrentTime] = useState(0)
    const [videoDuration, setVideoDuration] = useState<number>(0)
    const [speed, setSpeed] = useState<1 | 2 | 3 | 4>(1)
    const [buttonClicked, setButtonClicked] = useState<ClickedButton>(null)
    const [progress, setProgress] = useState<number>(0)

    //progress loop
    useEffect(() => {
        if (video.current) setVideoDuration(Math.round(video.current.duration))
        let intervalLoop = setInterval(() => {
            let prog
            if (video.current) {
                prog = Math.round((video.current?.currentTime / video.current?.duration) * 100)
                setProgress(prog)
                setCurrentTime(Math.round(video.current?.currentTime))
                if (prog === 100) setPlaying(false)
            }
        }, 100)
        return () => clearInterval(intervalLoop)
    })
    useEffect(() => {
        let speedLoop = setInterval(() => {
            console.log("Speed ", speed)
            if (speed === 1) clearInterval(speedLoop)
            if (speed === 2) if (video.current) video.current.currentTime += 10.0
            if (speed === 3) if (video.current) video.current.currentTime += 60.0
            if (speed === 4) if (video.current) video.current.currentTime += 120.0
        }, 1000)
        return () => clearInterval(speedLoop)
    }, [speed])




    const playPauseHandle = () => {
        if (playing) {
            video.current?.pause()
            setPlaying(false)
            setButtonClicked("play")
            //setSpeed(1)
        }
        else {
            video.current?.play()
            setPlaying(true)
            setSpeed(1)
            setButtonClicked("pause")
        }
    }
    const fastForward = () => {
        if (video.current) {
            if (speed === 1) setSpeed(2)
            if (speed === 2) setSpeed(3)
            if (speed === 3) setSpeed(4)
            setButtonClicked("fast")
        }
        //console.log("Speed", video.current?.playbackRate)
    }
    const fastBack = () => {
        if (video.current) {
            if (video.current) {
                if (speed === 2) setSpeed(1)
                if (speed === 3) setSpeed(2)
                if (speed === 4) setSpeed(3)
                setButtonClicked("slow")
            }
        }


    }
    const moveUp10Sec = () => {
        if (video.current) video.current.currentTime += 10.0
        setButtonClicked("+10")
    }
    const moveDown10Sec = () => {
        if (video.current) video.current.currentTime -= 10.0
        setButtonClicked("-10")
    }

    //return progress

    //progressLoop()
    return (
        <div>
            <StyledVideo ref={video} autoPlay >
                <source src={url} type="video/mp4" />
            </StyledVideo>
            <button onClick={closeVideo} >Close</button>
            <MenueContainer>
                <ProgressContainer>
                    <ProgressBox>
                        {/* <StyledFlagCheckered />
                        <StyledToriiGate/> */}
                        <ProgressElement width={progress}><StyledCarSport /></ProgressElement>
                    </ProgressBox>
                    {/* <Progress ref={progress} max="100" value="0" /> */}
                </ProgressContainer>
                <ButtonContainer>
                    <SpeedBox>
                        Speed:{speed}X
                    </SpeedBox>
                    <CurrentTimeBox>
                        <TimeContainer>
                            <div>
                                {currentTime / 60 > 0 ? `${Math.floor(currentTime / 60)}:` : ""}
                            </div>
                            <div>
                                {currentTime}s
                        </div>
                        </TimeContainer>
                    </CurrentTimeBox>
                    <div>
                        <BackwardButton clicked={buttonClicked === "slow" ? true : false} onClick={fastBack} />
                        <Replay10Button clicked={buttonClicked === "-10" ? true : false} onClick={moveDown10Sec} />
                        {playing ? <PauseCircleButton clicked={buttonClicked === "pause" ? true : false} onClick={playPauseHandle} /> : <PlayCircleButton clicked={buttonClicked === "play" ? true : false} onClick={playPauseHandle} />}
                        <Forward10Button clicked={buttonClicked === "+10" ? true : false} onClick={moveUp10Sec} />
                        <Forward2Button clicked={buttonClicked === "fast" ? true : false} onClick={fastForward} />
                    </div>
                    <TimeContainer>
                        <div>
                            {videoDuration / 60 > 0 ? `${Math.floor(videoDuration / 60)}:` : ""}
                        </div>
                        <div>
                            {videoDuration}s
                        </div>
                    </TimeContainer>
                </ButtonContainer>
            </MenueContainer>





        </div>
    )
}


export default VideoPlayer