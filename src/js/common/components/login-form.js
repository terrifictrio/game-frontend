import m from 'mithril';

import Cond from '../util/cond';
import Animation from '../util/animation';
import mx from '../util/mx';

import { i18n } from '../services/i18n';

const LoginForm = {};

LoginForm.vm = {
  init() {
    LoginForm.vm.isValid = m.prop(false);

    LoginForm.vm.username = m.prop('');
    LoginForm.vm.password = m.prop('');
    LoginForm.vm.errorMessage = m.prop('');

    LoginForm.vm.isLoading = m.prop(false);
    LoginForm.vm.notificationHandle = m.prop(null);
  }
};

LoginForm.controller = function controller(options) {
  LoginForm.vm.init();

  return {
    login() {
      LoginForm.vm.isLoading(true);

      m.redraw.strategy('diff');

      m.redraw(true);

      options.login({
        username: LoginForm.vm.username(),
        password: LoginForm.vm.password(),
      }, function error(errorObject) {
        LoginForm.vm.errorMessage(errorObject.code);

        LoginForm.vm.isLoading(false);

        Animation.fadesIn(null, LoginForm.vm.notificationHandle());

        m.redraw.strategy('diff');
      });
    }
  };
};

LoginForm.view = function view(ctrl) {
  return m('div', [
    mx.getElement('.notification.is-danger.is-hidden', {
      elementProp: LoginForm.vm.notificationHandle
    }, [
      m('button.delete', {
        onclick() {
          Animation.fadesOut(null, LoginForm.vm.notificationHandle());
        }
      }),
      m.trust(i18n.t(`common:Error.${LoginForm.vm.errorMessage()}`))
    ]),
    m('label.label', { for: 'username' }, i18n.t('common:Login.Username')),
    m('p.control',
      m('input.input', {
        name: 'username',
        type: 'text',
        onchange: m.withAttr('value', LoginForm.vm.username)
      })),
    m('label.label', { for: 'password' }, i18n.t('common:Login.Password')),
    m('p.control',
      m('input.input', {
        name: 'password',
        type: 'password',
        onchange: m.withAttr('value', LoginForm.vm.password)
      })),
    m('p.control',
      m('button.button.is-success.is-medium.custom-max-width', {
        onclick: ctrl.login,
        class: Cond(LoginForm.vm.isLoading()).ifTrue('is-loading')
      }, i18n.t('common:Login.Login')))
  ]);
};

export default LoginForm;
