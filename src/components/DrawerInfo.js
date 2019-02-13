import { Drawer, Button, Collapse, Icon } from 'antd';
import React from 'react';

const Panel = Collapse.Panel;

export default class DrawerInfo extends React.Component {
  state = { visible: false }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const data = this.props.data
    const type = this.props.type
    const content = type !== 'team' ? data.map((item, index) => {
      return (
        <div style={{ 'marginBottom': '10px' }} key={type + index}>
          <b><Icon type="crown" style={{ 'marginRight': '5px' }} />{item.name}</b>
          <p style={{margin:"10px auto"}}>{item.content}</p>
          {item.imgUrl ? (<p style={{ textAlign: "center" }}><img style={{maxWidth:"324px"}} src={item.imgUrl} alt="" /></p>) : ''}
        </div>
      )
    }) : (
        <Collapse bordered={false} defaultActiveKey={[type + '0']} accordion>
          {data.map((item, index) => {
            return (<Panel header={item.name} key={type + index}>
              <p style={{ 'marginBottom': '10px' }}><Icon type="trophy" style={{ 'marginRight': '5px' }} />{item.explanation}</p>
              <p><Icon type="fire" style={{ 'marginRight': '5px' }} />{item.skill}</p>
            </Panel>)
          })}
        </Collapse>
      );

    return (
      <div>
        <Button onClick={this.showDrawer} icon={type} ghost>
        {this.props.name}
        </Button>
        <Drawer
          title={(<span><Icon type={type} style={{ 'marginRight': '5px' }} />{this.props.name}</span>)}
          visible={this.state.visible}
          width={this.props.width}
          placement={this.props.placement}
          closable={false}
          onClose={this.onClose}
        >
          {content}
        </Drawer>
      </div>
    );
  }
}