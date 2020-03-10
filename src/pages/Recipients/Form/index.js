import React, { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import FormComponent from '~/components/Form';
import Input from '~/components/Global/Input';
import MaskedInput from '~/components/Global/InputMasked';

import SchemaValidation from '~/utils/SchemaValidation';

const schema = Yup.object().shape({
  name: Yup.string()
    .required('O nome do destinatário é obrigatório')
    .min(6, 'O nome do destinatário deve conter no mínimo 6 caracteres'),
  street: Yup.string().required('A rua do destinatário é obrigatória'),
  number: Yup.number()
    .typeError('O número do destinatário é obrigatório')
    .required('O número do destinatário é obrigatório')
    .positive()
    .integer(),
  complement: Yup.string().required('Complemento é obrigatório'),
  city: Yup.string().required('A cidade do destinatário é obrigatória'),
  state: Yup.string().required('O estado do destinatário é obrigatório'),
  zip: Yup.string().required('O CEP do destinatário é obrigatório'),
});

export default function RecipientForm() {
  const { recipientId } = useParams();

  const formRef = useRef();

  async function submitHandler(data) {
    try {
      if (await SchemaValidation(schema, data, formRef)) {
        if (recipientId) {
          await api.put(`recipients/${recipientId}`, data);
        } else {
          await api.post('recipients', data);
        }
        toast.success('Destinatário cadastrado com sucesso');
        history.push('/recipients');
      }
    } catch (err) {
      toast.error('Erro ao cadastrar o destinatário');
    }
  }

  useMemo(() => {
    async function loadData() {
      const response = await api.get(`recipients/${recipientId}`);
      formRef.current.setData(response.data);
    }

    if (recipientId) loadData();
  }, [recipientId]);

  return (
    <FormComponent
      title="Cadastro de destinatários"
      saveButtonHandler={() => formRef.current.submitForm()}
      goBackButtonHandler={() => history.push('/recipients')}
    >
      <Form ref={formRef} onSubmit={submitHandler}>
        <Input
          name="name"
          type="text"
          placeholder="Nome do destinatário"
          label="Nome"
        />
        <section>
          <Input
            name="street"
            type="text"
            placeholder="Rua do destinatário"
            label="Rua"
          />
          <section>
            <Input
              name="number"
              type="number"
              placeholder="Número do destinatário"
              label="Número"
              min={0}
            />
            <Input
              name="complement"
              type="text"
              placeholder="Complemento do destinatário"
              label="Complemento"
            />
          </section>
        </section>
        <section>
          <Input
            name="city"
            type="text"
            placeholder="Cidade do destinatário"
            label="Cidade"
          />
          <Input
            name="state"
            type="text"
            placeholder="Estado do destinatário"
            label="Estado"
          />
          <MaskedInput
            name="zip"
            type="text"
            placeholder="CEP"
            label="CEP"
            mask="99999-999"
          />
        </section>
      </Form>
    </FormComponent>
  );
}
