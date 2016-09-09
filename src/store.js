import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { combineForms } from 'react-redux-form';
import uniqueId from 'lodash/uniqueId';

const createField = () => ({
  id: uniqueId(),
  type: 'radio',
  model: 'user.name',
  label: '',
  controls: [],
});

const initialField = createField();

const initialFormState = {
  model: '',
  fields: [initialField],
  currentField: initialField.id,
};

const store = window.store = createStore(combineForms({
  form: initialFormState,
}), applyMiddleware(thunk, createLogger()));

export default store;
