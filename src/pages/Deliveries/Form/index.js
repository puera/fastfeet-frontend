import React, { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import FormComponent from '~/components/Form';
import GlobalInput from '~/components/Global/Input';
import GlobalSelect from '~/components/Global/Select';

import SchemaValidation from '~/utils/SchemaValidation';

const schema = Yup.object().shape({
  recipient_id: Yup.number()
    .typeError('O destinatário é obrigatório')
    .required('O destinatário é obrigatório'),
  deliveryman_id: Yup.number()
    .typeError('O entregador é obrigatório')
    .required('O entregador é obrigatório'),
  product: Yup.string()
    .min(4, 'O nome do produto deve conter mais de 4 caracteres')
    .required('O nome do produto é obrigatório'),
});

export default function DeliveryForm() {
  const { deliveryId } = useParams();

  const formRef = useRef();

  async function submitHandler(data) {
    try {
      if (await SchemaValidation(schema, data, formRef)) {
        if (deliveryId) {
          await api.put(`deliveries/${deliveryId}`, data);
        } else {
          await api.post('deliveries', data);
        }
        toast.success('Encomenda cadastrada com sucesso');
        history.push('/deliveries');
      }
    } catch (err) {
      toast.error('Erro ao cadastrar a encomenda');
    }
  }

  async function loadRecipientsOptions(query) {
    const response = await api
      .get('recipients', { params: { q: query } })
      .then(resp => {
        const options = resp.data.recipients.map(recipient => ({
          value: recipient.id,
          label: recipient.name,
        }));
        return options;
      })
      .catch(error => {
        console.tron.log(error);
      });
    return response;
  }

  async function loadDeliverymanOptions(query) {
    const response = await api
      .get('delivermans', { params: { q: query } })
      .then(resp => {
        const options = resp.data.delivermans.map(deliveryman => ({
          value: deliveryman.id,
          label: deliveryman.name,
        }));

        return options;
      })
      .catch(error => {
        console.tron.log(error);
      });
    return response;
  }

  useMemo(() => {
    async function loadData() {
      const response = await api.get(`deliveries/${deliveryId}`);
      const { product, recipient, deliveryman } = response.data;
      formRef.current.setData({
        product,
        deliveryman_id: deliveryman.id,
        recipient_id: recipient.id,
      });
      formRef.current.setFieldValue('deliveryman_id', {
        value: deliveryman.id,
        label: deliveryman.name,
      });
      formRef.current.setFieldValue('recipient_id', {
        value: recipient.id,
        label: recipient.name,
      });
      console.tron.log(response.data);
    }

    if (deliveryId) loadData();
  }, [deliveryId]);

  return (
    <FormComponent
      title="Cadastro de encomendas"
      saveButtonHandler={() => formRef.current.submitForm()}
      goBackButtonHandler={() => history.push('/deliveries')}
    >
      <Form ref={formRef} onSubmit={submitHandler}>
        <section>
          <GlobalSelect
            type="text"
            label="Destinatário"
            name="recipient_id"
            placeholder="Destinatário"
            defaultOptions
            cacheOptions
            noOptionsMessage={() => 'Nenhum destinatário encontrado'}
            loadOptions={loadRecipientsOptions}
          />
          <GlobalSelect
            type="text"
            label="Entregador"
            name="deliveryman_id"
            placeholder="Entregador"
            defaultOptions
            cacheOptions
            noOptionsMessage={() => 'Nenhum entregador encontrado'}
            loadOptions={loadDeliverymanOptions}
          />
        </section>
        <GlobalInput
          name="product"
          type="text"
          placeholder="Nome do produto"
          label="Nome do produto"
        />
      </Form>
    </FormComponent>
  );
}
