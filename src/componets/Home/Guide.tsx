import React from "react"
import styled, { keyframes } from 'styled-components';
import { videoDisType, videoDisListType } from "./index"
import moment from 'moment';
import {colors} from "../../constants"

const jelloHorizontal = keyframes`
    0% {
        transform: scale3d(1, 1, 1);
    }
    30% {
        transform: scale3d(1.25, 0.75, 1);
    }
    40% {
        transform: scale3d(0.75, 1.25, 1);
    }
    50% {
        transform: scale3d(1.15, 0.85, 1);
    }
    65% {
        transform: scale3d(0.95, 1.05, 1);
    }
    75% {
        transform: scale3d(1.05, 0.95, 1);
    }
    100% {
        transform: scale3d(1, 1, 1);
    }
`
const CategorRow = styled.div`
    display: flex;
    color: ${colors.textPrimary};
    background-color: ${colors.bgSecondary};
    flex-direction: row;
    align-items: stretch;
    width: 100%;
    margin: 20px 0;
    min-height: 150px;
    height: 15vh;    
`
const SelectedCategorRow = styled(CategorRow)`
    border: solid ${colors.borderPrimary} 2px;
    box-shadow: 0px 0px 50px 5px ${colors.borderPrimary};
`


const DateBox = styled.div`    
    flex-grow: 1;
    font-size: 2em;
    background-color: ${colors.primary};
    /*color: ${colors.textSecondary};*/
    flex-basis: 15%;
    min-width: 150px;
    /*padding-left: 10px;*/
    /*padding-right: 10px;*/
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const TimeBox = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.8em;
    flex-basis: 15%;
    min-width: 150px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
`
const ImageBox = styled.div`    
    flex-grow: 1;
    flex-basis: 15%;
    min-width: 150px;    
    height : 100%;
    
`
const DiscriptionBox = styled.div`    
    flex-grow: 4;
    flex-basis: 55%;
    display: block;
    padding: 15px;
`

const Image = styled.img`    
    width: 100%;
    height: 100%;
    border-radius: 5px;
    
`
const DisTitleBox = styled.div`
    display: flex;
    justify-content: space-between;
`
const DisTitle = styled.div`
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 5px;
    color: ${colors.textSecondary};
`
const DisLife = styled.div`
    color: ${colors.textPrimary};
    background-color: ${colors.bgAtention};    
    padding: 0.25em;
    font-weight: 700;
    text-align: center;
    border-radius: 0.25rem;
    height: 1.5rem;
`
const DisLifeAnime = styled(DisLife)`    
    animation: ${jelloHorizontal}  0.9s both;
`

const DisFacility = styled.div`
    font-size: 1em;
    color: gray;
    margin: 10px 0;
`
const DisDiscription = styled.div`
    max-height: 45px;
    overflow: hidden;
`


type GuideProps = {
    sellIndex: number,    
    categoriesContent: videoDisType[],
    selectedCol: number,
    selectedRow: number

}; /* could also use interface */



const Guide = ({ sellIndex, categoriesContent, selectedCol, selectedRow }: GuideProps) => {
    const CategoryData = (el: videoDisListType, anime: boolean) => {
        return (
            <>
                <DateBox>
                    <div>{moment(el.metadata.start_time).format("D")}</div>
                    <div>{moment(el.metadata.start_time).format("MMM")}</div>
                </DateBox>
                <TimeBox>
                    <div>{moment(el.metadata.start_time).format("LT")}</div>
                    <div>{el.metadata.timezone}</div>
                </TimeBox>
                <ImageBox><Image src={el.smallImage} alt="Imag"></Image></ImageBox>
                <DiscriptionBox>
                    <DisTitleBox>
                        <DisTitle>{el.title}</DisTitle>
                        {el.metadata.live ? anime ? <DisLifeAnime>LIVE</DisLifeAnime> : <DisLife>LIVE</DisLife> : ""}
                    </DisTitleBox>
                    <DisFacility>{el.metadata.facility.name}</DisFacility>
                    <DisDiscription>{el.description}</DisDiscription>
                </DiscriptionBox>
            </>
        )
    }
    return (
        <>
            {categoriesContent[sellIndex].list.map((el, colIndex) => {
                if (selectedRow === sellIndex) {
                    if (colIndex >= selectedCol) {
                        if (colIndex === selectedCol) {
                            return (<SelectedCategorRow key={colIndex} >{CategoryData(el, true)}</SelectedCategorRow>)
                        } else {
                            return (<CategorRow key={colIndex} >{CategoryData(el, false)}</CategorRow>)
                        }
                    } else return true
                } else return (<CategorRow key={colIndex} >{CategoryData(el, false)}</CategorRow>)

            })}

        </>

    )
}


export default Guide