import React from 'react';
import { FormattedMessage } from 'react-intl';
import { DirectLink } from '@folio/stripes-reshare';
import { Button, Icon } from '@folio/stripes/components';
import { ShowModalButton } from '../../ModalButtons';

export { default as Generic } from './Generic';

// Named corresponding to actions
export const SupplierCannotSupply = () => (
  <ShowModalButton buttonStyle="dropdownItem" modal="CannotSupply">
    <Icon icon="times-circle-solid"><FormattedMessage id="ui-rs.actions.cannotSupply" /></Icon>
  </ShowModalButton>
);

export const SupplierConditionalSupply = () => (
  <ShowModalButton buttonStyle="dropdownItem" modal="ConditionalSupply">
    <Icon icon="times-circle-solid"><FormattedMessage id="ui-rs.actions.conditionalSupply" /></Icon>
  </ShowModalButton>
);

export const SupplierAddCondition = () => (
  <ShowModalButton buttonStyle="dropdownItem" modal="AddCondition">
    <Icon icon="times-circle-solid"><FormattedMessage id="ui-rs.actions.addCondition" /></Icon>
  </ShowModalButton>
);

export const RespondYes = () => (
  <ShowModalButton buttonStyle="dropdownItem" modal="RespondYes">
    <Icon icon="check-circle"><FormattedMessage id="ui-rs.actions.respondYes" /></Icon>
  </ShowModalButton>
);

// Client only, component names do not correspond to actions
export const PrintPullSlip = () => (
  <DirectLink component={Button} buttonStyle="dropdownItem" to="pullslip">
    <Icon icon="print"><FormattedMessage id="ui-rs.printPullslip" /></Icon>
  </DirectLink>
);
