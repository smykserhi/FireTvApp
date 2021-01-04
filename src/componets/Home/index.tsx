import React, { useEffect } from "react"
import { useSelector } from 'react-redux';
import { StorageType } from "../../store/types"
import { RouteComponentProps, withRouter } from 'react-router';
import { LOGIN } from "../../constants"


const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const selectToken = (state: StorageType) => state.logIn.token
  const LogIn = useSelector(selectToken)
  useEffect(() => {
    if (!LogIn) history.push(LOGIN)
  })


  return (
    <>

      <h1>Home Component</h1>

    </>
  )
}

export default withRouter(Home)