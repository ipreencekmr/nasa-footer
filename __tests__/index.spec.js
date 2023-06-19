import MainExport from '../src';
import ModuleContainer from '../src/components/NasaFooter';

describe('index', () => {
  it('should export the top component', () => {
    expect(MainExport).toBe(ModuleContainer);
  });
});
