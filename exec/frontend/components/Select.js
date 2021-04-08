import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';
import ModalDropdown from 'react-native-modal-dropdown';
import { Block, Text } from 'galio-framework';

import Icon from './Icon';
import { nowTheme } from '../constants';

class DropDown extends React.Component {
  state = {
    value: this.props.default
  };

  handleOnSelect = (index, value) => {
    const { onSelect } = this.props;

    this.setState({ value: value });
    onSelect && onSelect(index, value);
  };

  render() {
    const {
      onSelect,
      iconName,
      iconFamily,
      iconSize,
      iconColor,
      color,
      textStyle,
      style,
      ...props
    } = this.props;

    const modalStyles = [styles.qty, color && { backgroundColor: color }, style];

    const textStyles = [styles.text, textStyle];

    return (
      <ModalDropdown
        style={modalStyles}
        onSelect={this.handleOnSelect}
        dropdownStyle={styles.dropdown}
        dropdownTextStyle={textStyles, { paddingLeft: 30, fontSize: 14, height: 40}}
        {...props}
      >
        <Block flex row middle space="between">
          <Text size={Platform.OS == 'android' ? 11 : 14} style={textStyles}>
            {this.state.value}
          </Text>
          <Icon
            name={iconName || 'minimal-down2x'}
            family={iconFamily || 'NowExtra'}
            size={iconSize || 15}
            color={iconColor || nowTheme.COLORS.WHITE}
          />
        </Block>
      </ModalDropdown>
    );
  }
}

DropDown.propTypes = {
  onSelect: PropTypes.func,
  iconName: PropTypes.string,
  iconFamily: PropTypes.string,
  iconSize: PropTypes.number,
  color: PropTypes.string,
  textStyle: PropTypes.any
};

const styles = StyleSheet.create({
  qty: {
    width: 83,
    backgroundColor: nowTheme.COLORS.DEFAULT,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 9.5,
    borderRadius: 12,
  },
  text: {
    fontFamily: 'montserrat-regular',
    color: nowTheme.COLORS.WHITE,
    padding: 5
  },
  dropdown: {
    marginTop: 8,
    marginLeft: -10,
    width: 70,
  }
});

export default DropDown;
