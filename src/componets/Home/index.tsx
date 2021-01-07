import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { StorageType } from "../../store/types"
import { RouteComponentProps, withRouter } from 'react-router';
//import { LOGIN } from "../../constants"
import api from "../../api"
import styled from 'styled-components';

const MenuBox = styled.div`
  display: flex;
  //overflow: scroll;
  height: 2.5rem;
`
const MenuElement = styled.div`
  margin-right: 20px;
  font-size: 1.7em;
  font-weight: bold;
`
const SelectedMenuElement = styled(MenuElement)`  
  border-bottom: #ff0000 5px solid;
`
const MainDis = styled.div`
  display: flex;  
  height: 20vh;
`
const CategoryBox = styled.div`
  display: flex;  
  flex-direction: column;
`
const CategorRow = styled.div`
  display: flex;  
  flex-direction: row;
  margin-bottom: 20px;
  overflow: scroll;
`
const VideoElement = styled.div`  
  margin: 10px;
  min-width: 15rem;
`
const SelectedVideoElement = styled(VideoElement)`    
  border: #ff0000 5px solid;

`
const Image = styled.img`
  width: 100%;
`


interface pageCategoriesType {
  description: string,
  id: number,
  name: string,
  total: number,
  type: string,


}
interface page {
  default: boolean,
  id: number,
  name: string,
}

interface videoDis {
  id: number,
  list: {
    description: string
    id: number
    image: string
    mediumImage: string
    metadata: object
    smallImage: string
    title: string
    type: string
  }[]
}


// const defVideo :videoDis  = {
//   description: "",
//   id: 1,
//   image: "",
//   mediumImage: "",
//   metadata: {},
//   smallImage: "",
//   title: "",
//   type: "",

// }
const defCategoties = {
  description: "",
  id: 0,
  name: "",
  total: 1,
  type: "",
}




