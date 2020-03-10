import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '~/components/Global/Input';

import { signInRequest } from '~/store/modules/auth/actions';

import SchemaValidation from '~/utils/SchemaValidation';

import { Button, Spinner } from './styles';

import logo from '~/assets/img/fastfeet-logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const formRef = useRef();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit({ email, password }) {
    if (await SchemaValidation(schema, { email, password }, formRef)) {
      dispatch(signInRequest(email, password));
    }
  }
  return (
    <>
      <img src={logo} alt="FastFeet" />
      <Form schema={schema} onSubmit={handleSubmit} ref={formRef}>
        <strong>SEU EMAIL</strong>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <strong>SUA SENHA</strong>
        <Input name="password" type="password" placeholder="***********" />

        <Button loading={loading ? 1 : 0}>
          {loading ? <Spinner /> : 'Entrar no sistema'}
        </Button>
      </Form>
    </>
  );
}
