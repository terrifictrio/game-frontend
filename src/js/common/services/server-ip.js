const ipRegex =
      new RegExp([/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}/,
                  /(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/,
                  /(:\d{1,5})?$/
                 ].map(exp => exp.source).join(''));

const createServerIp = function createServerIp(storage) {
  const ITEM_KEY = 'currentIp';

  const ip = function ip(...args) {
    if (args.length === 0) {
      return storage.getItem(ITEM_KEY);
    }

    storage.setItem(ITEM_KEY, args[0]);

    return args[0];
  };

  const set = function set(value) {
    if (validate(value)) {
      ip(value);

      return true;
    }

    return false;
  };

  const validate = function validate(value) {
    return ipRegex.test(value);
  };

  const isSet = function isSet() {
    return ip() !== null;
  };

  const retrieve = function retrieve() {
    return ip();
  };

  const discard = function discard() {
    storage.removeItem(ITEM_KEY);
  };

  return {
    set,
    isSet,
    retrieve,
    validate,
    discard
  };
};

const ServerIp = createServerIp(sessionStorage);

ServerIp.create = createServerIp;

export default ServerIp;
