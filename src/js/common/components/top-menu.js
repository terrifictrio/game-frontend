import m from 'mithril';
import { i18n } from '../services/i18n';

import LanguageSelector from './language-selector';

const TopMenu = {
  controller(options) {
    return {
      isSelected(path) {
        return m.route() === path;
      },
      getSelectedOption() {
        return m.route();
      },
      routes: options.routes
    };
  },
  view(ctrl) {
    return m('nav.nav', [
      m('div.nav-left',
        m('a.nav-item', { config: m.route, href: '/' },
          m('h1.title', 'InfectNet'))),
      m('div.nav-right.nav-menu', ctrl.routes.map(routeToOption).concat(LanguageSelector))
    ]);

    function routeToOption(route) {
      const anchorClass = ctrl.isSelected(route.path) ? 'is-active' : '';

      return m('a.nav-item', {
        config: m.route, href: route.path, class: anchorClass
      }, i18n.t(`common:Menu.${route.name}`));
    }
  }
};

export default TopMenu;
