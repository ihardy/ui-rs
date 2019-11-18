import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import setFieldData from 'final-form-set-field-data';
import { FormattedMessage } from 'react-intl';

import SettingField from './SettingField';

export default class EditableSettingsListFieldArray extends React.Component {

  handleSave = (index) => {
    console.log("handleSave called in Editable Settings List Field Array")
    console.log("Props handleSave in ESLFA has access to %o", this.props, "index called: ", index)

    const setting = this.props.fields.value[index]
    console.log("handleSave Setting: %o", setting)
    return this.props.onSave(setting)
  }


  render() {
    const { data, fields, mutators } = this.props;
    let name;
    return (
      (fields.value || []).map((setting, i) => (
        name = `${fields.name}[${i}]`,
        <Field
          component={SettingField}
          name={`${fields.name}[${i}].value`}
          mutators={mutators}
          onSave={() => this.handleSave(i)}
          data={{
            currentSetting: [setting, i], 
            refdatavalues: data.refdatavalues
          }}
          initialValues={this.props.initialValues}
        />
      ))
    );
  }
}
