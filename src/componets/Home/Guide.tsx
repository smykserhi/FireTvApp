import styled, { keyframes } from 'styled-components';
import { videoDisListType, ListProps } from "./index"
import moment from 'moment';
import { colors } from "../../constants"
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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
const selectedCategory = keyframes`
    from{
        transform: scale(1) ; 
        opacity: 1;
    }
    to{
        transform: scale(0.4) ; 
        margin-top: -170px;
        opacity: 0;
    }    
`
const MainBox = styled.div`
    z-index:1;
    width: 90%;
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
    &.category-enter.category-enter-active {   
        animation: ${selectedCategory}  0.4s ease-in-out reverse;            
    }     
    &.category-exit.category-exit-active {   
        animation: ${selectedCategory}  0.4s ease-in-out ;     
    }
`

const DateBox = styled.div`    
    flex-grow: 1;
    font-size: 2em;
    background-color: ${colors.primary};
    /*color: ${colors.textSecondary};*/
    flex-basis: 15%;
    min-width: 150px;    
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
    text-shadow: 2px 2px #130f10;
`
const DisLifeAnime = styled(DisLife)`    
    animation: ${jelloHorizontal}  0.9s both;
`

const DisFacility = styled.div`
    font-size: 1.3rem;
    color: gray;
    margin: 10px 0;
`
const DisDiscription = styled.div`
    max-height: 40px;
    overflow: hidden;
`

const Guide = ({ sellIndex, categoriesContent, selectedCol, selectedRow }: ListProps) => {
    const CategoryData = (el: videoDisListType, anime: boolean) => {
        return (
            <>
                <DateBox>
                    <div>{moment(el.metadata.start_time).format("D")}</div>
                    <div>{moment(el.metadata.start_time).format("MMM")}</div>
                </DateBox>
                <TimeBox>
                    <div>{moment.parseZone(el.metadata.start_time).format("hh:mm a")}</div>
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
        <MainBox>
            <TransitionGroup
                component={null}>                   
                {categoriesContent[sellIndex].list.map((el, colIndex) => {
                    if (selectedRow === sellIndex) {
                        if (colIndex >= selectedCol) {
                            if (colIndex === selectedCol) {
                                return (
                                    <CSSTransition timeout={300} classNames="category"  key={colIndex} >
                                        <SelectedCategorRow >
                                            {CategoryData(el, true)}
                                        </SelectedCategorRow>
                                    </CSSTransition>)
                            } else {
                                return (
                                    <CSSTransition timeout={300} classNames="category" key={colIndex} >
                                        <CategorRow  >
                                            {CategoryData(el, false)}
                                        </CategorRow>
                                    </CSSTransition>
                                )
                            }
                        } //else return <div></div>
                    } else return (
                        <CSSTransition timeout={200} classNames="category" key={colIndex} >
                            <CategorRow  >
                                {CategoryData(el, false)}
                            </CategorRow>
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        </MainBox>
    )
}

export default Guide