import React from 'react';
import PropTypes from 'prop-types';
import { loadLanguagePack, updateLocale } from '@americanexpress/one-app-ducks';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import {
  Box, Grid, CssBaseline, Typography,
} from '@mui/material';
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
              mt: 'auto',
              backgroundColor: '#e2e2e2',
              width: '100%',
            }}
          >
            <Grid
              container={true}
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Grid
                item={true}
                xs={12}
              >
                <Typography
                  sx={{
                    padding: '20px 20px 10px 20px;',
                    'text-align': 'center',
                    'font-weight': '400',
                    'font-size': '1rem',
                    color: '#6f696f',
                  }}
                >
                  MICRO FRONT-END APPLICATION
                </Typography>
                <hr />
              </Grid>
              <Grid
                item={true}
                xs={12}
                sm={8}
                md={6}
              >
                <ContactUs />
              </Grid>
              <Grid
                item={true}
                xs={12}
                sm={4}
                md={6}
                textAlign={{
                  xs: 'left',
                  sm: 'right',
                  md: 'right',
                }}
                padding={{
                  xs: '0px 0px 20px 20px;',
                  sm: '0px 20px 20px 0px;',
                  md: '0px 20px 20px 0px;',
                }}
              >
                <Copyright />
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
