import React, { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import FormComponent from '~/components/Form';
import ImageInput from '~/components/Global/ImageInput';
import Input from '~/components/Global/Input';

import SchemaValidation from '~/utils/SchemaValidation';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'O nome do entregador deve ter mais de 4 caracteres')
    .required('O nome do entregador é obrigatório'),
  email: Yup.string()
    .email()
    .required('O e-mail do entregador é obrigatório'),
  avatar_id: Yup.number()
    .integer()
    .positive()
    .nullable(),
});

export default function DeliverymenForm() {
  const { deliverymanId } = useParams();

  const formRef = useRef();

  const [deliveryman, setDeliveryman] = useState();

  async function submitHandler(data) {
    try {
      if (await SchemaValidation(schema, data, formRef)) {
        if (deliverymanId) {
          await api.put(`delivermans/${deliverymanId}`, data);
        } else {
          await api.post('delivermans', data);
        }
        toast.success('Entregador cadastrada com sucesso');
        history.push('/deliverymans');
      }
    } catch (err) {
      toast.error('Erro ao cadastrar o entregador');
    }
  }

  useMemo(() => {
    async function loadData() {
      const response = await api.get(`delivermans/${deliverymanId}`);
      const { avatar, name, email } = response.data;

      formRef.current.setData({ avatar_id: avatar && avatar.url, name, email });
      setDeliveryman(response.data);
    }
    if (deliverymanId) loadData();
  }, [deliverymanId]);

  return (
    <FormComponent
      title="Cadastro de entregadores"
      saveButtonHandler={() => formRef.current.submitForm()}
      goBackButtonHandler={() => history.push('/deliverymans')}
    >
      <Form ref={formRef} onSubmit={submitHandler}>
        <ImageInput
          name="avatar_id"
          placeholderName={deliveryman && deliveryman.name}
          accept="image/*"
        />
        <Input
          name="name"
          type="text"
          placeholder="Nome do entregador"
          label="Nome"
        />
        <Input
          name="email"
          type="email"
          placeholder="exemplo@fastfeet.com"
          label="E-mail"
        />
      </Form>
    </FormComponent>
  );
}
