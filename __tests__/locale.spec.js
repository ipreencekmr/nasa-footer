import path from 'path';
import { promisify } from 'util';

const glob = promisify(require('glob'));

const localeDir = path.join(__dirname, '../locale');

const schema = {
  properties: {
    greeting: {
      type: 'string',
    },
  },
  required: ['greeting'],
  additionalProperties: false,
};

describe('Language packs', () => {
  let locales = null;
  beforeAll(() => glob('*', { cwd: localeDir }).then((result) => {
    locales = result;
    return locales;
  }));

  // eslint-disable-next-line jest/no-done-callback -- desc
  it('should have the correct schema in each copy file', (done) => {
    const failures = [];
    locales.forEach((localeFile) => {
      // eslint-disable-next-line global-require,import/no-dynamic-require -- desc
      const copy = require(path.join(localeDir, localeFile));
      try {
        expect(copy).toMatchSchema(schema, localeFile);
      } catch (error) {
        failures.push(error);
      }
    });

    if (failures.length > 0) {
      done.fail(failures);
    } else {
      done();
    }
  });
});
