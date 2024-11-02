import {
	Header,
	HeaderContainer,
	HeaderName,
	HeaderNavigation,
	HeaderMenuButton,
	HeaderMenuItem,
	HeaderGlobalBar,
	HeaderGlobalAction,
	SkipToContent,
	SideNav,
	SideNavItems,
	HeaderSideNavItems,
} from '@carbon/react';

import { Notification, Search, User} from '@carbon/icons-react';
import { action } from '@storybook/addon-actions';	
import '@carbon/styles/css/styles.css';

const NavBar = () => (
	<HeaderContainer render={({
		isSideNavExpanded,
		onClickSideNavExpand
	  }) => <>
			  <Header aria-label="TranSitOps">
				<SkipToContent />
				<HeaderMenuButton aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'} onClick={onClickSideNavExpand} isActive={isSideNavExpanded} aria-expanded={isSideNavExpanded} />
				<HeaderName href="#" prefix=""> 
	  				TranSitOps
				</HeaderName>
				<HeaderNavigation aria-label="TransitOps">
				  <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
				  <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
				  <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
				</HeaderNavigation>
				<HeaderGlobalBar>
				  <HeaderGlobalAction aria-label="Search" onClick={action('search click')}>
					<Search size={20} />
				  </HeaderGlobalAction>
				  <HeaderGlobalAction aria-label="Notifications" onClick={action('notification click')}>
					<Notification size={20} />
				  </HeaderGlobalAction>
				  <HeaderGlobalAction aria-label="user">
					<User size={20}/>
				  </HeaderGlobalAction>
				</HeaderGlobalBar>
				<SideNav aria-label="Side navigation" expanded={isSideNavExpanded} isPersistent={false} onSideNavBlur={onClickSideNavExpand}>
				  <SideNavItems>
					<HeaderSideNavItems>
					  <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
					  <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
					  <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
					</HeaderSideNavItems>
				  </SideNavItems>
				</SideNav>
			  </Header>
			</>} />
);

export default NavBar;
