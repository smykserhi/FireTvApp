import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { StorageType } from "../../store/types"
import { addVideo } from "../../store/actions"
import { RouteComponentProps, withRouter } from 'react-router';
import api from "../../api"
import styled, { keyframes } from 'styled-components';
import Showcase from "./Showcase";
import Normal from "./Normal"
import Guide from "./Guide"
import Full from "./Full"
import MorePages from "./More"
import { LOGIN, PAGES, VIDEO, MYLIST, topMenuLength, colors, SEARCH, SETTINGS, HOME } from "../../constants"
import { Loading } from "../Loading"
import { SideMenu } from "../SideMenu"
import moment from 'moment';
import { hexToRGBA } from "../../constants"
//import * as CSSTransitionGroup  from 'react-transition-group'
var CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup')

interface ImageProps {
  url: any
}

interface MenueElementProps {
  selected?: boolean
}
const menuItem = keyframes`
    from{        
        opacity:0.5 ;
    }
    to{        
        opacity: 1;        
    }    
`

const MainBox = styled.div`
  margin: 0 0 0 5rem;
  padding: 4vh 0vw 0vh 6vw;  
`
const MenuBox = styled.div`
  display: flex;
  height: 5rem;   
`
const MenuElement = styled.div<MenueElementProps>`
  margin-right: 20px;
  font-size: 2em;
  font-weight: bold;
  margin-top: 5px;
  z-index: 5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 15ch;
  color: ${props => props.selected ? colors.primary : ""}
`
const SelectedMenuElement = styled(MenuElement)`  
  border-bottom: ${colors.primary} 5px solid;  
  padding-bottom: 45px;
  color: ${colors.primary};
  animation: ${menuItem}  0.3s ease-in-out ;  
`
const MainDis = styled.div`
  display: block;  
  position: relative;
  min-height: 400px;
  z-index:0;
`
const VideoDis = styled.div`
  align-self: center;
  min-height: 350px;
  height: 30vh;
  width: 90%;
  display: contents;
`
const ImageDis = styled.div<ImageProps>`
  align-self: center;   
  width: 35vw;
  position: absolute;
  top: -20%;
  right: 10%;
  z-index: -1;  
  border-radius: 10px;  
  background: linear-gradient(to left, rgba(255,255,255,0) 70%, ${hexToRGBA(colors.bgPrimary, 1)}) 95%, linear-gradient(to bottom, rgba(255,255,255,0) 60%, ${hexToRGBA(colors.bgPrimary, 1)}) 90%,url(${props => props.url}})  right / contain no-repeat;
  height: 100%;
  transform: scale(1.5);
  margin-top: 3rem;  
`
const DisH2 = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  margin-top: 15px;
`
const TimeBox = styled.div`
  font-size: 2em;
  margin-bottom: 20px;
  text-align: left;
  color: ${colors.textFocus};
`
const DiscriptionBox = styled.div`
  white-space: normal;
  width: 55%;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;    
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`
const LiveBox = styled.div`
  display: inline-block;
  background-color: ${colors.primary};
  color: ${colors.textPrimary};
  font-weight: bold;
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  float: left;
`
const ReplayBox = styled.div`
  display: inline-block;
  background-color: ${colors.atention};
  color: ${colors.bgPrimary};
  font-weight: bold;
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  float: left;
`

const CategoryBox = styled.div`
  display: flex;  
  flex-direction: column;
  margin-top: 3rem; 
`
const DiscriptionText = styled.div`
  white-space: normal;
  display: inline;
  line-height: 1.4;
  letter-spacing: 1px;
  font-size: 2.5rem;
