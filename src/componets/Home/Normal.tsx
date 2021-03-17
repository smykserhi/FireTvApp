import styled, { keyframes } from 'styled-components';
import { ListProps } from "./index"
import { colors } from "../../constants"
import { CSSTransition, TransitionGroup } from 'react-transition-group' 

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
    z-index: 1; 
    &.category-enter.category-enter-active {   
        animation: ${selectedCategory}  0.4s ease-in-out reverse;            
    }     
    &.category-exit.category-exit-active {   
        animation: ${selectedCategory}  0.4s ease-in-out ;     
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
    min-width: 15vw;
    max-width: 15vw;
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
    &.list-exit.list-exit-active {   
        animation: ${selectItem}  0.3s ease-in-out ;     
      }
`
const Title = styled.div`
    font-size: 2rem;
`
const Image = styled.img`    
    width: 100%;
    border-radius: 5px;    
`
const SelectedImage = styled.img`  
  border: solid ${colors.borderPrimary} 2px;
  width: 100%;
  border-radius: 5px;
  transform: translateY(-20px);
`
const VideoTitle = styled.div`
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;    
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`


const Normal = ({ sellIndex, categories, categoriesContent, selectedCol, selectedRow }: ListProps) => {
    return (
        <MainContainer>
            <Title >{categories[sellIndex].name}</Title>
            <CategorRow>
                <TransitionGroup
                    component={null}>
                    {categoriesContent[sellIndex].list.map((el, colIndex) => {
                        if (selectedRow === sellIndex) { //if selected row
                            if (colIndex >= selectedCol) {//don't show elements before selected
                                if (sellIndex === selectedRow && colIndex === selectedCol) {
                                    return (
                                        <CSSTransition timeout={200} classNames="list" key={el.title}>
                                            <SelectedVideoElementNormal key={colIndex} >
                                                <SelectedImage src={el.smallImage} alt="Imag"></SelectedImage>
                                                <VideoTitle>{el.title}</VideoTitle>
                                            </SelectedVideoElementNormal>
                                        </CSSTransition>
                                    )
                                } else {
                                    return (
                                        <CSSTransition timeout={200} classNames="list" key={el.title}>
                                            <VideoElementNormal key={colIndex} >
                                                <Image src={el.smallImage} alt="Imag"></Image>
                                                <VideoTitle>{el.title}</VideoTitle>
                                            </VideoElementNormal>
                                        </CSSTransition>
                                    )
                                }
                            } else return false
                        } else {
                            return (
                                <CSSTransition timeout={200} classNames="list" key={el.title}>
                                    <VideoElementNormal key={colIndex} >
                                        <Image src={el.smallImage} alt="Imag"></Image>
                                        <VideoTitle>{el.title}</VideoTitle>
                                    </VideoElementNormal>
                                </CSSTransition>
                            )
                        }
                    })}
                </TransitionGroup>
            </CategorRow>
        </MainContainer>
    )
}


export default Normal