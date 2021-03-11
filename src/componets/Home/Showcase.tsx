import React from "react"
import styled, { keyframes } from 'styled-components';
import { ListProps } from "./index"
import { colors } from "../../constants"
var CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup')


const selectItem = keyframes`
    from{
        opacity: 1;
    }
    to{
        margin-left: -370px;
        opacity: 0;
    }
    
`
const selectedCategory = keyframes`
    from{
        transform: scale(1) ; 
        opacity: 1;
    }
    to{
        transform: scale(0.5) ; 
        margin-top: -170px;
        opacity: 0;
    }
    
`
const MainContainer = styled.div`
    z-index: 1; 
    &.category-enter.category-enter-active {   
        animation: ${selectedCategory}  0.3s ease-in-out reverse;            
    }     
    &.category-leave.category-leave-active {   
        animation: ${selectedCategory}  0.3s ease-in-out ;     
    }
`
const CategorRow = styled.div`
  display: flex;  
  flex-direction: row;
  margin-bottom: 20px;
  overflow: hidden;  
  align-items: flex-start;
  font-size: 25px;
`

const VideoElementShowcase = styled.div`  
  margin: 10px;
  min-width: 450px;
  max-width: 450px;
  filter: opacity(65%);

`

const SelectedVideoElementShowcase = styled(VideoElementShowcase)`     
  min-width: 500px;
  font-size: 2rem;
  filter: opacity(100%);
  &.list-enter.list-enter-active {   
    animation: ${selectItem}  0.3s ease-in-out reverse;            
  }     
    &.list-leave.list-leave-active {   
    animation: ${selectItem}  0.3s ease-in-out ;     
  }
  
  
  `
const Image = styled.img`
  width: 100%;
  border-radius: 5px;

`
const SelectedImage = styled.img`
    /*box-shadow: 0px 0px 40px ${colors.borderPrimary};*/
    border: solid ${colors.borderPrimary} 4px;
    width: 100%;
    border-radius: 5px;
`
const VideoTitle = styled.div`
    
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;    
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`

const Showcase = ({ sellIndex, categoriesContent, selectedCol, selectedRow }: ListProps) => {    
    return (
        <MainContainer>
            <CSSTransitionGroup
                key={sellIndex}
                component={CategorRow}
                transitionName="list"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}>
                {categoriesContent[sellIndex].list.map((el, colIndex) => {
                    if (selectedRow === sellIndex) { ////if selected row
                        if (colIndex >= selectedCol) {//don't show elements before selected
                            if (sellIndex === selectedRow && colIndex === selectedCol) {
                                return (
                                    <SelectedVideoElementShowcase key={colIndex} >
                                        <SelectedImage src={el.smallImage} alt="Imag"></SelectedImage>
                                        <VideoTitle>{el.title}</VideoTitle>
                                    </SelectedVideoElementShowcase>
                                )
                            } else {
                                return (
                                    <VideoElementShowcase key={colIndex} >
                                        <Image src={el.smallImage} alt="Imag"></Image>
                                        <VideoTitle>{el.title}</VideoTitle>
                                    </VideoElementShowcase>
                                )
                            }
                        } else return false
                    } else {
                        return (
                            <VideoElementShowcase key={colIndex} >
                                <Image src={el.smallImage} alt="Imag"></Image>
                                <div>{el.title}</div>
                            </VideoElementShowcase>
                        )
                    }
                })}
            </CSSTransitionGroup>
        </MainContainer>
    )
}


export default Showcase