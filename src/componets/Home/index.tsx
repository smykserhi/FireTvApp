import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { StorageType } from "../../store/types"
import { RouteComponentProps, withRouter } from 'react-router';
import api from "../../api"
import styled from 'styled-components';
import Showcase from "./Showcase";
import Normal from "./Normal"
import Guide from "./Guide"
import { LOGIN, PAGES, VIDEO, MYLIST, topMenuLength,colors } from "../../constants"
import { Loading } from "../Loading"
import moment from 'moment';


const MainBox = styled.div`
  margin: 0 1rem;
`
const MenuBox = styled.div`
  display: flex;
  height: 2.5rem;  
`
const MenuElement = styled.div`
  margin-right: 20px;
  font-size: 1.7em;
  font-weight: bold;
`
const SelectedMenuElement = styled(MenuElement)`  
  border-bottom: ${colors.primary} 5px solid;
`
const MainDis = styled.div`
  display: block;  
  position: relative;
  min-height: 400px;
`
const VideoDis = styled.div`
  align-self: center;
  min-height: 350px;
  height: 30vh;
  width: 90%;
  display: contents;
`
const ImageDis = styled.div`
  align-self: center;   
  width: 35vw;
  position: absolute;
  top: -30px;
  right: 30px;
  z-index: -1;  
  box-shadow: 0px 0px 60px ${colors.borderPrimary};
  border-radius: 10px;  
`
const DisH2 = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;
  margin-top: 15px;
  width: 60%;
`
const TimeBox = styled.div`
  font-size: 2em;
  margin-bottom: 20px;
  text-align: left;
  color: ${colors.textFocus};
`
const DiscriptionBox = styled.div`
  white-space: normal;
  width: 60%;
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
`

const CategoryBox = styled.div`
  display: flex;  
  flex-direction: column;
`
const DiscriptionText = styled.div`
  white-space: normal;
  width: 70%;
  display: inline;
`
const Image = styled.img`
  width: 100%;
  border-radius: 10px;
`
const LoadingComponent = styled.div`
  width: 100vw;
  height:100vh
