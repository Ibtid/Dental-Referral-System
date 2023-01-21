import { useEffect, useState } from 'react';

const useCollapseSideNav = () => {
  const [sideNav, setSideNav] = useState<HTMLElement>();
  const [collapseLogo, setCollapseLogo] = useState<HTMLElement>();
  const [expandLogo, setExpandLogo] = useState<HTMLElement>();
  const [docProfile, setDocProfile] = useState<Element>();
  const [mainMenu, setMainMenu] = useState<HTMLElement>();
  const [navItems, setNavItems] = useState<NodeListOf<HTMLElement>>();
  const [docImageDiv, setDocImageDiv] = useState<Element>();

  const collapseSideNav = () => {
    if (mainMenu && mainMenu.style.display == 'block') {
      if (navItems) {
        for (var i = 0; i < navItems.length; i++) {
          navItems[i].style.display = 'none';
        }
      }
      if (sideNav) sideNav.style.width = '80px';
      docImageDiv?.setAttribute('style', 'width:2em; height:2em');
      docProfile?.setAttribute('style', 'width:2em; height:2em');
      if (collapseLogo) collapseLogo.style.display = 'block';
      if (expandLogo) expandLogo.style.display = 'none';
    } else {
      if (navItems) {
        for (var i = 0; i < navItems.length; i++) {
          navItems[i].style.display = 'block';
        }
      }
      if (sideNav) sideNav.style.width = '17.25em';
      docImageDiv?.setAttribute('style', 'width:5.125em; height:5.125em');
      docProfile?.setAttribute('style', 'width:5.125em; height:5.125em');
      if (collapseLogo) collapseLogo.style.display = 'none';
      if (expandLogo) expandLogo.style.display = 'block';
    }
  };

  useEffect(() => {
    const sideNav = document.getElementById('Sidenav')!;
    const navItems = document.querySelectorAll(
      '.item'
    ) as NodeListOf<HTMLElement>;
    const collapseLogo = document.querySelector(
      '.collapse-logo'
    ) as HTMLElement;
    const expandLogo = document.querySelector('.expand-logo')! as HTMLElement;
    const docImageDiv = document.querySelector('.doc-profile')!;
    const docProfile = docImageDiv?.firstElementChild!;
    const mainMenu = navItems[0];
    const navItemActive = document.querySelectorAll('.nav-item-active')!;

    if (mainMenu) mainMenu.style.display = 'block';

    navItemActive.forEach(function (parent_item) {
      parent_item.addEventListener('click', function () {
        navItemActive.forEach(function (parent_item) {
          parent_item.classList.remove('active');
        });

        parent_item.classList.add('active');
      });
    });

    setSideNav(sideNav);
    setNavItems(navItems);
    setCollapseLogo(collapseLogo);
    setExpandLogo(expandLogo);
    setDocImageDiv(docImageDiv);
    setDocProfile(docProfile);
    setMainMenu(mainMenu);
  }, []);

  return collapseSideNav;
};

export default useCollapseSideNav;
