import React from "react"
import styled, { keyframes } from 'styled-components';
import {colors} from "../../constants"


const hourglass = keyframes`
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
`
const Spin = styled.div`
  top: 45%;
  left:45%;
  display: inline-block;
  position: relative;
  width: 150px;
  height: 150px;
  &:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 75px solid #fff;
    border-color: ${colors.textPrimary} transparent ${colors.textPrimary} transparent;
    animation: ${hourglass} 1.2s infinite;
`
const LoadingComponent = styled.div`
  width: 100vw;
  height:100vh
`
export const Loading:React.FC = ()=>(<LoadingComponent><Spin ></Spin></LoadingComponent>)