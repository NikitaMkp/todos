import app from './app';
import github from './github';
import user from './user';
import todos from './todos';

export default {
  ...app,
  ...github,
  ...user,
  ...todos,
};
