import React, { useEffect, useState } from 'react';
import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';

import { Status, AvatarContainer } from './styles';
import api from '~/services/api';

import Table from '~/components/Table';
import ActionMenu from '~/components/ActionMenu';
import Avatar from '~/components/Avatar';
import AvatarPlaceholder from '~/components/Avatar/AvatarPlaceholder';
import shortenedName from '~/utils/shortenedName';

const actions = [
  {
    link: 'deliverymans',
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

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [formattedDeliveries, setFormattedDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function renderDeliveryman(name, avatar) {
    if (avatar) {
      return (
        <AvatarContainer>
          <Avatar url={avatar.url} />
          <span>{name}</span>
        </AvatarContainer>
      );
    }

    const formatedShortenedName = shortenedName(name);
    return (
      <AvatarContainer>
        <AvatarPlaceholder>{formatedShortenedName}</AvatarPlaceholder>
        <span>{name}</span>
      </AvatarContainer>
    );
  }

  function renderStatus(status) {
    let color;
    let title;

    switch (status) {
      case 'waiting': {
        color = '#C1BC35';
        title = 'PENDENTE';
        break;
      }
      case 'delivered': {
        color = '#2CA42B';
        title = 'ENTREGUE';
        break;
      }
      case 'out': {
        color = '#4D85EE';
        title = 'RETIRADA';
        break;
      }
      case 'canceled': {
        color = '#DE3B3B';
        title = 'CANCELADA';
        break;
      }
      default:
    }

    return (
      <Status color={color}>
        <span>{title}</span>
      </Status>
    );
  }

  useEffect(() => {
    async function loadDeliveries() {
      setIsLoading(true);
      const response = await api.get('deliveries');
      setDeliveries(response.data);
      setIsLoading(false);
    }

    loadDeliveries();
  }, []);

  useEffect(() => {
    const data = deliveries.map(delivery => [
      `#${delivery.id}`,
      delivery.recipient.name,
      renderDeliveryman(delivery.deliveryman.name, delivery.deliveryman.avatar),
      delivery.recipient.city || '',
      delivery.recipient.state || '',
      renderStatus(delivery.status),
      <ActionMenu actions={actions} />,
    ]);

    setFormattedDeliveries(data);
  }, [deliveries]);
  return (
    <Table
      title="Gerenciando Encomendas"
      placeholder="Buscar por encomendas"
      colunn={colunn}
      data={formattedDeliveries}
      loading={isLoading}
    />
  );
}
