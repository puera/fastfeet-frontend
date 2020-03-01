import React from 'react';
import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';

import { Status } from './styles';

import Table from '~/components/Table';
import ActionMenu from '~/components/ActionMenu';

const actions = [
  {
    link: 'deliveries',
    title: 'Visualizar',
    icon: <MdRemoveRedEye color="#8E5BE8" size={16} />,
  },
  {
    link: 'deliveries',
    title: 'Editar',
    icon: <MdEdit color="#4D85EE" size={16} />,
  },
  {
    link: 'deliveries',
    title: 'Excluir',
    icon: <MdDeleteForever color="#DE3B3B" size={16} />,
  },
];

const colunn = [
  'ID',
  'Destinatário',
  'Entregador',
  'Cidade',
  'Estado',
  'Status',
  'Ações',
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
    <ActionMenu actions={actions} />,
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
    <ActionMenu actions={actions} />,
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
    <ActionMenu actions={actions} />,
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
    <ActionMenu actions={actions} />,
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
