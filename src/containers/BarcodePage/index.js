/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';
import pdb from 'utils/historyPDB';
import { Barcode, Input } from './style';

pdb.initPDB();

export default function BarcodePage() {
  const [value, setValue] = useState('');

  const onKeyDown = e => {
    if (!value || e.key !== 'Enter') return;
    pdb.saveDoc(value, 1);
    setValue('');
  };

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <Barcode>
      <Input
        placeholder="輸入商品標號..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </Barcode>
  );
}
