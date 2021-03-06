import React, { Component } from 'react'

import Popover from '../../components/Popover'

import { SnapmoodPeriod } from '../../snapmoods'

import ProjectMenu from './ProjectMenu'
import ProjectForm from './ProjectForm'

import './ProjectItem.css'

class ProjectItem extends Component {
  constructor(props) {
    super(props)
    this.state = { opened: false }
  }

  handleChangeName(e) {
    e.preventDefault()
    if (this.props.project.name === this.name.value) {
      return
    }
    this.props.update({ name: this.name.value })
  }

  handleToggleVisibility(e) {
    e.preventDefault()
    this.setState({ opened: !this.state.opened })
  }

  handleOnSubmit(e, data) {
    e.preventDefault()
    this.props.update(data)
  }

  render() {
    const { project } = this.props

    return (
      <div
        id={ `project-${ project.id }` }
        className={ 'project' + (this.state.opened ? ' project-active' : '') }
      >
        <div className="project-header">
          <div className="project-header-actions">
            { this.props.isUpdating || this.props.isDeleting ?
              <i className="fa fa-spinner fa-pulse" />
            :
              <a
                ref={ ref => { this.manageButton = ref } }
                className="project-manage-button"
                href="#"
                onClick={ e => this.popover.toggle(e) }
              >
                <i className="fa fa-cog" />
              </a>
            }

            <Popover ref={ ref => { this.popover = ref } }>
              <ProjectMenu
                project={ project }
                toggleArchive={ this.props.toggleArchive }
                remove={ this.props.remove }
                isDeleting={ this.props.isDeleting }
              />
            </Popover>

            <a
              className="project-opener-button"
              href="#"
              onClick={ this.handleToggleVisibility.bind(this) }
            >
              <i className={ 'fa ' + (this.state.opened ? 'fa-caret-down' : 'fa-caret-right') } />
            </a>

            { !this.props.project.description ?
              <i className="project-warning fa fa-exclamation-triangle" title="La description du projet n'a pas été renseignée" />
            :
              null
            }

            <input
              className="project-name"
              ref={ ref => { this.name = ref } }
              onBlur={ this.handleChangeName.bind(this) }
              defaultValue={ project.name }
            />
          </div>

          <SnapmoodPeriod
            period={ project.period }
            updateMoodByWeek={ this.props.updateMoodByWeek }
            isMoodUpdating={ this.props.isMoodUpdating }
          />
        </div>

        { this.state.opened ?
          <ProjectForm
            project={ project }
            onSubmit={ this.handleOnSubmit.bind(this) }
            isUpdating={ this.props.isUpdating }
          />
        :
          null
        }
      </div>
    )
  }
}

export default ProjectItem
