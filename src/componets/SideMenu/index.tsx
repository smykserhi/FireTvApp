import React from "react"
import styled, { keyframes } from 'styled-components';
import { colors } from "../../constants"
import { HomeAlt } from "@styled-icons/boxicons-regular/HomeAlt"
import { SearchEye } from "@styled-icons/remix-fill/SearchEye"
import { Settings } from "@styled-icons/material-twotone/Settings"
import { ListCircle } from "@styled-icons/ionicons-outline/ListCircle"




interface MenuProps {
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
    left: 3.5%;
    width: ${props => props.expand ? 20 : 4}rem;
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
    height: 4rem;
    font-size: 2.5rem;
    width: 100%;
    margin: 3rem 0;    
    animation: ${menuItem}  0.3s ease-in-out ;  
    color: ${props => props.selected ? colors.primary : ""};
    opacity: 1;
`

const HomeIcon = styled(HomeAlt)`
    height: 100%;   
    float: left;
`
const SearchIcon = styled(SearchEye)`
    height: 100%;    
`
const SettingsIcon = styled(Settings)`
    height: 100%;    
`
const MylistIcon = styled(ListCircle)`
    height: 100%;
`
const ElementTitle = styled.div`
    /*font-size: 3rem;*/
`

interface SideMenuProps {
    expand: boolean,
    selected: "home" | "search" | "settings" | "myList" | null,
}

export const SideMenu: React.FC<SideMenuProps> = ({ expand, selected }) => {
    return (<MenuBox expand={expand}>
        <ItemContainer>           
            <MenuElement selected={selected === "home" ? true : false}>
                <HomeIcon />
                {expand ? <ElementTitle>Home</ElementTitle> : ""}
            </MenuElement>
            <MenuElement selected={selected === "search" ? true : false}>
                <SearchIcon />
                {expand ? <ElementTitle>Search</ElementTitle> : ""}
            </MenuElement>
            <MenuElement selected={selected === "myList" ? true : false}>
                <MylistIcon />
                {expand ? <ElementTitle>My List</ElementTitle> : ""}
            </MenuElement>
            <MenuElement selected={selected === "settings" ? true : false}>
                <SettingsIcon />
                {expand ? <ElementTitle>Settings</ElementTitle> : ""}
            </MenuElement>
        </ItemContainer>
    </MenuBox>)
}

