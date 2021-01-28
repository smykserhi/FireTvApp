//Here all router path in one place
export const ROOT = "/"
export const PAGES = "/pages"
export const LOGIN = "/login"
export const VIDEO = "/video"
export const MYLIST = "/mylist"

//Constants 
// export const host = 'doneright.tv';
// export const domain = 'https://doneright.tv';
export const host = 'speedsport.tv';
export const domain = 'https://speedsport.tv';

//How many items would be displayed in top menu + My List
export const topMenuLength = 5

//colors for all application
export interface ColorsType {
    primary: string,
    seconary: string,
    atention: string,
    bgPrimary: string,
    bgSecondary: string,
    bgAtention: string,
    textPrimary: string,
    textSecondary: string,
    textFocus: string,
    borderPrimary: string,
    borderSecondary: string,
}
export const colors:ColorsType={
    primary: '#c02425', //#ff0000
    seconary: "#37c237", //#37c237
    atention: "#ffb400",//#ffa500
    bgPrimary: "#000000",
    bgSecondary: "#222",// #222222
    bgAtention: "#6c757d",
    textPrimary: "#ffffff",
    textSecondary: "#f5deb3",
    textFocus: "#37c237", 
    borderPrimary: "#d03939",
    borderSecondary: "#37c237"
}




/*
export const apiBaseUrl = 'https://speedsport.tv/api/v2/';
export const sessionsBaseUrl = 'https://speedsport.tv/api/';

export const version = '1.4';

// export const apiBaseUrl = 'https://test.riivet.com/api/v2/';

// Paths
export const sessions = 'sessions';
export const categories = 'categories';
export const search = 'content_items/search';
export const contentItems = 'content_items';
export const list = 'list';



*/