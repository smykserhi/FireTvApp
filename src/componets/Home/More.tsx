import styled, { keyframes } from 'styled-components';
import { page } from "./index"
import { colors, hexToRGBA } from "../../constants"
import {ArrowWithCircleDown} from"@styled-icons/entypo/ArrowWithCircleDown"
import {ArrowWithCircleUp} from "@styled-icons/entypo/ArrowWithCircleUp"

const moreList = keyframes`
  0% {
    transform: translateZ(0) rotateY(0);
    opacity: 1;
  }
  54% {
    transform: translateZ(-160px) rotateY(87deg);
    opacity: 1;
  }
  100% {
    transform: translateZ(-800px) rotateY(90deg);
    opacity: 0;
  }
`
const SelentedItem = keyframes`
    0% {
        
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
`

const MoreList = styled.div`
    position: absolute;
    top: 30%;
    left: 30%;
    background: ${hexToRGBA(colors.bgPrimary, 0.9)};
    min-width: 40vw;
    height: 40vh;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2.5rem;
    overflow: hidden;
    padding: 1rem;
    justify-content: start;
    border: solid 2px ${colors.textPrimary};
    border-radius: 5px;    
    &.more-enter.more-enter-active {   
        animation: ${moreList}  0.5s ease-in-out reverse;            
    }     
    &.more-leave.more-leave-active {   
        animation: ${moreList}  0.6s ease-in-out ;     
    }
`
const PagesElement = styled.div`
    margin: 0.3rem 0;
    font-weight: bold;
`
const SelectedPagesElement = styled(PagesElement)`
    color: ${colors.primary};
    width: 80%;
    text-align: center;
    border: solid 1px;
    border-radius: 8px;
    animation: ${SelentedItem} 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
`
const StyledH2 = styled.div`
    font-size: 3rem;
    /*position: absolute;*/
    top: 0;
    border-bottom: 2px solid;
    width: 90%;
    text-align: center;
`
const ElementsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`
const ArrowUp = styled(ArrowWithCircleUp)`
    width: 3rem;
    margin: 0.5rem 4rem;
`
const ArrowDown = styled(ArrowWithCircleDown)`
    width: 3rem;
    margin: 0.5rem 4rem;
`

interface MorePagesProps {
    pages: page[],
    selected: number
}
const MorePages = ({ pages, selected }: MorePagesProps) => {
    return (
        <MoreList>
            <StyledH2><ArrowUp/>Select page<ArrowDown/></StyledH2>
            <ElementsContainer>
                {pages.map((page, pagesIndex) => {                    
                    if (pagesIndex > selected - 3 && pagesIndex < selected + 3) {
                        if (pagesIndex === selected) return <SelectedPagesElement>{page.name}</SelectedPagesElement>
                        else return <PagesElement>{page.name}</PagesElement>
                    }else return false
                })}
            </ElementsContainer>
        </MoreList>
    )
}

export default MorePages