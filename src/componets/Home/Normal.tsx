import React from "react"
import styled from 'styled-components';
import { ListProps } from "./index"
import {colors} from "../../constants"


const CategorRow = styled.div`
  display: flex;  
  flex-direction: row;
  margin-bottom: 20px;
  overflow: hidden;
  align-items: flex-start;
  font-size: 25px;
`
const VideoElementNormal = styled.div`  
  margin: 10px;
  min-width: 300px;
  max-width: 300px;
  margin-top: 25px;
  
`

const SelectedVideoElementNormal = styled(VideoElementNormal)`    
  /*border: ${colors.primary} 3px solid;*/ 
    min-width: 450px;  
    margin-top: 0;
  
`
const Title = styled.div`
    font-size: 1.5rem;
`
const Image = styled.img`    
    width: 100%;
    border-radius: 5px;
    
`
const SelectedImage = styled.img`
  box-shadow: 0px 0px 40px ${colors.borderPrimary};
  border: solid ${colors.borderPrimary} 2px;
  width: 100%;
  border-radius: 5px;
`
const VideoTitle = styled.div`
    /*max-height: 55px;*/
    overflow: hidden;
`

const Normal = ({ sellIndex, categories, categoriesContent, selectedCol, selectedRow }: ListProps) => {
    return (
        <>
            <Title >{categories[sellIndex].name}</Title>
            <CategorRow key={sellIndex} >
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
                        }else return false
                    } else {
                        return (
                            <VideoElementNormal key={colIndex} >
                                <Image src={el.smallImage} alt="Imag"></Image>
                                <VideoTitle>{el.title}</VideoTitle>
                            </VideoElementNormal>
                        )
                    }
                })}
            </CategorRow>
        </>

    )
}


export default Normal