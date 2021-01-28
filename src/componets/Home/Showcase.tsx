import React from "react"
import styled from 'styled-components';
import {ListProps } from "./index"
import {colors} from "../../constants"


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
`

const SelectedVideoElementShowcase = styled(VideoElementShowcase)`    
  /*border: ${colors.primary} 5px solid;*/
  /*transform: scale(1.3) translateX(53px);*/
  /*margin-right: 150px;*/  
  min-width: 500px;
  
  
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

const Showcase = ({ sellIndex, categories, categoriesContent, selectedCol, selectedRow }: ListProps) => {
    return (
        <CategorRow key={sellIndex} >
            {categoriesContent[sellIndex].list.map((el, colIndex) => {
                if (selectedRow === sellIndex) { ////if selected row
                    if (colIndex >= selectedCol) {//don't show elements before selected
                        if (sellIndex === selectedRow && colIndex === selectedCol) {
                            return (
                                <SelectedVideoElementShowcase key={colIndex} >
                                    <SelectedImage src={el.smallImage} alt="Imag"></SelectedImage>
                                    <div>{el.title}</div>
                                </SelectedVideoElementShowcase>
                            )
                        } else {
                            return (
                                <VideoElementShowcase key={colIndex} >
                                    <Image src={el.smallImage} alt="Imag"></Image>
                                    <div>{el.title}</div>
                                </VideoElementShowcase>
                            )
                        }
                    }else return false
                } else {
                    return (
                        <VideoElementShowcase key={colIndex} >
                            <Image src={el.smallImage} alt="Imag"></Image>
                            <div>{el.title}</div>
                        </VideoElementShowcase>
                    )
                }


            })}
        </CategorRow>


    )
}


export default Showcase