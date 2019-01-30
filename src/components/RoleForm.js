import { Button, Input, Row, Col, Icon, Drawer, Select, Radio } from 'antd';
import React from 'react';
import { connect } from 'dva';

const namespace = 'rolelist';

const mapStateToProps = (state) => {
  const roleList = state[namespace].data;
  const stateRedux = state[namespace];
  return {
    roleList,
    stateRedux
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onClickAdd: (newRole) => {
      const action = {
        type: `${namespace}/addNewRole`,
        payload: newRole,
      };
      dispatch(action);
    },
    onClickRemove: (oldRole) => {
      const action = {
        type: `${namespace}/removeRole`,
        payload: oldRole,
      };
      dispatch(action);
    },
    onClickSubmit: (roleList) => {
      const action = {
        type: `${namespace}/changeRole`,
        payload: roleList,
      };
      dispatch(action);
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)

export default class RoleForm extends React.Component {
  state = {
    visible: false,
    childrenDrawer: false,
    roleList: this.props.roleList,
    currentRole: {
      player: '暗部精英',
      role: '长老',
      camp: 'red',
      avatar: ''
    }
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onSubmit = () => {
    if(!localStorage['role']){
      localStorage.setItem('role',JSON.stringify(this.props.stateRedux))
    } else{
      localStorage['role'] = JSON.stringify(this.props.stateRedux)
    }
    const roleList = this.state.roleList
    this.props.onClickSubmit(roleList)
    this.setState({
      visible: false,
    });
    setTimeout(()=>{
      location.reload()
    },1000)
  };

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  showChildrenDrawer = (e) => {
    const roleId = parseInt(e.target.id)
    const role = this.props.roleList.filter(item => item.id === roleId)
    this.setState({
      childrenDrawer: true,
      currentRole: role[0]
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  handleAdd = () => {
    this.props.onClickAdd({
      player: '暗部精英',
      role: '长老',
      camp: 'red',
      avatar: ''
    })
  }

  handleRemove = (e) => {
    this.props.onClickRemove({
      id: parseInt(e.target.id)
    })
  }

  handleChange = (e) => {
    let currentRole = this.state.currentRole;
    currentRole.player = e.target.value
    this.setState({
      currentRole: currentRole
    })
  }

  handleSelect = (value) => {
    let currentRole = this.state.currentRole;
    currentRole.role = value
    this.setState({
      currentRole: currentRole
    })
  }

  handleRadio = (e) => {
    let currentRole = this.state.currentRole;
    currentRole.camp = e.target.value
    this.setState({
      currentRole: currentRole
    })
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.roleList !== this.props.roleList)) {
      let data = nextProps.roleList;
      this.setState({
        roleList: data
      })
    }
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="setting" />{this.props.name}
        </Button>
        <Drawer
          title={this.props.name}
          visible={this.state.visible}
          width={this.props.width}
          placement={this.props.placement}
          closable={false}
        >
          {
            this.state.roleList.map(role => {
              return (
                <Row key={role.id} type="flex" justify="center" align="middle" style={{ height: "90px", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px solid #e8e8e8" }}>
                  <Col span={3} style={{ textAlign: "center" }}>
                    {role.avatar ? <img style={{ maxWidth: "80px", maxHeight: "80px" }} src={role.avatar} alt="avatar" /> : (<Icon style={{ fontSize: "50px" }} type="user" />)}
                  </Col>
                  <Col span={4} offset={1}>
                    <span style={{ paddingRight: "10px" }}>ID:</span>
                    <span>{role.player}</span>
                  </Col>
                  <Col span={4} offset={1}>
                    <span style={{ paddingRight: "10px" }}>阵营:</span>
                    <span>{role.camp === 'red' ? '红色联盟' : '蓝色联盟'}</span>
                  </Col>
                  <Col span={4} offset={1}>
                    <span style={{ paddingRight: "10px" }}>职业:</span>
                    <span>{role.role}</span>
                  </Col>
                  <Col span={3}>
                    <Button onClick={this.showChildrenDrawer} id={role.id}><Icon type="edit" />修改</Button>
                  </Col>
                  <Col span={3}>
                    <Button type="danger" id={role.id} onClick={this.handleRemove}><Icon type="close" />删除</Button>
                  </Col>
                </Row>
              );
            })
          }
          <Drawer
            title="玩家信息修改"
            width={320}
            closable={false}
            placement={this.props.placement}
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
          >
            <Row type="flex" justify="center" align="middle">
              <Col span={24} style={{ textAlign: "center", marginBottom: "10px" }}>
                {this.state.currentRole.avatar ? <img style={{ maxWidth: "80px", maxHeight: "80px" }} src={this.state.currentRole.avatar} alt="avatar" /> : (<Icon style={{ fontSize: "50px" }} type="user" />)}
              </Col>
              <Col span={24} style={{ marginBottom: "10px" }}>
                <div style={{ lineHeight: "2.5" }}>ID:</div>
                <Input placeholder="玩家名字" width={150} value={this.state.currentRole.player} onChange={this.handleChange} />
              </Col>
              <Col span={24} style={{ marginBottom: "10px" }}>
                <div style={{ lineHeight: "2.5" }}>阵营:</div>
                <Radio.Group value={this.state.currentRole.camp} buttonStyle="solid" onChange={this.handleRadio}>
                  <Radio.Button value="red"><Icon style={{ fontSize: "20px" }} type="crown" theme="filled" />红色联盟</Radio.Button>
                  <Radio.Button value="blue"><Icon style={{ fontSize: "18px" }} type="thunderbolt" theme="filled" />蓝色联盟</Radio.Button>
                </Radio.Group>
              </Col>
              <Col span={24} style={{ marginBottom: "10px" }}>
                <div style={{ lineHeight: "2.5" }}>职业:</div>
                <Select value={this.state.currentRole.role} style={{ width: 100 }} onSelect={this.handleSelect}>
                  <Select.Option value="长老">长老</Select.Option>
                  <Select.Option value="刺客">刺客</Select.Option>
                  <Select.Option value="小丑">小丑</Select.Option>
                  <Select.Option value="炼金术师">炼金术师</Select.Option>
                  <Select.Option value="干扰者">干扰者</Select.Option>
                  <Select.Option value="护卫">护卫</Select.Option>
                  <Select.Option value="狂战士">狂战士</Select.Option>
                  <Select.Option value="法师">法师</Select.Option>
                  <Select.Option value="情妇">情妇</Select.Option>
                  <Select.Option value="审判者">审判者</Select.Option>
                </Select>
              </Col>
            </Row>
          </Drawer>
          <div style={{ position: 'absolute',bottom: 0,width: '100%',borderTop: '1px solid #e8e8e8',padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
          <Row type="flex">
            <Col span={4} style={{textAlign:"center"}}><Button type="primary" onClick={this.handleAdd}> <Icon type="plus" />玩家 </Button></Col>
            <Col span={4} offset={12} style={{textAlign:"center"}}><Button type="danger" onClick={this.onCancel}><Icon type="close" />取消</Button></Col>
            <Col span={4} style={{textAlign:"center"}}><Button onClick={this.onSubmit}><Icon type="upload" />提交</Button></Col>
          </Row>
          </div>
        </Drawer>
      </div>
    );
  }
}