import m from 'mithril';

import SiteRealm from './site-realm';
import IpField from './ip-field';
import { serverIp } from '../model/server-ip';

const Home = Object.create(SiteRealm);

Home.controller = function controller() {
  return {
    commitIp(ip) {
      serverIp.set(ip);

      m.route('/server');
    }
  };
};

Home.view = function view(ctrl) {
  return this.constructView(m.component(IpField, { onsave: ctrl.commitIp }));
};

export default Home;