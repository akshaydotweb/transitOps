import { Header, HeaderContainer, HeaderName } from '@carbon/react';

import Link from 'next/link';

const NavHeader = () => (
  <HeaderContainer>
    <HeaderName href="/" prefix="TranSitOps">
      <Link href="/" passHref legacybehavior>
        <HeaderName prefix="TranSitOps">TranSitOps</HeaderName>
      </Link>
    </HeaderName>
    <Header></Header>
  </HeaderContainer>
);

export default NavHeader;
