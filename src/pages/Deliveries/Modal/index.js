import React from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Container } from './styles';

function renderDate(title, date) {
  return (
    <strong>
      {title}
      <p>{format(parseISO(date), 'HH:mm dd/MM/yyyy', { locale: ptBR })}</p>
    </strong>
  );
}

function renderDeliveryDetails(title, data) {
  return (
    <strong>
      {title}
      <p>{data}</p>
    </strong>
  );
}

export function renderVisualizeModal(delivery) {
  return (
    <Container>
      <h3>Pedido</h3>
      {renderDeliveryDetails('Produto:', delivery.product)}
      {renderDeliveryDetails('Destinatário:', delivery.recipient.name)}
      {renderDeliveryDetails('Entregador:', delivery.deliveryman.name)}

      <hr />

      <h3>Endereço</h3>
      <p>
        {delivery.recipient.street}, {delivery.recipient.number}
      </p>
      <p>
        {delivery.recipient.city} - {delivery.recipient.state}
      </p>
      <p>{delivery.recipient.zip}</p>

      <hr />

      <h3>Datas</h3>
      {delivery.start_date && renderDate('Retirada:', delivery.start_date)}
      {delivery.end_date && renderDate('Entrega:', delivery.end_date)}
      {delivery.canceled_at &&
        renderDate('Cancelamento:', delivery.canceled_at)}
      {delivery.status === 'waiting' ? (
        <strong>Aguardando retirada</strong>
      ) : null}

      {delivery.signature && (
        <>
          <hr />

          <h3>Assinatura do destinatário</h3>
          <img src={delivery.signature.url} alt="Assinatura" />
        </>
      )}
    </Container>
  );
}
