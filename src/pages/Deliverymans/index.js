import React, { useState, useEffect, useMemo } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import shortenedName from '~/utils/shortenedName';

import ActionMenu from '~/components/ActionMenu';
import Table from '~/components/Table';
import Avatar from '~/components/Avatar';
import AvatarPlaceholder from '~/components/Avatar/AvatarPlaceholder';

import { AvatarContainer } from './styles';

const colunn = ['ID', 'Foto', 'Nome', 'E-mail', 'Ações'];

export default function Deliveryman() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [deliverymans, setDeliverymans] = useState([]);
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

  async function loadDeliveryman(query, pageToLoad) {
    setIsLoading(true);
    try {
      const response = await api.get('delivermans', {
        params: { page: pageToLoad, q: query },
      });
      setDeliverymans(response.data.delivermans);
      setTotalPages(Math.ceil(response.data.count / 5));
    } catch (error) {
      toast.error('API Error');
      console.tron.error(error);
    }
    setIsLoading(false);
  }

  function inputChange(e) {
    // checks if enter was pressed (code: 13)
    if (e.keyCode === 13) {
      loadDeliveryman(e.target.value);
      e.target.value = '';
    }
  }

  useMemo(() => {
    async function deleteButtonClickedHandler(id) {
      try {
        if (window.confirm('Deseja mesmo deletar este entregador?')) {
          await api.delete(`delivermans/${id}`);
          toast.success('Entregador excluído com sucesso!');
          loadDeliveryman();
          if (deliverymans.length > 1) {
            loadDeliveryman(null, page);
          } else {
            setPage(page - 1);
          }
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

    const data = deliverymans.map(deliveryman => [
      `#${deliveryman.id}`,
      renderDeliveryman(deliveryman.name, deliveryman.avatar),
      deliveryman.name,
      deliveryman.email,
      <ActionMenu actions={renderActions(deliveryman.id)} />,
    ]);

    setFormattedDeliverymen(data);
  }, [deliverymans, page]);

  useEffect(() => {
    loadDeliveryman(null, page);
  }, [page]);

  return (
    <Table
      title="Gerenciando entregadores"
      inputHandleChange={inputChange}
      inputPlaceholder="Buscar por entregadores"
      colunn={colunn}
      registerButtonHandler={() => history.push('/deliverymans/form')}
      data={formattedDeliverymen}
      loading={isLoading}
      currentPage={page}
      totalPages={totalPages}
      setPage={setPage}
    />
  );
}
