import React from 'react';
import {
  Field,
  Control,
  Form,
  actions,
  track,
} from 'react-redux-form';
import { connect } from 'react-redux';
import uniqueId from 'lodash/uniqueId';
import get from 'lodash/get';
import cn from 'classnames';

window.track = track;

const controlMap = {
  text: <input type="text" className="ui-input" placeholder="Add Default Value" />,
  textarea: <textarea />,
};

const createField = () => ({
  id: uniqueId(),
  type: 'text',
  model: 'user.name',
  label: '',
  controls: [],
});

const createControl = () => ({
  value: '',
});

class FormBuilder extends React.Component {
  handleAddField() {
    const { dispatch } = this.props;

    const newField = createField();

    dispatch(actions.push('form.fields', newField));
    dispatch(actions.change('form.currentField', newField.id));
  }
  renderField(field) {
    const { dispatch } = this.props;

    switch (field.type) {
      case 'radio':
        return (
          <div className="ui-field">
            {field.controls.map((control, i) =>
              <div className="ui-toggle">
                <Control.radio
                  model={track(`form.fields[].defaultValue`, {id: field.id})}
                  value={control.value}
                />
                <Control.text
                  model={track(`form.fields[].controls[${i}].label`, {id: field.id})}
                  className="ui-input -implicit"
                  placeholder={`Option ${i + 1}`}
                />
              </div>
            )}
            <div
              className="ui-toggle -button"
              onClick={() =>
                dispatch(actions.push(track(
                  `form.fields[].controls`,{id: field.id}), createControl()))}>
              <input type="radio"/>
              <strong>Add Radio Button</strong>
            </div>
          </div>
        );
      case 'text':
      default:
        return (
          <Field model={field.model}>
            <input type="text" className="ui-input" placeholder="Add Default Value" />
          </Field>
        );
    }
  }
  render() {
    const { form: { fields, currentField }, dispatch } = this.props;

    const editingField = currentField
      ? fields.filter((field) => field.id === currentField)[0]
      : null;

    return (
      <Form model="form" className="ui-form-builder">
        {fields.map((field) =>
          <div
            className={cn('ui-row', {'-active': field.id === currentField})}
            onClick={() => dispatch(actions.change('form.currentField', field.id))}
            key={field.id}
          >
            <div
              className="ui-field"
            >
              <Control.text
                model={track('form.fields[].label', {id: field.id})}
                placeholder="Add Label"
                className="ui-input -implicit"
              />
              {(() => this.renderField(field))()}
            </div>
            <div className="ui-editor">
              <Field model={track('form.fields[].model', {id: field.id})}>
                <label>Model:</label>
                <input
                  className="ui-input"
                  type="text"
                  defaultValue="test"
                />
              </Field>
              <Field model={track('form.fields[].type', {id: field.id})}>
                <label>Type:</label>
                <select>
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="radio">radio</option>
                </select>
              </Field>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => this.handleAddField()}
        >
          Add Field
        </button>
      </Form>
    )
  }
}

export default connect(s => s)(FormBuilder);
