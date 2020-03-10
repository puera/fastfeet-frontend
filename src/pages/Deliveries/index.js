import React, { useEffect, useState, useMemo } from 'react';
import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import { Status, AvatarContainer } from './styles';

import shortenedName from '~/utils/shortenedName';

import api from '~/services/api';
import history from '~/services/history';

import GlobalModal from '~/components/Global/Modal';
import Table from '~/components/Table';
import ActionMenu from '~/components/ActionMenu';
import Avatar from '~/components/Avatar';
import AvatarPlaceholder from '~/components/Avatar/AvatarPlaceholder';

import { renderVisualizeModal } from './Modal';

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [deliveries, setDeliveries] = useState([]);
  const [formattedDeliveries, setFormattedDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [deliveryId, setDeliveryId] = useState();
  const [deliveryDetails, setDeliveryDetails] = useState();

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

  async function loadDeliveries(query, pageToLoad) {
    setIsLoading(true);
    try {
      const response = await api.get('deliveries', {
        params: { page: pageToLoad, q: query },
      });
      setDeliveries(response.data.deliveries);
      setTotalPages(Math.ceil(response.data.count / 5));
    } catch (error) {
      toast.error('API Error');
      console.tron.error(error);
    }
    setIsLoading(false);
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

  function inputChange(e) {
    // checks if enter was pressed (code: 13)
    if (e.keyCode === 13) {
      loadDeliveries(e.target.value);
      e.target.value = '';
    }
  }

  useMemo(() => {
    function visualizeButtonClickedHandler(id) {
      setDeliveryId(id);
      setIsModalOpened(true);
    }

    async function deleteButtonClickedHandler(id) {
      try {
        if (window.confirm('Deseja mesmo deletar esta encomenda?')) {
          await api.delete(`deliveries/${id}`);
          toast.success('Encomenda excluída com sucesso!');
          loadDeliveries();
          if (deliveries.length > 1) {
            loadDeliveries(null, page);
          } else {
            setPage(page - 1);
          }
        }
      } catch (error) {
        toast.error('Erro ao excluir encomenda.');
      }
    }

    function renderActions(id, status) {
      const data = [
        {
          title: 'Visualizar',
          icon: <MdRemoveRedEye color="#8E5BE8" size={16} />,
          type: 'button',
          onClickButtonHandler: () => visualizeButtonClickedHandler(id),
        },
        {
          title: 'Excluir',
          icon: <MdDeleteForever color="#DE3B3B" size={16} />,
          type: 'button',
          onClickButtonHandler: () => deleteButtonClickedHandler(id),
        },
      ];

      if (status !== 'delivered' && status !== 'canceled') {
        data.splice(1, 0, {
          link: `/deliveries/form/${id}`,
          title: 'Editar',
          icon: <MdEdit color="#4D85EE" size={16} />,
        });
      }

      return data;
    }

    const data = deliveries.map(delivery => [
      `#${delivery.id}`,
      delivery.recipient.name,
      renderDeliveryman(delivery.deliveryman.name, delivery.deliveryman.avatar),
      delivery.recipient.city || '',
      delivery.recipient.state || '',
      renderStatus(delivery.status),
      <ActionMenu actions={renderActions(delivery.id, delivery.status)} />,
    ]);

    setFormattedDeliveries(data);
  }, [deliveries, page]);

  useEffect(() => {
    if (deliveryId === null || isModalOpened === false) return;

    const delivery = deliveries.find(d => d.id === deliveryId);

    setDeliveryDetails(renderVisualizeModal(delivery));
  }, [isModalOpened, deliveryId, deliveries]);

  useEffect(() => {
    loadDeliveries(null, page);
  }, [page]);

  return (
    <>
      <GlobalModal
        isOpened={isModalOpened}
        title="Informações da encomenda"
        closeHandler={() => setIsModalOpened(false)}
      >
        {deliveryDetails || <></>}
      </GlobalModal>
      <Table
        title="Gerenciando Encomendas"
        inputPlaceholder="Buscar por encomendas"
        colunn={colunn}
        data={formattedDeliveries}
        loading={isLoading}
        registerButtonHandler={() => history.push('/deliveries/form')}
        inputHandleChange={inputChange}
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </>
  );
}
