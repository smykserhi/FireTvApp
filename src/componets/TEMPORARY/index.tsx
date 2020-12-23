







import { RouteComponentProps, withRouter } from 'react-router';





type SomeComponentProps = RouteComponentProps;

const SomeComponent: React.FC<SomeComponentProps> = ({ history }) => {
  const goHome = () => history.push(`/login`);
  return <button onClick={goHome}>Go home</button>;
};

export default withRouter(SomeComponent);