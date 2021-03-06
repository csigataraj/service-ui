import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { assignedProjectsSelector } from 'controllers/user';
import { ScrollWrapper } from 'components/main/scrollWrapper/scrollWrapper';
import styles from './assignedProjectsBlock.scss';
import { BlockContainerBody, BlockContainerHeader } from '../blockContainer';

const cx = classNames.bind(styles);
const messages = defineMessages({
  headerNameCol: {
    id: 'AssignedProjectsBlock.headerNameCol',
    defaultMessage: 'Assigned on projects',
  },
  headerRoleCol: {
    id: 'AssignedProjectsBlock.headerRoleCol',
    defaultMessage: 'Project role',
  },
});

@connect((state) => ({
  projects: assignedProjectsSelector(state),
}))
@injectIntl
export class AssignedProjectsBlock extends Component {
  static propTypes = {
    projects: PropTypes.object,
    intl: intlShape.isRequired,
  };
  static defaultProps = {
    projects: [],
  };

  render = () => {
    const { intl, projects } = this.props;
    return (
      <div className={cx('assigned-projects-block')}>
        <BlockContainerHeader>
          <div className={cx('name-col')}>
            {intl.formatMessage(messages.headerNameCol)}
            {` (${Object.keys(projects).length})`}
          </div>
          <div className={cx('role-col')}>{intl.formatMessage(messages.headerRoleCol)}</div>
        </BlockContainerHeader>

        <ScrollWrapper autoHeight autoHeightMax={350}>
          <BlockContainerBody>
            {Object.keys(projects).map((project) => (
              <div key={project} className={cx('project-item')}>
                <div className={cx('name-col')}>{project}</div>
                <div className={cx('role-col')}>{projects[project].projectRole}</div>
              </div>
            ))}
          </BlockContainerBody>
        </ScrollWrapper>
      </div>
    );
  };
}
