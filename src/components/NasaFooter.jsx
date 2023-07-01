import React from 'react';
import PropTypes from 'prop-types';
import { loadLanguagePack, updateLocale } from '@americanexpress/one-app-ducks';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { Box, Grid, CssBaseline } from '@mui/material';
import { Copyright } from './Copyright';
import { ContactUs } from './ContactUs';

export const NasaFooter = ({ languageData, localeName }) => {
  if (languageData) {
    return (
      <IntlProvider locale={localeName} messages={languageData}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '20vh',
          }}
        >
          <CssBaseline />
          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: 'auto',
              backgroundColor: (theme) => (theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800]),
            }}
          >
            <Grid
              container={true}
              spacing={2}
            >
              <Grid
                xs={12}
                container={true}
                justifyContent="space-between"
                alignItems="flex-end"
                flexDirection={{ xs: 'column', sm: 'row' }}
                sx={{ fontSize: '12px' }}
              >
                <Grid
                  item={true}
                  xs={8}
                  sx={{ pl: 2 }}
                >
                  <Copyright />
                </Grid>
                <Grid item={true} xs={4}>
                  <ContactUs />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
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
