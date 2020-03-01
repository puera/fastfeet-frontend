import React from 'react';

import { Status } from './styles';

import Table from '~/components/Table';

const colunn = [
  'ID',
  'Destinatário',
  'Entregador',
  'Cidade',
  'Estado',
  'Status',
];

const data = [
  [
    '#01',
    'Jonas',
    'Renann',
    'Búzios',
    'RJ',
    <Status color="#2CA42B">
      <span>ENTREGUE</span>
    </Status>,
  ],
  [
    '#02',
    'Rafaela',
    'Sergio',
    'Búzios',
    'RJ',
    <Status color="#C1BC35">
      <span>PENDENTE</span>
    </Status>,
  ],
  [
    '#03',
    'Ronaldo',
    'Claudia',
    'Búzios',
    'RJ',
    <Status color="#4D85EE">
      <span>RETIRADA</span>
    </Status>,
  ],
  [
    '#04',
    'Talles',
    'Rafael',
    'Búzios',
    'RJ',
    <Status color="#DE3B3B">
      <span>CANCELADA</span>
    </Status>,
  ],
];

export default function Deliveries() {
  return (
    <Table
      title="Gerenciando Encomendas"
      placeholder="Buscar por encomendas"
      colunn={colunn}
      data={data}
    />
  );
}
