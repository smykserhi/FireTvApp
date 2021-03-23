import styled, { keyframes } from 'styled-components';
import { ListProps } from "./index"
import { colors } from "../../constants"

const selectedCategory = keyframes`
    from{        
        transform: scale(1.3) translateY(-20px);
        opacity: 1;
    }
    to{
        transform: scale(1) translateY(0px)   ;   
        opacity: 0;
    }    
`

const CategorRow = styled.div`
    display: grid;
    padding-right: 4vw;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: start;
    gap: 15px;
    font-size: 25px;
    z-index: 1; 
    width: 93%;
`
const VideoElementNormal = styled.div`     
    min-width: 14vw;   
`

const Image = styled.img`    
    width: 100%;
    border-radius: 5px;    
`
const SelectedImage = styled.img`
  border: solid ${colors.borderPrimary} 2px;
  width: 100%;
  border-radius: 5px; 
  transform: scale(1.3) translateY(-20px);
  animation: ${selectedCategory}  0.3s ease-in-out  reverse; 
`
const SearchResultTitle = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

const Full = ({ sellIndex, categoriesContent, selectedCol, selectedRow }: ListProps) => {
    return (
        <CategorRow>
            {categoriesContent[sellIndex].list.map((el, colIndex) => {
                if(selectedRow >=0){
                    if (colIndex >= Math.floor(selectedCol / 5) * 5 ) {//show only selected row                        
                        if (sellIndex === selectedRow && colIndex === selectedCol) {
                            return (
                                <VideoElementNormal key={colIndex} >
                                    <SelectedImage src={el.smallImage} alt="Imag"></SelectedImage>
                                    <SearchResultTitle>{el.title}</SearchResultTitle>
                                </VideoElementNormal>
                            )
                        } else {
                            return (
                                <VideoElementNormal key={colIndex} >
                                    <Image src={el.smallImage} alt="Imag"></Image>
                                    <SearchResultTitle>{el.title}</SearchResultTitle>
                                </VideoElementNormal>
                            )
                        }
                    } else return false
                }else return (
                    <VideoElementNormal key={colIndex} >
                        <Image src={el.smallImage} alt="Imag"></Image>
                        <SearchResultTitle>{el.title}</SearchResultTitle>
                    </VideoElementNormal>
                )       
            })}
        </CategorRow>
    )
}
export default Full