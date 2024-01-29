import React from 'react';

import CardDateAdmin from './CardDateAdmin';
import CardAdmin from './CardAdmin';
import CardGreenAdmin from './CardGreenAdmin';
import CardDetailsCourier from './CardDetailsCourier';

const ManageOrder = () => {
  return (
    <>
      <CardGreenAdmin />
      <CardAdmin />
      <CardDateAdmin />
      <CardDetailsCourier />
    </>
  );
};

export default ManageOrder;
