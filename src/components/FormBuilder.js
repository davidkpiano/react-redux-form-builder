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

import {PrismCode} from "react-prism";
import EditField from './EditField';
import snippet from './Snippet';

window.track = track;

const controlMap = {
  text: <input type="text" className="ui-input" placeholder="Add Default Value" />,
  textarea: <textarea />,
};

const createControl = () => ({
  value: '',
});

const createField = () => ({
  id: uniqueId(),
  type: 'text',
  model: 'user.name',
  label: '',
  controls: [createControl()],
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
          <Form model={track(`form.fields[]`, {id: field.id})} className="ui-field">
            {field.controls.map((control, i) =>
              <div className="ui-toggle" key={i}>
                <Control.radio
                  model=".defaultValue"
                  value={control.value}
                  tabIndex={-1}
                />
                <Control.text
                  model={`.controls[${i}].label`}
                  className="ui-input -implicit"
                  placeholder={`Option ${i + 1}`}
                />
                <Control.text
                  model={`.controls[${i}].value`}
                  className="ui-input -implicit"
                  placeholder={`(value)`}
                />
              </div>
            )}
            <div
              className="ui-toggle -button"
              onClick={() =>
                dispatch(actions.push(track(
                  `form.fields[].controls`, {id: field.id}), createControl()))}>
              <input type="radio"/>
              <strong>Add Radio Button</strong>
            </div>
          </Form>
        );
      case 'checkbox':
        return (
          <div className="ui-field">
            {field.controls.map((control, i) =>
              <div className="ui-toggle" key={i}>
                <Control.checkbox
                  model={track(`form.fields[].defaultValue`, {id: field.id})}
                  value={control.value}
                  tabIndex={-1}
                />
                <Control.text
                  model={track(`form.fields[].controls[${i}].label`, {id: field.id})}
                  className="ui-input -implicit"
                  placeholder={`Option ${i + 1}`}
                />
                <Control.text
                  model={track(`form.fields[].controls[${i}].value`, {id: field.id})}
                  className="ui-input -implicit"
                  placeholder={`(value)`}
                />
              </div>
            )}
            <div
              className="ui-toggle -button"
              onClick={() =>
                dispatch(actions.push(track(
                  `form.fields[].controls`,{id: field.id}), createControl()))}>
              <input type="checkbox"/>
              <strong>Add Radio Button</strong>
            </div>
          </div>
        );
      case 'text':
      default:
        const control = field.controls[0];

        return (
          <div className="ui-field">
            <Control.text className="ui-input" placeholder="Default Value"
              model={track('form.fields[].defaultValue', {id: field.id})}/>
          </div>
        );
    }
  }
  render() {
    const { form, form: { fields, currentField }, dispatch } = this.props;

    const editingField = currentField
      ? fields.filter((field) => field.id === currentField)[0]
      : null;

    return (
      <section className="ui-form-builder">
        <div model="form" className="ui-form">
          <div className="ui-row">
            <div className="ui-field">
              <div className="ui-input -implicit -large">
                <span className="ui-subtext">Form for{'\u00a0'}</span>
                <Control.text
                  model="form.model"
                  placeholder="(Form model)"
                  className="ui-input -inner"
                />
              </div>
            </div>
          </div>
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
              <EditField field={field} form={form} />
            </div>
          )}
          <button
            type="button"
            onClick={() => this.handleAddField()}
          >
            Add Field
          </button>
        </div>
        <div className="ui-code">
          <pre>          
            <PrismCode className="language-jsx">
              {snippet('form', form, fields.map((field) =>
                snippet('field', field))
              )}
            </PrismCode>
          </pre>
        </div>
      </section>
    )
  }
}

export default connect(s => s)(FormBuilder);
