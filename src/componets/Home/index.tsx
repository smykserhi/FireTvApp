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
const moreList = keyframes`
  0% {
    transform: translateZ(0) rotateY(0);
    opacity: 1;
  }
  54% {
    transform: translateZ(-160px) rotateY(87deg);
    opacity: 1;
  }
  100% {
    transform: translateZ(-800px) rotateY(90deg);
    opacity: 0;
  }
`
const MainBox = styled.div`
  margin: 0 5rem;
  
`
const MenuBox = styled.div`
  display: flex;
  height: 2.5rem;
   
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
  top: -60px;
  right: -20px;
  z-index: -1;  
  /*box-shadow: 0px 0px 60px ${colors.borderPrimary};*/
  border-radius: 10px;  
  /*mask-image: linear-gradient(0deg, rgba(255,255,255,0) 0%, ${colors.bgPrimary} 15%) ;*/  

  
  /*background: right / contain no-repeat url(${props => props.url}}) ;*/
  background: linear-gradient(to left, rgba(255,255,255,0) 70%, ${hexToRGBA(colors.bgPrimary, 1)}) 95%, linear-gradient(to bottom, rgba(255,255,255,0) 60%, ${hexToRGBA(colors.bgPrimary, 1)}) 95%,url(${props => props.url}})  right / contain no-repeat;
  height: 100%;
  transform: scale(1.3);
  margin-top: 3rem;
  
`
const DisH2 = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;
  margin-top: 15px;
  /*width: 60%;*/
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
  font-size: 1.5em;
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
  text-shadow: 2px 2px #54462387;
`
const ReplayBox = styled.div`
  display: inline-block;
  background-color: ${colors.atention};
  color: ${colors.textPrimary};
  font-weight: bold;
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-shadow: 2px 2px #54462387;  
`

const CategoryBox = styled.div`
  display: flex;  
  flex-direction: column;
 
`
const DiscriptionText = styled.div`
  white-space: normal;
  /*width: 70%;*/
  display: inline;
  line-height: 1.4;
  letter-spacing: 1px;
  font-size: 1.3em;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;    
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  
  
`

const Image = styled.img`
  width: 100%;
  border-radius: 10px;
  mask-image: linear-gradient(90deg, rgba(255,255,255,0) 0%, ${colors.bgPrimary} 25%) ;

  /*transform: scale(1.4);*/
`

const MoreList = styled.div`
  position: absolute;
  top: 30%;
  left: 30%;
  background: red;
  width: 30vw;
  height: 40vh;
  z-index: 5;
  &.more-enter.more-enter-active {   
    animation: ${moreList}  0.5s ease-in-out reverse;            
  }     
  &.more-leave.more-leave-active {   
      animation: ${moreList}  0.6s ease-in-out ;     
  }
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

