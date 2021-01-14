import React from "react"
import { RouteComponentProps, withRouter } from 'react-router';

interface matchParamsType {
    id: string
  }
  interface Props extends RouteComponentProps<matchParamsType> {    
  }
const  Video:React.FC<Props> = ({ history, match })=>{
    return (
        <h1>Video with id {match.params.id} would be here</h1>
    )
}

export default withRouter(Video)