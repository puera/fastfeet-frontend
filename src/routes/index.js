import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';
import DeliveryForm from '~/pages/Deliveries/Form';

import Deliverymans from '~/pages/Deliverymans';
import DeliverymanForm from '~/pages/Deliverymans/Form';

import Recipients from '~/pages/Recipients';
import RecipientForm from '~/pages/Recipients/Form';

import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" exact component={Deliveries} isPrivate />
      <Route
        path="/deliveries/form/:deliveryId?"
        component={DeliveryForm}
        isPrivate
      />

      <Route path="/deliverymans" exact component={Deliverymans} isPrivate />
      <Route
        path="/deliverymans/form/:deliverymanId?"
        component={DeliverymanForm}
        isPrivate
      />

      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route
        path="/recipients/form/:recipientId?"
        component={RecipientForm}
        isPrivate
      />

      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
