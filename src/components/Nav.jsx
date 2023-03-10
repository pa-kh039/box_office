import React ,{memo} from 'react';
import { useLocation } from 'react-router';
// import { Link } from 'react-router-dom';
import { NavList,LinkStyled } from './Navs.styled';


const  LINKS =[
  {to:'/',text:'Home'},
  {to:'/starred',text:'Starred'}
]

function Nav() {
  const location=useLocation();
  // console.log("location",location);
  return (
    <div>
    <NavList>
      
        {
          LINKS.map(item => <li key={item.to}><LinkStyled to={item.to} className={item.to===location.pathname ? 'active':''}>{item.text}</LinkStyled></li>)
        }
        {/* <li><Link to="/starred"> Go to starred page. </Link></li> */}
      
    </NavList>
    </div>
  );
};

export default memo(Nav);
