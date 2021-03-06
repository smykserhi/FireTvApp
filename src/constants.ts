export const version = 'FireTV 2.0.0';

//Here all router path in one place
export const ROOT = "/"
export const PAGES = "/pages"
export const LOGIN = "/login"
export const VIDEO = "/video"
export const MYLIST = "/mylist"
export const SEARCH = "/search"
export const SETTINGS = "/settings"
export const HOME = "home"

//Constants 



//How many items would be displayed in top menu + My List
export const topMenuLength = 4

//Search keyboard
export const keyboard = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',"1","2","3","4","5","6","7","8",'9','0','_','<',]

//colors for all application
export interface ColorsType {
    primary: string,
    seconary: string,
    atention: string,
    bgPrimary: string,
    bgSecondary: string,
    bgAtention: string,
    bgSideMenu : string,
    textPrimary: string,
    textSecondary: string,
    textFocus: string,
    borderPrimary: string,
    borderSecondary: string,
    counterColour: string
}

export const colors:ColorsType={
    primary: '#c02425', //#ff0000
    seconary: "#37c237", //#37c237
    atention: "#ffb400",//#ffa500
    bgPrimary: "#101010",//#101010
    bgSecondary: "#222",// #222222
    bgAtention: "#6c757d",
    bgSideMenu: "#101010",
    textPrimary: "#b2b2b2", // #b2b2b2 / #faf7f7
    textSecondary: "#ffffff",
    textFocus: "#37c237", 
    borderPrimary: "#c63333",
    borderSecondary: "#37c237",
    counterColour: "#0000ff"
}


//function transform hex color to rgba with provided opacity
export const hexToRGBA=(hex:any, opacity:number)=> {
    return 'rgba(' + (hex = hex.replace('#', ''))
        .match(new RegExp('(.{' + hex.length/3 + '})', 'g'))
        .map(function(l:any) { return parseInt(hex.length%2 ? l+l : l, 16) })
        .concat(isFinite(opacity) ? opacity : 1)
        .join(',') + ')';
}


