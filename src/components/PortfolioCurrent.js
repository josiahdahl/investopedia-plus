import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'semantic-ui-react';
import { StockSparkline } from './StockSparkline';

const gainLossColor = amount => amount === 0 ? 'inherit' : amount < 0 ? 'red' : 'green';

const gainLossStyle = amount => ({ color: gainLossColor(amount), fontWeight: 'bold' });

const formatDollar = amount => (amount / 100).toFixed(2);

const StockHeaders = () =>
  <Table.Row>
    <Table.HeaderCell>Symbol</Table.HeaderCell>
    <Table.HeaderCell textAlign='right'>Quantity</Table.HeaderCell>
    <Table.HeaderCell textAlign='right'>Purchase Price</Table.HeaderCell>
    <Table.HeaderCell textAlign='right'>Current Price</Table.HeaderCell>
    <Table.HeaderCell textAlign='right'>Total Value</Table.HeaderCell>
    <Table.HeaderCell textAlign='right'>Total Gain/Loss</Table.HeaderCell>
  </Table.Row>;

const StockRow = ({ symbol, purchasePrice, quantity, currentPrice, chart }) => {
  const gainLoss = (currentPrice * quantity) - (purchasePrice * quantity);
  const totalValue = currentPrice * quantity;

  return (
    <Table.Row>
      <Table.Cell><b>{symbol}</b><StockSparkline chart={chart}/></Table.Cell>
      <Table.Cell textAlign='right'>{quantity}</Table.Cell>
      <Table.Cell textAlign='right'>${formatDollar(purchasePrice)}</Table.Cell>
      <Table.Cell textAlign='right'>${formatDollar(currentPrice)}</Table.Cell>
      <Table.Cell textAlign='right'>${formatDollar(totalValue)}</Table.Cell>
      <Table.Cell textAlign='right' style={gainLossStyle(gainLoss)}>${formatDollar(gainLoss)}</Table.Cell>
    </Table.Row>
  )
};


export const PortfolioCurrent = ({ stocks, createdDate, lastUpdate }) => {

  const { totalCost, totalValue } = stocks.reduce((acc, stock) => {
    return {
      totalCost: acc.totalCost + (stock.purchasePrice * stock.quantity),
      totalValue: acc.totalValue + (stock.currentPrice * stock.quantity),
    };
  }, { totalCost: 0, totalValue: 0 });

  const gainLoss = totalValue - totalCost;

  return (
    <Table>
      <Table.Header>
        <StockHeaders/>
      </Table.Header>
      <Table.Body>
        {stocks.map(stock => <StockRow key={stock.symbol} {...stock}/>)}
      </Table.Body>
      <Table.Footer>
        <Table.Row className='table__row--border-top'>
          <Table.Cell colSpan={3}>{/*Blank*/}</Table.Cell>
          <Table.Cell textAlign='right'><b>Total</b></Table.Cell>
          <Table.Cell textAlign='right'><b>${formatDollar(totalValue)}</b></Table.Cell>
          <Table.Cell textAlign='right' colSpan={1}
                      style={gainLossStyle(gainLoss)}>{formatDollar(gainLoss)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell colSpan={2} textAlign='left' style={{ color: '#aaa' }}>
            Portfolio Updated {createdDate}
          </Table.HeaderCell>
          <Table.HeaderCell colSpan={2}>{/*Blank*/}</Table.HeaderCell>
          <Table.HeaderCell colSpan={2} textAlign='right' style={{ color: '#aaa' }}>
            {lastUpdate}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

PortfolioCurrent.propTypes = {
  stocks: PropTypes.array,
  createdDate: PropTypes.string,
  lastUpdate: PropTypes.string,
};