/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Map } from 'immutable';
import styled from 'styled-components';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectOptionsLoading,
  makeSelectOptionsSuccess,
} from './selectors';
import { getOptions } from './actions';
import reducer from './reducer';
import saga from './saga';
import SelectGroup from './SelectGroup';

const key = 'home';

const Container = styled.div`
  display: flex;
  margin: 0 -8px;
`;

export class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.match.params,
      options: null,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.options) {
      return {
        options: nextProps.options,
      };
    }

    return null;
  }

  componentDidMount() {
    const { service, brand, style } = this.props.match.params;

    if (service && brand && style) {
      this.setState({
        values: { service, brand, style },
      });
    }

    this.props.getOptions();
  }

  onOptionSelect = evt => {
    const { target } = evt;

    this.setState(
      state => ({
        values: {
          ...state.values,
          [target.name]: target.value,
        },
      }),
      () => {
        const { service, brand, style } = this.state.values;

        if (
          service &&
          brand &&
          style &&
          !Map(this.state).equals(Map(this.props.match.params))
        ) {
          this.props.history.push(`/s-${service}/b-${brand}/st-${style}`);
        }
      },
    );
  };

  render() {
    const { options, values } = this.state;
    const { loading } = this.props;

    return (
      <Container>
        <SelectGroup
          name="service"
          label="Выберете услугу:"
          onOptionSelect={this.onOptionSelect}
          isLoading={loading}
          value={values && values.service}
          options={options && options.services}
        />

        <SelectGroup
          name="brand"
          label="Выберете марку автомобиля:"
          onOptionSelect={this.onOptionSelect}
          isLoading={loading}
          value={values && values.brand}
          options={options && options.brands}
        />

        <SelectGroup
          name="style"
          label="Выберете стиль автомобиля:"
          onOptionSelect={this.onOptionSelect}
          isLoading={loading}
          value={values && values.style}
          options={options && options.styles}
        />
      </Container>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      service: PropTypes.string,
      brand: PropTypes.string,
      style: PropTypes.string,
    }).isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  getOptions: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  options: makeSelectOptionsSuccess(),
  loading: makeSelectOptionsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getOptions: () => dispatch(getOptions()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  memo,
)(HomePage);
