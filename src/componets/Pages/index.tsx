import React from "react"
import { withRouter,RouteComponentProps } from 'react-router';
import { Route } from "react-router-dom";
import {PAGES} from "../../constants"
import Home from "../../componets/Home"

interface matchParamsType {
    id: string
  }
  interface Props extends RouteComponentProps<matchParamsType> {    
  }
  

const Pages: React.FC<Props> = ({ match,})=> {
    const pageId = match.params.id 
    return (<Route path={`${PAGES}/${pageId}`} render={() => <Home pageId={pageId} />} /> )
}
export default withRouter(Pages)