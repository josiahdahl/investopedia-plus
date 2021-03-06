import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Icon, Menu, Sidebar } from 'semantic-ui-react';
import { StockSearch } from '../containers/StockSearch';
import { SearchResult } from '../containers/SearchResult';
import { RecentItemsList } from '../containers/RecentItemsList';

const SearchMenu = () => (
  <div style={{ padding: '1em 0.5em', backgroundColor: '#fff', }}>
    <div style={{ marginBottom: '0.5em' }}>
      <StockSearch/>
    </div>
    <div style={{ marginBottom: '0.5em' }}>
      <SearchResult/>
    </div>
    <Header size={'medium'} textAlign='center'>Recent Searches</Header>
    <RecentItemsList/>
  </div>
);


export class DefaultView extends React.Component {
  static propTypes = {
    handleNavigate: PropTypes.func.isRequired,
  };

  state = {
    sidebarVisible: false,
  };

  toggleSidebar() {
    this.setState({
        sidebarVisible: !this.state.sidebarVisible,
      }
    );
  }

  render() {
    const { children, handleNavigate } = this.props;
    const { sidebarVisible } = this.state;
    return (
      <Container fluid={true} style={{ height: '100%' }}>
        <Menu>
          <Menu.Item name='home' title="Yes, it's a play on 'Fake Block' from Arrested Development">
            <b>Fake Stock</b>
          </Menu.Item>
          <Menu.Item name='portfolio' onClick={() => handleNavigate('portfolio')}>Portfolio</Menu.Item>
          <Menu.Item name='about' onClick={() => handleNavigate('about')}>About</Menu.Item>
          <Menu.Item
            name='search'
            position='right'
            onClick={() => this.toggleSidebar()}>
            <Icon name='search'/> Search
          </Menu.Item>
        </Menu>
        <Sidebar.Pushable style={{ marginTop: '-1rem' }}>
          <Sidebar
            animation='overlay'
            direction='right'
            visible={sidebarVisible}
          >
            <SearchMenu/>
          </Sidebar>
          <Sidebar.Pusher style={{ paddingTop: '1rem', }}>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  }
}