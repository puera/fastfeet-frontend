import React, { useState, useEffect, useMemo } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import ActionMenu from '~/components/ActionMenu';
import Table from '~/components/Table';

const colunn = ['ID', 'Nome', 'Endereço', 'Ações'];

export default function Recipient() {
  const [recipients, setRecipients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formattedRecipients, setFormattedRecipients] = useState([]);

  async function loadRecipients(query) {
    setIsLoading(true);
    try {
      const response = await api.get(`recipients?q=${query || ''}`);
      setRecipients(response.data);
    } catch (error) {
      toast.error('API Error');
      console.tron.error(error);
    }
    setIsLoading(false);
  }

  function inputChange(e) {
    // checks if enter was pressed (code: 13)
    if (e.keyCode === 13) {
      loadRecipients(e.target.value);
      e.target.value = '';
    }
  }

  useMemo(() => {
    async function deleteButtonClickedHandler(id) {
      try {
        if (window.confirm('Deseja mesmo deletar este item?')) {
          await api.delete(`recipients/${id}`);
          toast.success('Destinatário excluído com sucesso!');
        }
        loadRecipients();
      } catch (error) {
        toast.error('Erro ao excluir destinatário.');
      }
    }

    function renderActions(id) {
      return [
        {
          link: `/recipients/form/${id}`,
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

    const data = recipients.map(recipient => [
      `#${recipient.id}`,
      recipient.name,
      `${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}`,
      <ActionMenu actions={renderActions(recipient.id)} />,
    ]);

    setFormattedRecipients(data);
  }, [recipients]);

  useEffect(() => {
    loadRecipients();
  }, []);

  return (
    <Table
      title="Gerenciando destinatários"
      inputHandleChange={inputChange}
      inputPlaceholder="Buscar por destinatários"
      colunn={colunn}
      loading={isLoading}
      registerButtonHandler={() => history.push('/recipients/form')}
      data={formattedRecipients}
    />
  );
}
