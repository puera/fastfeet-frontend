import React, { useState, useEffect, useMemo } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import shortenedName from '~/utils/shortenedName';

import Dropdown from '~/components/ActionMenu';
import Table from '~/components/Table';
import Avatar from '~/components/Avatar';
import AvatarPlaceholder from '~/components/Avatar/AvatarPlaceholder';

import { AvatarContainer } from './styles';

const colunn = ['ID', 'Foto', 'Nome', 'E-mail', 'Ações'];

export default function Deliveryman() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [formattedDeliverymen, setFormattedDeliverymen] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function renderDeliveryman(name, avatar) {
    if (avatar) {
      return (
        <AvatarContainer>
          <Avatar url={avatar.url} />
        </AvatarContainer>
      );
    }

    const formatedShortenedName = shortenedName(name);
    return (
      <AvatarContainer>
        <AvatarPlaceholder>{formatedShortenedName}</AvatarPlaceholder>
      </AvatarContainer>
    );
  }

  async function loadDeliverymen(query) {
    setIsLoading(true);
    try {
      const response = await api.get(`delivermans?q=${query || ''}`);
      setDeliverymen(response.data);
    } catch (error) {
      toast.error('API Error');
      console.tron.error(error);
    }
    setIsLoading(false);
  }

  function inputChange(e) {
    // checks if enter was pressed (code: 13)
    if (e.keyCode === 13) {
      loadDeliverymen(e.target.value);
      e.target.value = '';
    }
  }

  function registerButtonClickedHandler() {
    history.push('/deliverymans/form');
  }

  useMemo(() => {
    async function deleteButtonClickedHandler(id) {
      try {
        if (window.confirm('Deseja mesmo deletar este entregador?')) {
          await api.delete(`delivermans/${id}`);
          toast.success('Entregador excluído com sucesso!');
          loadDeliverymen();
        }
      } catch (error) {
        toast.error('Erro ao excluir entregador.');
      }
    }

    function renderActions(id) {
      return [
        {
          link: `/deliverymans/form/${id}`,
          title: 'Editar',
          icon: <MdEdit color="#4D85EE" size={16} />,
        },
        {
          title: 'Excluir',
          icon: <MdDeleteForever color="#DE3B3B" size={16} />,
          type: 'button',
          onClickButtonHandler: () => deleteButtonClickedHandler(id),
        },
      ];
    }

    const data = deliverymen.map(deliveryman => [
      `#${deliveryman.id}`,
      renderDeliveryman(deliveryman.name, deliveryman.avatar),
      deliveryman.name,
      deliveryman.email,
      <Dropdown actions={renderActions(deliveryman.id)} />,
    ]);

    setFormattedDeliverymen(data);
  }, [deliverymen]);

  useEffect(() => {
    loadDeliverymen();
  }, []);

  return (
    <Table
      title="Gerenciando entregadores"
      inputHandleChange={inputChange}
      inputPlaceholder="Buscar por entregadores"
      colunn={colunn}
      registerButtonHandler={registerButtonClickedHandler}
      data={formattedDeliverymen}
      loading={isLoading}
    />
  );
}
