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
  model: 'name',
  label: '',
  controls: [createControl()],
});

class FormBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentField: props.form.currentField,
      editingField: props.form.currentField,
    }
  }
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
                  model=".initialValue"
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
            <button
              className="ui-toggle -button"
              onClick={() =>
                dispatch(actions.push(track(
                  `form.fields[].controls`, {id: field.id}), createControl()))}>
              <input type="radio"/>
              <span className="ui-subtext">Add Radio Button</span>
            </button>
          </Form>
        );
      case 'checkbox':
        return (
          <div className="ui-field">
            {field.controls.map((control, i) =>
              <div className="ui-toggle" key={i}>
                <Control.checkbox
                  model={track(`form.fields[].initialValue`, {id: field.id})}
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
            <Control.text
              className="ui-input"
              readOnly
              placeholder="Default Value"
              model={track('form.fields[].initialValue', {id: field.id})}
            />
          </div>
        );
    }
  }
  render() {
    const { form, form: { fields }, dispatch } = this.props;
    const { currentField, editingField } = this.state;

    return (
      <section className="ui-form-builder">
        <div model="form" className="ui-form">
          <div className="ui-row">
            <div className="ui-content">
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
              onClick={() => this.setState({currentField: field.id, editingField: field.id})}
              key={field.id}
            >
              <div className="ui-content">
                <div className="ui-field">
                  <Control.text
                    model={track('form.fields[].label', {id: field.id})}
                    placeholder="Add Label"
                    className="ui-input -implicit"
                  />
                </div>
                {(() => this.renderField(field))()}
              </div>
              <EditField field={field} form={form} open={editingField === field.id} />
            </div>
          )}
          <button
            className="ui-add-field"
            type="button"
            onClick={() => this.handleAddField()}
          >
            Add Field
          </button>
        </div>
        <div className="ui-code">
          <pre>          
            <PrismCode className="language-jsx">
              {snippet('form', form)}
            </PrismCode>
          </pre>
        </div>
      </section>
    )
  }
}

export default connect(s => s)(FormBuilder);
