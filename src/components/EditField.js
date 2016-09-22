import React from 'react';
import {
  Field,
  Control,
  Form,
  actions,
  track,
} from 'react-redux-form';
import cn from 'classnames';

export default class EditField extends React.Component {
  render() {
    const {field, form, open} = this.props;
    const className = cn('ui-editor', open && '-active');

    return (
      <div className={className}>
        <div className="ui-field">
          <label className="ui-label">Model</label>
          <div className="ui-input">
            <span className="ui-subtext">{form.model}.</span>
            <Control.text
              model={track('form.fields[].model', {id: field.id})}
              className="ui-input -inner"
            />
          </div>
        </div>
        <div className="ui-field">
          <label className="ui-label">Type</label>
          <Control.select model={track('form.fields[].type', {id: field.id})}>
            <option value="text">Text</option>
            <option value="textarea">Textarea</option>
            <option value="radio">radio</option>
            <option value="checkbox">checkbox</option>
          </Control.select>
        </div>
        <div className="ui-field">
          <label className="ui-label">Initial Value</label>
          <Control.text
            model={track('form.fields[].initialValue', {id: field.id})}
            className="ui-input -block"
          />
        </div>
      </div>
    )
  }
}
