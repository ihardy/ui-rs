import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import {
  AccordionSet,
  Accordion,
  Icon,
  Pane,
  Layer,
  Button,
} from '@folio/stripes/components';

import PatronRequestInfo from './Sections/PatronRequestInfo';

class ViewPatronRequest extends React.Component {
  static manifest = Object.freeze({
    selectedPatronRequest: {
      type: 'okapi',
      path: 'rs/patronrequests/:{id}',
    },
    query: {},
  });

  static propTypes = {
    stripes: PropTypes.object,
    resources: PropTypes.shape({
      query: PropTypes.shape({
        layer: PropTypes.string,
      }),
      selectedPatronRequest: PropTypes.shape({
        records: PropTypes.array,
      }),
    }),
    paneWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.getActionMenu = this.getActionMenu.bind(this);
  }

  state = {
    sections: {
      requestInfo: false,
    }
  }

  getPatronRequest() {
    return get(this.props.resources.selectedPatronRequest, ['records', 0], {});
  }

  getSectionProps() {
    return {
      patronRequest: this.getPatronRequest(),
      onToggle: this.handleSectionToggle,
      stripes: this.props.stripes,
    };
  }

  handleSectionToggle = ({ id }) => {
    this.setState((prevState) => ({
      sections: {
        ...prevState.sections,
        [id]: !prevState.sections[id],
      }
    }));
  }

  renderEditLayer() {
    const { resources: { query } } = this.props;

    return ( // XXX do this bit first
      <Layer
        isOpen={query.layer === 'edit'}
        contentLabel="cant get intl to work"
      >
        Editing ...
      </Layer>
    );
  }

  getActionMenu({ onToggle }) {
    const items = [];
    /**
     * We only want to render the action menu
     * if we have something to show
     */
    if (!items.length) {
      return null;
    }

    /**
     * Return action menu
     */
    return (
      <Fragment>
        {items.map((item, index) => (
          <Button
            key={index}
            buttonStyle="dropdownItem"
            id={item.id}
            aria-label={item.ariaLabel}
            href={item.href}
            onClick={() => {
              // Toggle the action menu dropdown
              onToggle();
              item.onClick();
            }}
          >
            <Icon icon={item.icon}>
              {item.label}
            </Icon>
          </Button>
        ))}
      </Fragment>
    );
  }

  render() {
    const patronRequest = this.getPatronRequest();
    const sectionProps = this.getSectionProps();

    return (
      <Pane
        id="pane-view-patron-request"
        defaultWidth={this.props.paneWidth}
        paneTitle={patronRequest.id}
        dismissible
        onClose={this.props.onClose}
        actionMenu={this.getActionMenu}
      >
        <AccordionSet accordionStatus={this.state.sections}>
          <PatronRequestInfo id="patronRequestInfo" {...sectionProps} />
          <Accordion
            id="developerInfo"
            label="test"
            displayWhenClosed="test2"
            {...sectionProps}
          >
            <pre>{JSON.stringify(patronRequest, null, 2)}</pre>
          </Accordion>
        </AccordionSet>
        { this.renderEditLayer() }
      </Pane>
    );
  }
}

export default ViewPatronRequest;