import React, { useState, useEffect, useMemo } from 'react';
import { MdRemoveRedEye, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';

import ActionMenu from '~/components/ActionMenu';
import GlobalModal from '~/components/Global/Modal';
import Table from '~/components/Table';

import { renderVisualizeModal } from './Modal';

const colunn = ['Encomenda', 'Problema', 'Ações'];

export default function Problem() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [problemId, setProblemId] = useState();
  const [problemDetails, setProblemDetails] = useState();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [problems, setProblems] = useState([]);
  const [formattedProblems, setFormattedProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function loadProblems(query, pageToLoad) {
    setIsLoading(true);
    try {
      const response = await api.get('delivery/problems', {
        params: { page: pageToLoad, q: query },
      });
      setProblems(response.data.problems);
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
      loadProblems(e.target.value);
      e.target.value = '';
    }
  }

  useMemo(() => {
    function visualizeButtonClickedHandler(id) {
      setProblemId(id);
      setIsModalOpened(true);
    }

    async function deleteButtonClickedHandler(id) {
      try {
        if (window.confirm('Deseja mesmo cancelar esta entrega?')) {
          await api.delete(`problem/${id}/cancel-delivery`);
          toast.success('Entrega cancelada com sucesso!');
        }
        loadProblems();
        if (problems.length > 1) {
          loadProblems(null, page);
        } else {
          setPage(page - 1);
        }
      } catch (error) {
        toast.error(`Erro ao cancelar a entrega`);
      }
    }

    function renderActions(id, canceled) {
      const action = [
        {
          title: 'Visualizar',
          icon: <MdRemoveRedEye color="#8E5BE8" size={16} />,
          type: 'button',
          onClickButtonHandler: () => visualizeButtonClickedHandler(id),
        },
      ];

      if (!canceled) {
        action.push({
          title: 'Cancelar',
          icon: <MdDeleteForever color="#DE3B3B" size={16} />,
          type: 'button',
          onClickButtonHandler: () => deleteButtonClickedHandler(id),
        });
      }

      return action;
    }

    const data = problems.map(problem => [
      `#${problem.id}`,
      problem.description,
      <ActionMenu
        actions={renderActions(problem.id, problem.delivery.canceled_at)}
      />,
    ]);

    setFormattedProblems(data);
  }, [page, problems]);

  /**
   * Render and opens modal
   */
  useEffect(() => {
    if (problemId === null || isModalOpened === false) return;

    const problem = problems.find(d => d.id === problemId);
    console.tron.log(problem);

    setProblemDetails(renderVisualizeModal(problem));
  }, [isModalOpened, problemId, problems]);

  useEffect(() => {
    loadProblems(null, page);
  }, [page]);

  return (
    <>
      <GlobalModal
        isOpened={isModalOpened}
        title="Informações do problema"
        closeHandler={() => setIsModalOpened(false)}
      >
        {problemDetails || <></>}
      </GlobalModal>
      <Table
        title="Gerenciando problemas"
        inputHandleChange={inputChange}
        inputPlaceholder="Buscar por problemas"
        colunn={colunn}
        data={formattedProblems}
        loading={isLoading}
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </>
  );
}
