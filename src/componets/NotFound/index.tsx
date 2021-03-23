import styled from "styled-components"

const StyledDiv = styled.div`
    display: flex;
    justify-content : center;
    align-items: center;
    height: 100vh;
`

const  NotFound = ()=>{
    return (
        <StyledDiv>
            <h1>NotFound component</h1>
        </StyledDiv>
        
    )
}

export default NotFound