import React from "react"
import styled, {keyframes} from 'styled-components';
import { colors } from "../../constants"
import { HomeAlt } from "@styled-icons/boxicons-regular/HomeAlt"
import { SearchEye } from "@styled-icons/remix-fill/SearchEye"
import { Settings } from "@styled-icons/material-twotone/Settings"




interface MenuProps{
    expand: boolean, 
}
interface MenuElementProps {   
    selected: boolean,
    
}
const menuItem = keyframes`
    from{        
        opacity:0.5 ;
    }
    to{        
        opacity: 1;        
    }    
`

const MenuBox = styled.div<MenuProps>`
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.expand ? 200 : 60}px;
    height: 100vh;
    background-color: ${colors.bgSideMenu};
    z-index: 10;
    opacity: 0.9;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;    
    transition: width 0.4s 
`
const ItemContainer = styled.div`
width: 100%;    
`
const MenuElement = styled.div<MenuElementProps>`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    overflow: hidden;
    height: 4.5vh;
    font-size: 2rem;
    width: 100%;
    margin: 10px 0;    
    animation: ${menuItem}  0.3s ease-in-out ;  
    color: ${props=>props.selected? colors.primary:""};
    opacity: 1;
`

const HomeIcon = styled(HomeAlt)`
    height: 100%;   
`
const SearchIcon = styled(SearchEye)`
    height: 100%;    
`
const SettingsIcon = styled(Settings)`
    height: 100%;    
`

interface SideMenuProps {
    expand: boolean, 
    selected: "home"|"search"|"settings"|null ,
}

export const SideMenu: React.FC<SideMenuProps> = ({ expand,selected }) => {    
    return (<MenuBox expand={expand}>
        <ItemContainer>
            <MenuElement selected={selected==="home"? true:false}>
                <HomeIcon />
                {expand?<div>Home</div>:""}
            </MenuElement>
            <MenuElement selected={selected==="search"? true:false}>
                <SearchIcon />
                {expand?<div>Search</div>:""}                
            </MenuElement>
            <MenuElement selected={selected==="settings"? true:false}>
                <SettingsIcon />
                {expand?<div>Settings</div>:""}                
            </MenuElement>
        </ItemContainer>
    </MenuBox>)
}