`

export interface pageCategoriesType {
  description: string,
  id: number,
  name: string,
  total: number,
  type: string,
}
export interface page {
  default: boolean,
  id: number,
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
  pageId: number
}

const Home: React.FC<Props> = ({ history, match, pageId }) => {
  const selectToken = (state: StorageType) => state.logIn.token
  const Token = useSelector(selectToken) //token 
  //let myHistory = useHistory();
  const [loading, setLoading] = useState<boolean>(true) // main content loading
  const [categiryContentLoading, setCategiryContentLoading] = useState<boolean>(false) // categiry Content Loading
  const [categoryesloading, setCategoryesloading] = useState<boolean>(false) // main content loading
  //let topMenuLength = 5 //how many pages would be displayed in top menu
  const [pages, setPages] = useState<page[]>([])
  const [categories, setCategories] = useState<pageCategoriesType[]>([])
  const [categoriesContent, setCategoriesContent] = useState<videoDisType[]>([])
  const [selectedRow, setSelectedRow] = useState<number>(0)
  const [selectedCol, setSelectedCol] = useState<number>(0)


//sort content by categories
  const sortContent = (categor: pageCategoriesType[], content: videoDisType[]) => {
    return categor.map(el => content.filter(cont => cont.id === el.id)).flat()
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
      api.getPages()
        .then((res) => {
          let pagesData: page[] = res
          api.getPageContent(pageId)
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

  //console.log("match", match.params)
  //console.log("pages", pages)
  //console.log("categories", categories)
  //console.log("categoriesContent", categoriesContent)
  //console.log("selectedRow ", selectedRow, " selectedCol", selectedCol)
  const uploadCategories = () => {
    if (categories.length !== 0 && (categories.length - selectedRow) < 10 && !categoryesloading && categories[selectedRow]?.type !== "guide") {
      setCategoryesloading(true)
      const offset = categories.length
      console.log("Categories offset", offset)
      api.getPageContent(pageId, 10, offset)
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
            setCategories(uniqCategory)
            setCategoriesContent(sortedContent)
            setCategoryesloading(false)
            console.log("add categories to page ", pageId)
          })
        })
    }
  }
  const uploadCategoiesContent = (category: pageCategoriesType) => {
    if (category.total > categoriesContent[selectedRow].list.length && (categoriesContent[selectedRow].list.length - selectedCol) < 10 && !categiryContentLoading) {
      setCategiryContentLoading(true)
      const offset = categoriesContent[selectedRow].list.length
      api.getCategoriContent(category.id, 10, offset).then(res => {
        let tempCategoriesContent = categoriesContent
        res.forEach((el: videoDisListType) => tempCategoriesContent[selectedRow].list.push(el))
        setCategoriesContent(tempCategoriesContent)
        setCategiryContentLoading(false)
        console.log(`Add data to category ${tempCategoriesContent[selectedRow].id}`)
      })
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
      default:
        addListeners()
    }
    e.preventDefault();
  }

  const handleEnter = () => {
    if (selectedRow === -1) {
      if (selectedCol <= topMenuLength - 1) {
        const selectedPageId = pages[selectedCol].id
        console.log("Menu item", selectedPageId)
        history.push(`${PAGES}/${selectedPageId}`)
        setLoading(true)
      } else {
        history.push(MYLIST)
      }
    } else {
      console.log("Video", currentVideo())
      history.push(`${VIDEO}/${currentVideo().id}`)
    }
  }

  const handleArrowUp = () => {
    if (categories[selectedRow]?.type === "guide" && selectedCol !== 0) { //inside guide category
      setSelectedCol(selectedCol - 1)
    } else {
      if (selectedRow > -1) {
        setSelectedCol(0)
        setSelectedRow(selectedRow - 1)
      } else {
        addListeners()
      }
    }
  }
  const handleArrowDown = () => {
    if (categories[selectedRow]?.type === "guide" && selectedCol < categoriesContent[selectedRow].list.length - 1) { //inside guide category
      if (selectedCol < categoriesContent[selectedRow].list.length - 1) setSelectedCol(selectedCol + 1)
      uploadCategoiesContent(categories[selectedRow])
    } else {
      uploadCategories()
      if (selectedRow < categoriesContent.length - 1) {
        setSelectedCol(0)
        setSelectedRow(selectedRow + 1)
      } else addListeners()
    }

  }
  const hendleArrowLeft = () => {
    if (selectedCol > 0 && (categories[selectedRow]?.type !== "guide" || selectedRow === -1)) {
      setSelectedCol(selectedCol - 1)
    } else {
      console.log("left more 0 Open side menu")
      addListeners()
    }
  }
  const handleArrowRight = () => {
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
  const currentVideo = (): videoDisListType => {
    if (selectedRow >= 0 && categoriesContent.length > 0) {
      return categoriesContent[selectedRow].list[selectedCol]
    } else {
      return categoriesContent[0].list[0]
    }
  }

  return (
    <MainBox>
      {loading ? <LoadingComponent><Loading /></LoadingComponent> :
        <div>
          <MenuBox>
            {pages.map((el, topMenuIndex) => {
              if (topMenuIndex < topMenuLength) {
                if (selectedRow === -1 && topMenuIndex === selectedCol) {
                  return (<SelectedMenuElement key={topMenuIndex}>{el.name}</SelectedMenuElement>)
                }
                else {
                  return (<MenuElement key={topMenuIndex}>{el.name}</MenuElement>)
                }
              } else return false
            }
            )}
            {selectedRow === -1 && topMenuLength === selectedCol
              ?
              <SelectedMenuElement>MyList</SelectedMenuElement>
              :
              <MenuElement>MyList</MenuElement>
            }
          </MenuBox>
          <MainDis>
            <VideoDis>
              <DisH2>{currentVideo() ? currentVideo().title : ""}</DisH2>
              <TimeBox>
                {currentVideo().metadata?.live ?
                  moment(currentVideo().metadata.start_time).format("hh:mm A dddd MMMM D, YYYY") :
                  moment(currentVideo().metadata.start_time).format("dddd MMMM D, YYYY")}
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
            <ImageDis>
              <Image src={currentVideo().smallImage} alt="Imag"></Image>
            </ImageDis>
          </MainDis>
          <CategoryBox>
            {categories.map((catEl, sellIndex) => {
              if (sellIndex >= selectedRow) { //skip content after move
                if (catEl.type === "showcase") {
                  return (
                    <Showcase
                      key={catEl.id}
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
          </CategoryBox>
        </div>
      }
    </MainBox>
  )
}

export default withRouter(Home)