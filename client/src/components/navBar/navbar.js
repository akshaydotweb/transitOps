import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from '@carbon/react';
import { Search, Notification, User } from '@carbon/icons-react';
import '@carbon/styles/css/styles.css';


const Navbar = () => {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const onClickSideNavExpand = () => setIsSideNavExpanded(!isSideNavExpanded);
  const navigate = useNavigate();

  return (
    <Header aria-label="TransitOps">
      <SkipToContent />
      <HeaderMenuButton 
        aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'} 
        onClick={onClickSideNavExpand} 
        isActive={isSideNavExpanded} 
        aria-expanded={isSideNavExpanded} 
      />
      <HeaderName href="/" prefix=""> 
        TranSitOps
      </HeaderName>
      <HeaderNavigation aria-label="TransitOps">
        <HeaderMenuItem onClick={() => navigate('/admin')}>Admin</HeaderMenuItem>
        <HeaderMenuItem onClick={() => navigate('/client')}>Client</HeaderMenuItem>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
          <Search size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
          <Notification size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="user">
          <User size={20}/>
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <SideNav aria-label="Side navigation" expanded={isSideNavExpanded} isPersistent={false} onSideNavBlur={onClickSideNavExpand}>
        <SideNavItems>
          <HeaderSideNavItems>
            <HeaderMenuItem onClick={() => navigate('/admin')}>Admin</HeaderMenuItem>
            <HeaderMenuItem onClick={() => navigate('/client')}>client</HeaderMenuItem>
          </HeaderSideNavItems>
        </SideNavItems>
      </SideNav>
    </Header>
  );
};

export default Navbar;
