import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  Button,
  Card,
  Col,
  InfoPopover,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';
import { RefdataButtons } from '@folio/stripes-reshare';
import snakeToCamel from '../../util/snakeToCamel';
import css from './SettingField.css';


class SettingField extends React.Component {
  static propTypes = {
    settingData: PropTypes.shape({
      refdatavalues: PropTypes.arrayOf(PropTypes.object),
      currentSetting: PropTypes.object
    }),
    input: PropTypes.object,
    onSave: PropTypes.func
  };

  state = {
    editing: false
  };

  renderHelpText = (key) => {
    const id = `ui-rs.settingName.${key}.help`;
    if (!this.props.intl.messages[id]) return undefined;

    return (
      <div className={css.help}>
        <FormattedMessage
          id={id}
          values={{
            b: (chunks) => <b>{chunks}</b>,
            i: (chunks) => <i>{chunks}</i>,
            em: (chunks) => <em>{chunks}</em>,
            strong: (chunks) => <strong>{chunks}</strong>,
            span: (chunks) => <span>{chunks}</span>,
            div: (chunks) => <div>{chunks}</div>,
            p: (chunks) => <p>{chunks}</p>,
            ul: (chunks) => <ul>{chunks}</ul>,
            ol: (chunks) => <ol>{chunks}</ol>,
            li: (chunks) => <li>{chunks}</li>,
          }}
        />
      </div>
    );
  };

  renderSettingValue = (setting) => {
    const { settingData } = this.props;
    if (setting.settingType === 'Refdata') {
      const refValues = settingData?.refdatavalues?.filter((obj) => {
        return obj.desc === setting.vocab;
      })[0]?.values;
      const settingLabel = setting.value ? refValues?.filter((obj) => obj.value === setting.value)[0]?.label : undefined;
      return (
        <p>
          {settingLabel || (setting.defValue ? `[default] ${setting.defValue}` : <FormattedMessage id="ui-rs.settings.no-current-value" />)}
        </p>
      );
    } else if (setting.settingType !== 'Password') {
      return (
        <p>
          {setting.value ? setting.value : (setting.defValue ? `[default] ${setting.defValue}` : <FormattedMessage id="ui-rs.settings.no-current-value" />)}
        </p>
      );
    } else {
      return (
        <p>
          {setting.value ? '********' : (setting.defValue ? '[default] ********' : <FormattedMessage id="ui-rs.settings.no-current-value" />)}
        </p>
      );
    }
  }

  renderEditSettingValue = (setting) => {
    const { settingData } = this.props;

    // We need to check if we are working with a String Setting or with a refdata one
    if (setting.settingType === 'String') {
      return (
        <Field
          autoFocus
          name={`${this.props.input.name}`}
          component={TextField}
          parse={v => v} // Lets us send an empty string instead of 'undefined'
        />
      );
    } else if (setting.settingType === 'Password') {
      return (
        <Field
          autoFocus
          name={`${this.props.input.name}`}
          type="password"
          component={TextField}
          parse={v => v} // Lets us send an empty string instead of 'undefined'
        />
      );
    } else {
      // Grab refdata values corresponding to setting
      const selectRefValues = settingData?.refdatavalues.filter((obj) => {
        return obj.desc === setting.vocab;
      })[0].values;

      if (selectRefValues.length > 0 && selectRefValues.length <= 4) {
        return (
          <Field
            name={`${this.props.input.name}`}
            component={RefdataButtons}
            dataOptions={selectRefValues}
          />
        );
      }
      return (
        <Field
          name={`${this.props.input.name}`}
          component={Select}
          dataOptions={selectRefValues}
        />
      );
    }
  }


  renderEditButton() {
    const { editing } = this.state;
    let EditText;

    if (editing === true) {
      EditText = <FormattedMessage id="ui-rs.settings.finish-editing" />;
      return (
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            return (
              this.handleSave()
            );
          }}
        >
          {EditText}
        </Button>
      );
    } else {
      EditText = <FormattedMessage id="ui-rs.settings.edit" />;
      return (
        <Button
          onClick={(e) => {
            e.preventDefault();
            return (
              this.setState({ editing: true })
            );
          }}
        >
          {EditText}
        </Button>
      );
    }
  }

  handleSave = () => {
    this.props.onSave()
      .then(() => this.setState({ editing: false }));
  }

  render() {
    const { settingData } = this.props;
    const currentSetting = settingData?.currentSetting;
    const setting = currentSetting || {};

    let renderFunction;
    if (this.state.editing === false) {
      renderFunction = this.renderSettingValue(setting);
    } else {
      renderFunction = this.renderEditSettingValue(setting);
    }

    const camelKey = snakeToCamel(setting.key);
    return (
      <Card
        headerStart={currentSetting ? <FormattedMessage id={`ui-rs.settingName.${camelKey}`} /> : <FormattedMessage id="ui-rs.settingName.settingLoading" />}
        headerEnd={this.renderEditButton()}
        roundedBorder
      >
        {renderFunction}
        <InfoPopover content={this.renderHelpText(camelKey)} />
      </Card>
    );
  }
}

export default injectIntl(SettingField);
