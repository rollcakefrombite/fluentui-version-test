import * as React from 'react';
import { render } from '@testing-library/react';
import { Listbox } from './Listbox';
import { isConformant } from '../../common/isConformant';

describe('Listbox', () => {
  isConformant({
    Component: Listbox,
    displayName: 'Listbox',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Listbox>Default Listbox</Listbox>);
    expect(result.container).toMatchSnapshot();
  });
});