`

export type ListProps = {
  sellIndex: number,
  categories: pageCategoriesType[],
  categoriesContent: videoDisType[],
  selectedCol: number,
  selectedRow: number
}

export interface pageCategoriesType {
  description: string,
  id: number,
  name: string,
  total: number,
  type: string,
}
export interface page {
  default: boolean,
  id: string,
  name: string,
}

export interface videoDisListType {
  description: string
  id: number
  image: string
  mediumImage: string
  metadata: metadataType
  smallImage: string
  title: string
  type: string

}
export interface videoDisType {
  id: number,
  list: videoDisListType[]
}
export interface metadataType {
  duration: null | number
  facility: facilityType
  live: false
  producer: producerType
  start_time: string
  state: string
  timezone: string
  timezoneIANA: string
}
interface facilityType {
  name: string,
  logo: string,
  slug: string
  city: string
  label: string
  state: string
}
interface producerType {
  logo: string
  name: string
  slug: string
}
interface matchParamsType {
  id: string
}
interface Props extends RouteComponentProps<matchParamsType> {
  pageId: string
}

export type sideMenuType = "home" | "search" | "settings" | "myList" | null

const Home: React.FC<Props> = ({ history, pageId }) => {
  const selectToken = (state: StorageType) => state.logIn.token
  const Token = useSelector(selectToken) //token 
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true) // main content loading
  const [categiryContentLoading, setCategiryContentLoading] = useState<boolean>(false) // categiry Content Loading
  const [categoryesloading, setCategoryesloading] = useState<boolean>(false) // main content loading  
  const [pages, setPages] = useState<page[]>([])
  const [categories, setCategories] = useState<pageCategoriesType[]>([])
  const [categoriesContent, setCategoriesContent] = useState<videoDisType[]>([])
  const [selectedRow, setSelectedRow] = useState<number>(0)
  const [selectedCol, setSelectedCol] = useState<number>(0)
  const [expandSideMenue, setExpandSideMenue] = useState<boolean>(false)
  const [sideMenuItem, setSideMenuItem] = useState<sideMenuType>(null)
  const [moreOpen, setMoreOpen] = useState<boolean>(false)
  const [moreIndex, setMoreIndex] = useState<number>(topMenuLength)


  //sort content by categories
  const sortContent = (categor: pageCategoriesType[], content: videoDisType[]) => {
    return categor.map(el => {
      const elemnt = content.filter(cont => cont.id === el.id).flat()
      return elemnt[0]
    })
  }

  //Functions
  //add listners
  useEffect(() => {
    addListeners()
    return () => {
      //component will unmount
      removeListeners()
    }
  })

  //update all page or redirect to LOGIN page
  useEffect(() => {
    //console.log("in loading")
    if (!Token) history.push(LOGIN)
    else if (loading) {
      //console.log("loading")
      api.getPages()
        .then((res) => {
          let pagesData: page[] = res
          const defaultPage = res.filter((el: page) => el.default === true)
          const pageIdLoad = pageId === HOME ? defaultPage[0].id : pageId
          api.getPageContent(pageIdLoad, pageIdLoad)
            .then((res) => {
              const categoriesContents: videoDisType[] = []
              const pageCategories: pageCategoriesType[] = res
              let list: any[] = []
              pageCategories.map((el) => {
                list.push(
                  api.getCategoriContent(el.id)
                    .then((res) => {
                      categoriesContents.push({ id: el.id, list: res })
                    })
                )
                return true
              })
              Promise.all(list).then(() => {
                const sortedContent = sortContent(pageCategories, categoriesContents)                
                setSelectedCol(0)
                setSelectedRow(0)               
                setPages(pagesData.filter((el: page) => el.id !== pageId))//skip current page from list
                setCategories(pageCategories)
                setCategoriesContent(sortedContent)
                setLoading(false)
              })
            })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loading, Token, history, pageId]) //run this effect only if this variebles changed  
  
  //Update Categoties
  const uploadCategories = () => {
    if (categories.length !== 0 && (categories.length - selectedRow) < 10 && !categoryesloading && categories[selectedRow]?.type !== "guide") {
      setCategoryesloading(true)
      const offset = categories.length
      //console.log("Categories offset", offset)
      api.getPageContent(pageId, 20, offset)
        .then((newCategiry) => {
          const categoriesContents: videoDisType[] = []
          const pageCategories: pageCategoriesType[] = newCategiry
          let list: any[] = []
          pageCategories.forEach((el) => {
            list.push(
              api.getCategoriContent(el.id)
                .then((res) => {
                  categoriesContents.push({ id: el.id, list: res })
                })
            )
          })
          Promise.all(list).then(() => {
            let tempCategoriesContent = categoriesContent
            let tempCategories = categories
            categoriesContents.forEach(el => tempCategoriesContent.push(el))
            pageCategories.forEach(el => tempCategories.push(el))
            const uniqCategory = Array.from(new Map(tempCategories.map((item: pageCategoriesType) => [item.id, item])).values());
            const uniqContent = Array.from(new Map(tempCategoriesContent.map((item: videoDisType) => [item.id, item])).values());            
            const sortedContent = sortContent(uniqCategory, uniqContent)
            if (categories) setCategories(uniqCategory)
            if (categoriesContent) setCategoriesContent(sortedContent)
            setCategoryesloading(false)
            //console.log("add categories to page ", pageId)
          })
        })
        .catch(error => console.log(error));
    }
  }

  const uploadCategoiesContent = (category: pageCategoriesType) => {
    //console.log("uploadCategoiesContent")
    if (category.total > categoriesContent[selectedRow].list.length && (categoriesContent[selectedRow].list.length - selectedCol) < 20 && !categiryContentLoading) {      
      setCategiryContentLoading(true)
      const offset = categoriesContent[selectedRow].list.length
      //console.log("offset uploadCategoiesContent", offset)
      api.getCategoriContent(category.id, 10, offset).then(res => {
        let tempCategoriesContent = categoriesContent
        res.forEach((el: videoDisListType) => tempCategoriesContent[selectedRow].list.push(el))
        if (categoriesContent) setCategoriesContent(tempCategoriesContent)
        setCategiryContentLoading(false)
        //console.log(`Add data to category ${tempCategoriesContent[selectedRow].id}`)
      })
        .catch(error => console.log(error));
    }
  }

  const addListeners = () => {
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("keyup", handleKeyUp, true);
  }

  const removeListeners = () => {
    document.removeEventListener("keydown", handleKeyDown, true);
    document.removeEventListener("keyup", handleKeyUp, true);
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    removeListeners();
    switch (e.key) {
      case 'Enter':
        handleEnter()
        break;
      default:
        addListeners()
    }
    e.preventDefault();
  }



  const handleKeyDown = (e: KeyboardEvent) => {
    removeListeners();
    switch (e.key) {
      case 'ArrowRight':
        handleArrowRight()
        break;
      case 'ArrowLeft':
        hendleArrowLeft()
        break;
      case 'ArrowUp':
        handleArrowUp()
        break;
      case 'ArrowDown':
        handleArrowDown()
        break;
      case 'GoBack':
      case 'Backspace':
        hendleBack()
        break;
      default:
        addListeners()
    }
    e.preventDefault();
  }

  const hendleBack = () => {
    if (moreOpen) {
      setMoreOpen(false)
    } else {
      history.push(`${PAGES}/${HOME}`)
      setLoading(true)
    }

  }
  const handleEnter = () => {
    if (expandSideMenue) { //opened side menue
      if (sideMenuItem === "home") {
        history.push(`${PAGES}/${HOME}`)
        setLoading(true)
        setSideMenuItem(null)
        setExpandSideMenue(false)
      }
      else if (sideMenuItem === "search") history.push(SEARCH)
      else if (sideMenuItem === "settings") history.push(SETTINGS)
      else if (sideMenuItem === "myList") history.push(MYLIST)
    } else if (moreOpen) {   //open more pages list
      history.push(`${PAGES}/${pages[moreIndex].id}`)
      setMoreOpen(false)
      setLoading(true)
    } else { //selected element in the page
      if (selectedRow === -1) { // top menue 
        if (selectedCol <= topMenuLength - 1) { // selected page
          const selectedPageId = pages[selectedCol].id          
          history.push(`${PAGES}/${selectedPageId}`)
          setLoading(true)
        } else { // selected More option          
          setMoreOpen(true)// open more pages list        
        }
      } else {// selected video element        
        dispatch(addVideo(currentVideo())) //save selected video info to redux
        history.push(`${VIDEO}/${currentVideo()?.id}`)
      }
    }
  }

  const handleArrowUp = () => {
    if (expandSideMenue) { // opened side menue
      //console.log("side up")
      if (sideMenuItem === "search") setSideMenuItem("home")
      else if (sideMenuItem === "myList") setSideMenuItem("search")
      else if (sideMenuItem === "settings") setSideMenuItem("myList")
      else addListeners()
    } else if (moreOpen) { //opened more pages list
      if (moreIndex > 0) setMoreIndex(moreIndex - 1)
      else addListeners()
    } else { //page content
      if (categories[selectedRow]?.type === "guide" && selectedCol !== 0) { //inside guide category
        setSelectedCol(selectedCol - 1)
      } else if (categories[selectedRow]?.type === "full" && selectedCol > 4) { //inside full category
        setSelectedCol(selectedCol - 5)
      } else { 
        if (selectedRow > -1) { // not in top menue
          setSelectedRow(selectedRow - 1) //set previous row
          if (selectedRow > 0 && categories[selectedRow - 1]?.type === "full") { //if previous category type full         
            setSelectedCol(categoriesContent[selectedRow - 1].list.length - 1)  // select the last item in the list
          } else {
            setSelectedCol(0)
          }
        } else {
          addListeners()
        }
      }
    }

  }
  const handleArrowDown = () => {
    if (expandSideMenue) { //opened side menue      
      if (sideMenuItem === "home") setSideMenuItem("search")
      else if (sideMenuItem === "search") setSideMenuItem("myList")
      else if (sideMenuItem === "myList") setSideMenuItem("settings")
      else addListeners()
    } else if (moreOpen) { //opened more pages list
      if (moreIndex < pages.length - 1) setMoreIndex(moreIndex + 1)
      else addListeners()
    } else { // on page contents
      if (categories[selectedRow]?.type === "guide") { //inside guide category
        if (selectedCol < categoriesContent[selectedRow].list.length - 1) setSelectedCol(selectedCol + 1)
        uploadCategoiesContent(categories[selectedRow])
      } else if (categories[selectedRow]?.type === "full" && selectedCol < categoriesContent[selectedRow].list.length - 5) { //inside full category
        if (selectedCol < categoriesContent[selectedRow].list.length - 5) setSelectedCol(selectedCol + 5)
        uploadCategoiesContent(categories[selectedRow])
      } else {
        uploadCategories()
        if (selectedRow < categoriesContent.length - 1) {
          setSelectedCol(0)
          setSelectedRow(selectedRow + 1)
        } else addListeners()
      }

    }

  }
  const hendleArrowLeft = () => {
    if (expandSideMenue) { //opened side menue
      setExpandSideMenue(false)
      setSideMenuItem(null)
    }else if (moreOpen) { // opened side menue
      addListeners()
    } else if (selectedCol > 0 && (categories[selectedRow]?.type !== "guide" || selectedRow === -1)) {
      setSelectedCol(selectedCol - 1)
    } else {//side menue not oppen     
      if (!expandSideMenue) {
        setSideMenuItem("search")
        setExpandSideMenue(true)
      } else addListeners()
    }
  }

  const handleArrowRight = () => {
    if (expandSideMenue) { //opened side menue
      setExpandSideMenue(false)
      setSideMenuItem(null)
    } else if (moreOpen) { // opened more pages List
      addListeners()
    } else {
      //top menu selector topMenuLength
      if (selectedRow === -1 && selectedCol < topMenuLength) { //specified length + more pages
        setSelectedCol(selectedCol + 1)
        //main content selector
      } else {
        if (categoriesContent.length > 0 && selectedRow > -1) {
          uploadCategoiesContent(categories[selectedRow])
          if (selectedCol < categoriesContent[selectedRow].list.length - 1 && categories[selectedRow]?.type !== "guide") { //if not end of the row
            setSelectedCol(selectedCol + 1)
          } else addListeners()
        } else addListeners()
      }
    }

  }
  //return selected video details
  const currentVideo = (): videoDisListType => {
    if (selectedRow >= 0 && categoriesContent.length > 0) {
      return categoriesContent[selectedRow].list[selectedCol]
    } else {
      return categoriesContent[0]?.list[0]
    }
  }  
  return (
    <MainBox>
      {loading ? <Loading /> :
        <div>
          <CSSTransitionGroup
            transitionName="more"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {moreOpen ? <MorePages pages={pages} selected={moreIndex} /> : ""}
          </CSSTransitionGroup>
          <SideMenu expand={expandSideMenue} selected={sideMenuItem} />
          <MenuBox>
            {pages.map((el, topMenuIndex) => {
              if (topMenuIndex < topMenuLength) {
                if (selectedRow === -1 && topMenuIndex === selectedCol) {
                  return (<SelectedMenuElement key={topMenuIndex}>{el.name}</SelectedMenuElement>)
                }
                else {
                  return (<MenuElement selected={parseInt(el.id) === parseInt(pageId)} key={topMenuIndex}>{el.name}</MenuElement>)
                }
              } else return false
            }
            )}
            {selectedRow === -1 && topMenuLength === selectedCol
              ?
              <SelectedMenuElement>More...</SelectedMenuElement>
              :
              <MenuElement >More...</MenuElement>
            }
          </MenuBox>
          <MainDis>
            <VideoDis>
              <DisH2>{currentVideo() ? currentVideo().title : ""}</DisH2>
              <TimeBox>
                {currentVideo().metadata?.live ?
                  `${moment.parseZone(currentVideo().metadata.start_time).format("hh:mm A")} ${currentVideo().metadata.timezone} ${moment.parseZone(currentVideo().metadata.start_time).format("dddd MMMM D, YYYY")} ` :
                  moment.parseZone(currentVideo().metadata.start_time).format("dddd MMMM D, YYYY")}
              </TimeBox>
              <DiscriptionBox>
                {currentVideo().metadata.live
                  ? <LiveBox>LIVE</LiveBox>
                  : <ReplayBox>REPLAY</ReplayBox>
                }
                <DiscriptionText>
                  {currentVideo().description}
                </DiscriptionText>
              </DiscriptionBox>
            </VideoDis>
            <ImageDis url={currentVideo().mediumImage}>
              {/* <Image src={currentVideo().mediumImage} alt="Imag"></Image> */}
            </ImageDis>
          </MainDis>
          <CSSTransitionGroup
            component={CategoryBox}
            transitionName="category"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            {categories.map((catEl, sellIndex) => {
              if (sellIndex >= selectedRow) { //skip content after move
                if (catEl.type === "showcase") {                  
                  return (
                    <Showcase
                      key={sellIndex}
                      sellIndex={sellIndex}
                      categories={categories}
                      categoriesContent={categoriesContent}
                      selectedCol={selectedCol}
                      selectedRow={selectedRow}
                    />
                  )
                } else if (catEl.type === "guide") {
                  return (
                    <Guide
                      key={catEl.id}
                      sellIndex={sellIndex}
                      categories={categories}
                      categoriesContent={categoriesContent}
                      selectedCol={selectedCol}
                      selectedRow={selectedRow}
                    />
                  )
                } else if (catEl.type === "full") {
                  return (
                    <Full
                      key={catEl.id}
                      sellIndex={sellIndex}
                      categories={categories}
                      categoriesContent={categoriesContent}
                      selectedCol={selectedCol}
                      selectedRow={selectedRow}
                    />
                  )
                } else {
                  return (
                    <Normal
                      key={catEl.id}
                      sellIndex={sellIndex}
                      categories={categories}
                      categoriesContent={categoriesContent}
                      selectedCol={selectedCol}
                      selectedRow={selectedRow}
                    />
                  )
                }
              } else return false
            }
            )}
          </CSSTransitionGroup>
        </div>
      }
    </MainBox>
  )
}

export default withRouter(Home)