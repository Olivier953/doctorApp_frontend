import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UserLink = styled(Link)`
  text-decoration: none;
  color: black;
  text-transform: capitalize;

  :hover {
    color: rgb(223, 175, 80);
  }
`;

export {UserLink}
