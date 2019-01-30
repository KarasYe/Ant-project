import { Drawer, Button, Collapse, Icon} from 'antd';
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
    const data = this.props.data;
    const type = this.props.type
    const name = type === 'rule' ? (<Icon type="notification" />) : (<Icon type="usergroup-add" />)
    const content = type === 'rule' ? data.map((item,index)=>{
        return (<p style={{'marginBottom':'10px'}} key={type+index}><Icon type="crown" style={{'marginRight':'5px'}}/><b>{item.name}</b>{item.content}</p>)
    }) : (
        <Collapse bordered={false} defaultActiveKey={[type+'0']} accordion>          
            {data.map((item,index)=>{
                return (<Panel header={item.name} key={type+index}>
                        <p style={{'marginBottom':'10px'}}><Icon type="trophy" style={{'marginRight':'5px'}}/>{item.explanation}</p>
                        <p><Icon type="fire" style={{'marginRight':'5px'}}/>{item.skill}</p>
                    </Panel>)
            })}
        </Collapse>
    );

    return (
      <div>
        <Button onClick={this.showDrawer}>
            {name}{this.props.name}
        </Button>
        <Drawer
          title={this.props.name}
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