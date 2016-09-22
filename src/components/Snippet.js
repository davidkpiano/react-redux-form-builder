import React from 'react';
import {
  Field,
  Control,
  Form,
  actions,
  track,
} from 'react-redux-form';
import cn from 'classnames';

function innerToString(inner) {  
  if (Array.isArray(inner)) {
    return inner.join('\n');
  }
  if (!inner) {
    return '';
  }
  return inner;
}

function jsxValue(value) {
  if (typeof value === 'string') {
    return `"${value}"`;
  }

  return `{${JSON.stringify(value)}}`;
}

export default function snippet(type, data) {
  let inner;

  switch (type) {
    case 'form':
      inner = innerToString(data.fields.map(
        (field) => snippet('field', field)));

      return `
<Form model="${data.model}">
  ${inner.replace(/\n/g, '\n  ')}
</Form>
      `;
    case 'field':
      inner = innerToString(data.controls.map(
        (control) => snippet('control', {
          ...control,
          ...data,
        })));

      return `
<Field model=".${data.model}">
  ${data.label ? `<label>${data.label}</label>` : ''}
  ${inner.replace(/\n/g, '\n  ')}
</Field>
      `;

    case `control`:
      switch (data.type) {
        case 'radio':
          return `
<Control.${data.type}
  model=".${data.model}"
  value=${jsxValue(data.value)}
/>
          `
        default:      
          return `
<Control.${data.type} model=".${data.model}" />
          `;
      }

    default:
      return `poop`;
  }
}
