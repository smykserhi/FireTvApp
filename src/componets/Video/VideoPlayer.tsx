import React, { useRef, useState, useEffect } from "react"
import styled, { keyframes } from 'styled-components';
import { Forward10 } from "@styled-icons/material/Forward10"
import { Replay10 } from "@styled-icons/material/Replay10"
import { Forward2 } from "@styled-icons/icomoon/Forward2"
import { Backward } from "@styled-icons/icomoon/Backward"
import { PlayCircle } from "@styled-icons/fa-regular/PlayCircle"
import { PauseCircle } from "@styled-icons/fa-regular/PauseCircle"
import { colors, hexToRGBA } from "../../constants"
import { CarSport } from "@styled-icons/ionicons-sharp/CarSport"
import { Speedometer2 } from "@styled-icons/bootstrap/Speedometer2"
import { Loading } from "../Loading"




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
const ButtonClickAnimation2 = keyframes`
    0% {
        transform: scale(1);
        filter: blur(0px);
        opacity: 1;
        color: ${colors.textPrimary}
    }
    100% {
        transform: scale(0.8);
        filter: blur(5px);
       /* opacity: 0;*/
        color:${colors.primary}
    }
`



const Forward10Button = styled(Forward10) <ButtonProps>`
    width: 3rem;
    margin: 0 0.5rem;
    animation: ${props => props.clicked ? ButtonClickAnimation : ButtonClickAnimation2} 0.1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both reverse;
`
const Replay10Button = styled(Replay10) <ButtonProps>`
    width: 3rem;
    margin: 0 0.5rem;
    animation: ${props => props.clicked ? ButtonClickAnimation : ButtonClickAnimation2} 0.1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both reverse;
`

const Forward2Button = styled(Forward2) <ButtonProps>`
    width: 3rem;
    margin: 0 0.5rem;
    animation: ${props => props.clicked ? ButtonClickAnimation : ButtonClickAnimation2} 0.1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both reverse;
`
const BackwardButton = styled(Backward) <ButtonProps>`
    width: 3rem;
    margin: 0 0.5rem;
    animation: ${props => props.clicked ? ButtonClickAnimation : ButtonClickAnimation2} 0.1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both reverse;
`

const PlayCircleButton = styled(PlayCircle) <ButtonProps>`
    width: 5rem;
    margin: 0 0.5rem;
    animation: ${props => props.clicked ? ButtonClickAnimation : ButtonClickAnimation2} 0.1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both reverse;
`
const PauseCircleButton = styled(PauseCircle) <ButtonProps>`
    width: 5rem;
    margin: 0 0.5rem;
    animation: ${props => props.clicked ? ButtonClickAnimation : ButtonClickAnimation2} 0.1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both reverse;
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
    background-color:  ${hexToRGBA(colors.bgPrimary, 0.7)};
`
const ProgressContainer = styled.div`
    width: 90%;
`

const StyledCarSport = styled(CarSport) <ProgressProps>`
    width: 3rem;
    transform: translate(-5px, -35px); 
    margin-left: ${props => props.width}%;
    color: ${colors.primary}
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
    top: 40%;
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
    border-radius: 10px 0px 0px 10px;
    text-align: right;
    
`
const StyledSpeedometer2 = styled(Speedometer2)`
    width: 2rem;
    color: ${colors.primary};
    margin-left: 0.5rem;
    transform: translateY(-5px);
`



type VideoProps = {
    url: string,
    closeVideo?: () => void,
    play_pause: boolean,
    speedUp: boolean,
    speedDown: boolean,
    plus10s: boolean,
    minus10s: boolean
}



