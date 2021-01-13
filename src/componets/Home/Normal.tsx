import React from "react"
import styled from 'styled-components';
import { pageCategoriesType, videoDisType } from "./index"


const CategorRow = styled.div`
  display: flex;  
  flex-direction: row;
  margin-bottom: 20px;
  overflow: hidden;
  align-items: center;  
`
const VideoElementNormal = styled.div`  
  margin: 10px;
  min-width: 300px;
  max-width: 300px;
`

const SelectedVideoElementNormal = styled(VideoElementNormal)`    
  /*border: #ff0000 3px solid;*/ 
    min-width: 450px;  
  
`
const Title = styled.div`
    font-size: 1.5rem;
`
const Image = styled.img`    
    width: 100%;
    border-radius: 5px;
    
`
const SelectedImage = styled.img`
    box-shadow: 0px 0px 20px #37c237;
  width: 100%;
  border-radius: 5px;
`

type NormalProps = {
    sellIndex: number,
    categories: pageCategoriesType[],
    categoriesContent: videoDisType[],
    selectedCol: number,
    selectedRow: number

}; /* could also use interface */



const Normal = ({ sellIndex, categories, categoriesContent, selectedCol, selectedRow }: NormalProps) => {
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
                                        <div>{el.title}</div>
                                    </SelectedVideoElementNormal>
                                )
                            } else {
                                return (
                                    <VideoElementNormal key={colIndex} >
                                        <Image src={el.smallImage} alt="Imag"></Image>
                                        <div>{el.title}</div>
                                    </VideoElementNormal>
                                )
                            }
                        }else return false
                    } else {
                        return (
                            <VideoElementNormal key={colIndex} >
                                <Image src={el.smallImage} alt="Imag"></Image>
                                <div>{el.title}</div>
                            </VideoElementNormal>
                        )
                    }
                })}
            </CategorRow>
        </>

    )
}


export default Normal