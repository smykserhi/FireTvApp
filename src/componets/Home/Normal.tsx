import React from "react"
import styled, { keyframes } from 'styled-components';
import { ListProps } from "./index"
import { colors } from "../../constants"
//import { CSSTransitionGroup } from 'react-transition-group'
var CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup')
const selectItem = keyframes`
    from{
        transform: scale(1.4) ; 
        opacity: 1;
    }
    to{
        transform: scale(1) ; 
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
  padding-top: 20px;
  overflow: hidden;
  align-items: flex-start;
  font-size: 25px;
  
`
const VideoElementNormal = styled.div` 
    flex:1;
  margin: 10px;  
  min-width: 300px;
  max-width: 300px;*/
  margin-top: 25px; 
  filter: opacity(65%);

`

const SelectedVideoElementNormal = styled(VideoElementNormal)`    
    margin: 70px;  
    transform: scale(1.4) ;
    filter: opacity(100%);
    &.list-enter.list-enter-active {   
        animation: ${selectItem}  0.3s ease-in-out reverse;            
      }     
    &.list-leave.list-leave-active {   
        animation: ${selectItem}  0.3s ease-in-out ;     
      }
`
const Title = styled.div`
    font-size: 1.5rem;
`
const Image = styled.img`    
    width: 100%;
    border-radius: 5px;
    
`
const SelectedImage = styled.img`
  /*box-shadow: 0px 0px 40px ${colors.borderPrimary};*/
  border: solid ${colors.borderPrimary} 2px;
  width: 100%;
  border-radius: 5px;
  transform: translateY(-20px);
`
const VideoTitle = styled.div`
    /*max-height: 55px;*/
    overflow: hidden;
`


const Normal = ({ sellIndex, categories, categoriesContent, selectedCol, selectedRow }: ListProps) => {
    return (
        <MainContainer>
            <Title >{categories[sellIndex].name}</Title>
            <CSSTransitionGroup
                key={sellIndex}
                component={CategorRow}
                transitionName="list"
                transitionEnterTimeout={200}                
                transitionLeaveTimeout={200}>                
                {categoriesContent[sellIndex].list.map((el, colIndex) => {
                    if (selectedRow === sellIndex) { //if selected row
                        if (colIndex >= selectedCol) {//don't show elements before selected
                            if (sellIndex === selectedRow && colIndex === selectedCol) {
                                return (
                                    <SelectedVideoElementNormal key={colIndex} >
                                        <SelectedImage src={el.smallImage} alt="Imag"></SelectedImage>
                                        <VideoTitle>{el.title}</VideoTitle>
                                    </SelectedVideoElementNormal>
                                )
                            } else {
                                return (
                                    <VideoElementNormal key={colIndex} >
                                        <Image src={el.smallImage} alt="Imag"></Image>
                                        <VideoTitle>{el.title}</VideoTitle>
                                    </VideoElementNormal>
                                )
                            }
                        } else return false
                    } else {
                        return (
                            <VideoElementNormal key={colIndex} >
                                <Image src={el.smallImage} alt="Imag"></Image>
                                <VideoTitle>{el.title}</VideoTitle>
                            </VideoElementNormal>
                        )
                    }
                })}
            </CSSTransitionGroup>
        </MainContainer>

    )
}


export default Normal