const VideoPlayer: React.FC<VideoProps> = ({ url, closeVideo, play_pause, speedUp, speedDown, plus10s, minus10s }) => {
    const video = useRef<HTMLVideoElement>(null)
    //const progress = useRef<HTMLProgressElement>(null)
    const [playing, setPlaying] = useState<boolean>(true)
    const [backSpeed, setBackSpeed] = useState<boolean>(true)
    const [forwardSpeed, setForwardSpeed] = useState<boolean>(true)
    const [plus10Sec, setPlus10Sec] = useState<boolean>(true)
    const [minus10Sec, setMinus10Sec] = useState<boolean>(true)
    const [currentTime, setCurrentTime] = useState(0)
    const [videoDuration, setVideoDuration] = useState<number>(0)
    const [speed, setSpeed] = useState<1 | 2 | 3 | 4>(1)
    const [progress, setProgress] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)



    const usePrevious = (value: VideoProps) => {
        const ref = useRef<VideoProps>();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const previousProps = usePrevious({ url, play_pause, speedUp, speedDown, plus10s, minus10s })

    useEffect(() => {
        console.log("eff", loading)
        if (!loading) {
            console.log("eff2")
            if (previousProps?.play_pause !== play_pause) playPauseHandle()
            if (previousProps?.speedUp !== speedUp) {
                console.log("Up")
                fastForward()
            }
            if (previousProps?.speedDown !== speedDown) fastBack()
            if (previousProps?.plus10s !== plus10s) moveUp10Sec()
            if (previousProps?.minus10s !== minus10s) moveDown10Sec()
        } else {
            setLoading(false)
        }

    }, [play_pause, speedUp, speedDown, plus10s, minus10s])



    //progress loop
    useEffect(() => {
        let intervalLoop = setInterval(() => {
            let prog
            if (video.current) {
                setVideoDuration(video.current?.duration)
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

    //Speed icons
    const Speed = () => {
        let SpeedX = []
        for (let i = 0; i < speed; i++) {
            SpeedX.push(<StyledSpeedometer2 key={i} />)
        }
        return SpeedX
    }

    const playPauseHandle = () => {
        if (playing) {
            video.current?.pause()
            setPlaying(false)
            setSpeed(1)

            //setSpeed(1)
        }
        else {
            video.current?.play()
            setPlaying(true)
            setSpeed(1)

        }
    }
    const fastForward = () => {
        console.log("Speed up")
        if (video.current) {
            if (speed === 1) setSpeed(2)
            if (speed === 2) setSpeed(3)
            if (speed === 3) setSpeed(4)
            setForwardSpeed(!forwardSpeed)
        }

    }
    const fastBack = () => {
        if (video.current) {
            if (video.current) {
                if (speed === 2) setSpeed(1)
                if (speed === 3) setSpeed(2)
                if (speed === 4) setSpeed(3)
                setBackSpeed(!backSpeed)
            }
        }
    }
    const moveUp10Sec = () => {
        if (video.current) video.current.currentTime += 10.0
        setPlus10Sec(!plus10Sec)
    }
    const moveDown10Sec = () => {
        if (video.current) video.current.currentTime -= 10.0
        setMinus10Sec(!minus10Sec)
    }

    //return progress

    //progressLoop()
   
    return (
        <>

            <div>
                <StyledVideo ref={video} autoPlay id="video">
                    <source src={url} type="application/x-mpegURL" />
                    {/* <source src={url} type="video/mp4" /> */}

                </StyledVideo>
                {loading ? <Loading /> : ""}
                <button onClick={closeVideo} >Close</button>
                <MenueContainer>
                    <ProgressContainer>
                        <ProgressBox>
                            {/* <StyledFlagCheckered />
                        <StyledToriiGate/> */}
                            <ProgressElement width={progress}> </ProgressElement><StyledCarSport width={progress} />
                        </ProgressBox>
                        {/* <Progress ref={progress} max="100" value="0" /> */}
                    </ProgressContainer>
                    <ButtonContainer>
                        <SpeedBox>
                            Speed:{Speed()}
                        </SpeedBox>
                        <CurrentTimeBox>
                            <TimeContainer>
                                {Math.floor(currentTime / 60) > 0 ? `${Math.floor(currentTime / 60)}:` : ""}
                                {currentTime - (Math.floor(currentTime / 60) * 60)}

                            </TimeContainer>
                        </CurrentTimeBox>
                        <div>
                            {backSpeed ? <BackwardButton clicked={true} onClick={fastBack} /> : <BackwardButton clicked={false} onClick={fastBack} />}
                            {minus10Sec ? <Replay10Button clicked={true} onClick={moveDown10Sec} /> : <Replay10Button clicked={false} onClick={moveDown10Sec} />}
                            {playing ? <PauseCircleButton clicked={play_pause} onClick={playPauseHandle} /> : <PlayCircleButton clicked={play_pause} onClick={playPauseHandle} />}
                            {plus10Sec ? <Forward10Button clicked={true} onClick={moveUp10Sec} /> : <Forward10Button clicked={false} onClick={moveUp10Sec} />}
                            {forwardSpeed ? <Forward2Button clicked={true} onClick={fastForward} /> : <Forward2Button clicked={false} onClick={fastForward} />}
                        </div>
                        <TimeContainer>
                            {Math.floor(Math.floor(videoDuration / 60) / 60) > 0 ? `${Math.floor(Math.floor(videoDuration / 60) / 60)}:` : ""}
                            {Math.floor(videoDuration / 60) > 0 ? `${Math.floor(videoDuration / 60) - Math.floor(Math.floor(videoDuration / 60) / 60) * 60}:` : ""}
                            {(videoDuration - (Math.floor(videoDuration / 60) * 60)).toFixed(0)}
                        </TimeContainer>
                    </ButtonContainer>
                </MenueContainer>
            </div>
        </>
    )
}

export default VideoPlayer