import React from 'react';
import {
  Field,
  Control,
  Form,
  actions,
  track,
} from 'react-redux-form';
import cn from 'classnames';

export default function renderSnippet(type, data, inner) {
  if (Array.isArray(inner)) {
    inner = inner.join('\n');
  } else if (!inner) {
    inner = '';
  }

  switch (type) {
    case 'form':
      return `
<Form model="${data.model}">
  ${inner.replace(/\n/g, '\n  ')}
</Form>
      `
    case 'field':
      return `
<Field model=".${data.model}">
  ${data.label ? `<label>${data.label}</label>` : ''}
  ${inner}
</Field>
      `
    default:
      return `poop`;
  }
}
