import React from 'react';
import PropTypes from 'prop-types';
import { loadLanguagePack, updateLocale } from '@americanexpress/one-app-ducks';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

export const NasaFooter = ({ languageData, localeName }) => {
  // Read about loading async data:
  // https://github.com/americanexpress/one-app/blob/main/docs/api/modules/Loading-Data.md
  // quick and dirty solution - implement based on your use case
  if (languageData) {
    return (
      <IntlProvider locale={localeName} messages={languageData}>
        Footer
      </IntlProvider>
    );
  }
  return null;
};

NasaFooter.propTypes = {
  languageData: PropTypes.shape({}).isRequired,
  localeName: PropTypes.string.isRequired,
};

export const mapDispatchToProps = (dispatch) => ({
  switchLanguage: async ({ target }) => {
    await dispatch(updateLocale(target.value));
    await dispatch(loadLanguagePack('nasa-footer', { fallbackLocale: 'en-US' }));
  },
});

export const mapStateToProps = (state) => {
  const localeName = state.getIn(['intl', 'activeLocale']);
  const languagePack = state.getIn(
    ['intl', 'languagePacks', localeName, 'nasa-footer'],
    fromJS({})
  ).toJS();

  return {
    languageData: languagePack && languagePack.data ? languagePack.data : {},
    localeName,
  };
};

export const loadModuleData = ({ store: { dispatch } }) => dispatch(loadLanguagePack('nasa-footer', { fallbackLocale: 'en-US' }));

NasaFooter.holocron = {
  name: 'nasa-footer',
  loadModuleData,
};

export default connect(mapStateToProps, mapDispatchToProps)(NasaFooter);