const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const selectToken = (state: StorageType) => state.logIn.token
  const LogIn = useSelector(selectToken)
  const [loading, setLoading] = useState<boolean>(true)
  let topMenuLength = 5
  const [pages, setPages] = useState<page[]>([])
  const [categories, setCategories] = useState<pageCategoriesType[]>([])
  const [categoriesContent, setCategoriesContent] = useState<videoDis[]>([])
  const [selectedRow, setSelectedRow] = useState<number>(0)
  const [selectedCol, setSelectedCol] = useState<number>(0)


  const sortContent = (cats: pageCategoriesType[], cont: videoDis[]) => {
    let result: videoDis[] = []
    for (let i = 0; i < cats.length; i++) {
      for (let j = 0; j < cont.length; j++) {
        if (cats[i].id === cont[j].id) {
          result.push(cont[j])
        }
      }
    }
    return result
  }

  //Functions
  useEffect(() => {
    //Componentdidmount
    //if (!LogIn) history.push(LOGIN)
    //else {
    if (loading) {
      const categoriesContents: videoDis[] = []
      api.getPages()
        .then((res) => {
          //console.log(res)
          const pagesData = res
          //setPages(res)
          pagesData.map((el: any, index: number) => {
            if (el.default) {
              let pageCategories: pageCategoriesType[] = []
              api.getPageContent(el.id)
                .then((res) => {
                  pageCategories = res
                  let list: any[] = []
                  //setCategories(pageCategories)
                  pageCategories.map((el) => {
                    list.push(
                      api.getCategoriContent(el.id)
                        .then((res) => {
                          categoriesContents.push({ id: el.id, list: res })
                          //console.log(categoriesContents)
                        })
                    )
                    return true
                  })
                  Promise.all(list).then(() => {
                    //console.log("Sorted content", sortContent(pageCategories,categoriesContents))
                    const sortedConyent = sortContent(pageCategories, categoriesContents)
                    setLoading(false)
                    setCategoriesContent(sortedConyent)
                    setCategories(pageCategories)
                    setPages(pagesData)
                    addListeners()
                  })
                })
            }
            return true
          })

        })
        //.then(() => setLoading(false))
        .catch((err) => {
          console.log(err);
        });
    }
    addListeners()
    return () => {
      //component will unmount
      removeListeners()

    }
  }

    //}
  )
  //console.log("pages", pages)
  //console.log("categories", categories)
  //console.log("categoriesContent", categoriesContent)  

  const addListeners = () => {
    document.addEventListener("keydown", handleKeyDown, true);
    //document.addEventListener("keyup", e=>handleUp(e), true);
  }


  const removeListeners = () => {
    document.removeEventListener("keydown", handleKeyDown, true);
    //document.removeEventListener("keyup", e=>handleUp(e), false);
  }
  // const handleUp = (e: KeyboardEvent) => {
  //   //if (e.key === 'Enter'){
  //   removeListeners();
  //   //this.setState({ showDetails: true });
  //   console.log("handleUp", e)

  // }


  const handleKeyDown = (e: KeyboardEvent) => {
    removeListeners();
    //console.log('Videos:handleDown', e.key);
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
      case 'Enter':
        handleEnter()
        break;
      default:
        addListeners()
    }
    e.preventDefault();
  }

  const handleEnter = () => {
    console.log("enter, element ", selectedCol, selectedRow)
    if(selectedCol===-1){
      console.log("Menu item", pages[selectedRow])
    }else{
      console.log("Video",categoriesContent[selectedCol].list[selectedRow] )
    }
    
    addListeners()
  }

  const handleArrowUp = () => {
    console.log("Up", selectedCol, selectedRow)
    if (selectedCol > -1) {
      setSelectedCol(selectedCol - 1)
      setSelectedRow(0)
    } else {
      addListeners()
    }
  }
  const handleArrowDown = () => {
    console.log("down", selectedCol, selectedRow)

    setSelectedCol(selectedCol + 1)
    setSelectedRow(0)
    //Need handle new API call for extra categories!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
  const hendleArrowLeft = () => {
    console.log("left", selectedCol, selectedRow)
    if (selectedRow > 0) {
      setSelectedRow(selectedRow - 1)
    } else {
      console.log("left more 0")
      addListeners()
    }
  }
  const handleArrowRight = () => {
    console.log("Right", selectedCol, selectedRow)
    if (selectedCol === -1 && selectedRow < topMenuLength - 1) {
      setSelectedRow(selectedRow + 1)
    } else if (selectedCol > -1) {
      if (selectedRow < categoriesContent[selectedCol].list.length - 1) {
        setSelectedRow(selectedRow + 1)
      } else {
        addListeners()
      }      
    } else {
      addListeners()
    }


  }

  return (
    <>
      {loading ? <div>Loading</div> :
        <div>
          <MenuBox>
            {pages.map((el, topMenuIndex) => {
              if (topMenuIndex < topMenuLength) {
                if (selectedCol === -1 && topMenuIndex === selectedRow) {
                  return (
                    <SelectedMenuElement key={topMenuIndex}>{el.name}</SelectedMenuElement>
                  )
                } else {
                  return (
                    <MenuElement key={topMenuIndex}>{el.name}</MenuElement>
                  )
                }
              }
            }
            )}
          </MenuBox>
          <MainDis>
            Main  disc ription
          </MainDis>
          <CategoryBox>
            {categories.map((catEl, sellIndex) => (
              <CategorRow key={sellIndex}>
                {categoriesContent.filter(el => el.id === catEl.id)[0].list.map((el, rowIndex) => {
                  if (sellIndex === selectedCol && rowIndex === selectedRow) {
                    return (
                      <SelectedVideoElement key={rowIndex} >
                        <Image src={el.smallImage} alt="Imag"></Image>
                        <div>{el.title}</div>
                      </SelectedVideoElement>
                    )
                  } else {
                    return (
                      <VideoElement key={rowIndex} >
                        <Image src={el.smallImage} alt="Imag"></Image>
                        <div>{el.title}</div>
                      </VideoElement>
                    )
                  }
                })}
              </CategorRow>
            ))}
          </CategoryBox>


        </div>

      }


    </>
  )
}

export default withRouter(Home)