const Home: React.FC<Props> = ({ history, match, pageId }) => {
  const selectToken = (state: StorageType) => state.logIn.token
  const Token = useSelector(selectToken) //token 
  const dispatch = useDispatch()
  //let myHistory = useHistory();
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
  const [moreIndex, setMoreIndex] = useState<number>(0)


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
    console.log("in loading")
    if (!Token) history.push(LOGIN)
    else if (loading) {
      console.log("loading")
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
                //console.log("sorted data", pageCategories, sortedContent)
                setSelectedCol(0)
                setSelectedRow(0)
                //console.log("pagesData", pagesData, "pageId", pageId)
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

  //console.log("match", pageId)
  console.log("pages", pages)
  console.log("categories", categories)
  console.log("categoriesContent", categoriesContent)
  console.log("selectedRow ", selectedRow, " selectedCol", selectedCol)
  const uploadCategories = () => {
    if (categories.length !== 0 && (categories.length - selectedRow) < 10 && !categoryesloading && categories[selectedRow]?.type !== "guide") {
      setCategoryesloading(true)
      const offset = categories.length
      console.log("Categories offset", offset)
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
            console.log('unic', uniqCategory, uniqContent)
            const sortedContent = sortContent(uniqCategory, uniqContent)
            if (categories) setCategories(uniqCategory)
            if (categoriesContent) setCategoriesContent(sortedContent)
            setCategoryesloading(false)
            console.log("add categories to page ", pageId)
          })
        })
        .catch(error => console.log(error));
    }
  }
  const uploadCategoiesContent = (category: pageCategoriesType) => {
    console.log("uploadCategoiesContent")
    if (category.total > categoriesContent[selectedRow].list.length && (categoriesContent[selectedRow].list.length - selectedCol) < 20 && !categiryContentLoading) {
      console.log("offset uploadCategoiesContent")
      setCategiryContentLoading(true)
      const offset = categoriesContent[selectedRow].list.length
      console.log("offset uploadCategoiesContent", offset)
      api.getCategoriContent(category.id, 10, offset).then(res => {
        let tempCategoriesContent = categoriesContent
        res.forEach((el: videoDisListType) => tempCategoriesContent[selectedRow].list.push(el))
        if (categoriesContent) setCategoriesContent(tempCategoriesContent)
        setCategiryContentLoading(false)
        console.log(`Add data to category ${tempCategoriesContent[selectedRow].id}`)
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
    history.push(`${PAGES}/${HOME}`)
    setLoading(true)
  }
  const handleEnter = () => {
    if (expandSideMenue) {
      if (sideMenuItem === "home") {
        history.push(`${PAGES}/${HOME}`)
        setLoading(true)
        setSideMenuItem(null)
        setExpandSideMenue(false)
      }
      else if (sideMenuItem === "search") history.push(SEARCH)
      else if (sideMenuItem === "settings") history.push(SETTINGS)
      else if (sideMenuItem === "myList") history.push(MYLIST)
    } else {
      if (selectedRow === -1) {
        if (selectedCol <= topMenuLength - 1) {
          const selectedPageId = pages[selectedCol].id
          console.log("Menu item", selectedPageId)
          history.push(`${PAGES}/${selectedPageId}`)
          setLoading(true)
        } else {
          console.log("More list")
          setMoreOpen(!moreOpen)
          //addListeners()
          //history.push(MYLIST)
        }
      } else {
        //console.log("Video", currentVideo())
        dispatch(addVideo(currentVideo()))
        //setLoading(true)
        history.push(`${VIDEO}/${currentVideo()?.id}`)

      }
    }

  }

  const handleArrowUp = () => {
    if (expandSideMenue) {
      console.log("side up")
      if (sideMenuItem === "search") setSideMenuItem("home")
      else if (sideMenuItem === "myList") setSideMenuItem("search")
      else if (sideMenuItem === "settings") setSideMenuItem("myList")
      else addListeners()
    } else {
      if (categories[selectedRow]?.type === "guide" && selectedCol !== 0) { //inside guide category
        setSelectedCol(selectedCol - 1)
      } else if (categories[selectedRow]?.type === "full" && selectedCol > 4) { //inside full category
        setSelectedCol(selectedCol - 5)
      } else {
        if (selectedRow > -1) {
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
    if (expandSideMenue) {
      console.log("side down")
      if (sideMenuItem === "home") setSideMenuItem("search")
      else if (sideMenuItem === "search") setSideMenuItem("myList")
      else if (sideMenuItem === "myList") setSideMenuItem("settings")
      else addListeners()
    } else {
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
    if (selectedCol > 0 && (categories[selectedRow]?.type !== "guide" || selectedRow === -1)) {
      setSelectedCol(selectedCol - 1)
    } else {
      console.log("left more 0 Open side menu")
      if (!expandSideMenue) {
        setSideMenuItem("search")
        setExpandSideMenue(true)
      } else addListeners()

      //addListeners()
    }
  }
  const handleArrowRight = () => {
    if (expandSideMenue) {
      setExpandSideMenue(false)
      setSideMenuItem(null)
    } else {
      //top menu selector topMenuLength
      if (selectedRow === -1 && selectedCol < topMenuLength) { //specified length + My List
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
  const currentVideo = (): videoDisListType => {
    if (selectedRow >= 0 && categoriesContent.length > 0) {
      return categoriesContent[selectedRow].list[selectedCol]
    } else {
      return categoriesContent[0]?.list[0]
    }
  }
  //console.log(currentVideo())
  return (
    <MainBox>
      {loading ? <Loading /> :
        <div>
          <CSSTransitionGroup
            transitionName="more"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {moreOpen ? <MoreList>List here</MoreList> : ""}
          </CSSTransitionGroup>

          <SideMenu expand={expandSideMenue} selected={sideMenuItem} />
          <MenuBox>
            {pages.map((el, topMenuIndex) => {
              if (topMenuIndex < topMenuLength) {
                if (selectedRow === -1 && topMenuIndex === selectedCol) {
                  return (<SelectedMenuElement key={topMenuIndex}>{el.name}</SelectedMenuElement>)
                }
                else {
                  return (<MenuElement selected={el.id == pageId} key={topMenuIndex}>{el.name}</MenuElement>)
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
                  console.log("sellIndex", sellIndex)
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