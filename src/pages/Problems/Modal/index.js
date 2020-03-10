import React from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

function renderDeliveryDetails(title, data) {
  return (
    <strong>
      {title}
      <p>{data}</p>
    </strong>
  );
}

function renderDate(title, date) {
  return renderDeliveryDetails(
    title,
    format(parseISO(date), 'HH:mm dd/MM/yyyy', { locale: ptBR })
  );
}

export function renderVisualizeModal(problem) {
  return (
    <>
      <h3>Detalhes da encomenda</h3>
      {renderDeliveryDetails('Destinatário:', problem.delivery.recipient.name)}
      {renderDeliveryDetails('Entregador:', problem.delivery.deliveryman.name)}
      {renderDeliveryDetails('Produto:', problem.delivery.product)}
      <hr />
      {problem.createdAt && renderDate('Relatado em:', problem.createdAt)}
      <strong>Descrição</strong>
      <p>{problem.description}</p>
    </>
  );
}
