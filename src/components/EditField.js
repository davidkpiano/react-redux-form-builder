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
    const {field, form} = this.props;
    const className = cn('ui-editor', field.id === form.currentField && '-active');

    return (
      <div className={className}>
        <Field model={track('form.fields[].model', {id: field.id})}>
          <label className="ui-label">Model:</label>
          <div className="ui-input">
            <span className="ui-subtext">{form.model}.</span>
            <input
              className="ui-input -inner"
              type="text"
              defaultValue="test"
            />
          </div>
        </Field>
        <Field model={track('form.fields[].type', {id: field.id})}>
          <label className="ui-label">Type:</label>
          <select>
            <option value="text">Text</option>
            <option value="textarea">Textarea</option>
            <option value="radio">radio</option>
            <option value="checkbox">checkbox</option>
          </select>
        </Field>
      </div>
    )
  }
}
