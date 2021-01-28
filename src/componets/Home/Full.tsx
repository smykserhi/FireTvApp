import React from "react"
import styled from 'styled-components';
import { ListProps } from "./index"
import { colors } from "../../constants"


const CategorRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: start;
    gap: 10px;
    font-size: 25px;
`
const VideoElementNormal = styled.div`  
    margin: 10px;
    min-width: 300px;
    max-width: 300px;
`

const SelectedVideoElementNormal = styled(VideoElementNormal)`    
    /*border: ${colors.primary} 3px solid;*/ 
        /*min-width: 450px;  */
        
  
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
  transform: scale(1.3) translateY(-20px);
`


const Full = ({ sellIndex, categories, categoriesContent, selectedCol, selectedRow }: ListProps) => {
    return (
        <CategorRow key={sellIndex} >
            {categoriesContent[sellIndex].list.map((el, colIndex) => {
                if (colIndex >= Math.floor(selectedCol / 5) * 5) {//show only selected row                        
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
                } else return false

            })}
        </CategorRow>
    )
}
export default Full