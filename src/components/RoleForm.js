import { Button, Input, Row, Col, Icon, Drawer, Select, Radio, Popconfirm, message, Upload, Modal } from 'antd';
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
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)

export default class RoleForm extends React.Component {
  state = {
    visible: false,
    loading: false,
    loadingUpload: false,
    childrenDrawer: false,
    cancelDisable: false,
    previewVisible: false,
    previewImage: '',
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
    if (!localStorage['role']) {
      localStorage.setItem('role', JSON.stringify(this.props.stateRedux))
    } else {
      localStorage['role'] = JSON.stringify(this.props.stateRedux)
    }
    const roleList = this.state.roleList
    this.props.onClickSubmit(roleList)
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        loading: false
      });
      location.reload()
    }, 1000)
  };

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  indexChange(index, state) {
    let roleList = this.state.roleList
    let nextIndex = state === 'up' ? index - 1 : index + 1
    const prevDataItem = roleList[index]
    const nextDataItem = roleList[nextIndex]
    roleList[index] = nextDataItem
    roleList[nextIndex] = prevDataItem
    this.setState({
      cancelDisable: true,
      roleList: roleList
    });

  }

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
    const roleNum = this.props.roleList.length
    if (roleNum < 20) {
      this.props.onClickAdd({
        player: '暗部精英',
        role: '长老',
        camp: 'red',
        avatar: ''
      })
      this.setState({
        cancelDisable: true,
      });
    } else {
      message.error(`当前玩家人数是${roleNum}已经达到上限！`)
    }
  }

  handleRemove(id) {
    this.props.onClickRemove({
      id: parseInt(id)
    })
    this.setState({
      cancelDisable: true,
    });
    message.success('删除成功！')
  }

  handleRemoveCancel = () => {
    message.error('删除取消！')
  }

  handleChange = (e) => {
    let currentRole = this.state.currentRole;
    currentRole.player = e.target.value
    this.setState({
      cancelDisable: true,
      currentRole: currentRole
    })
  }

  handleSelect = (value) => {
    let currentRole = this.state.currentRole;
    currentRole.role = value
    this.setState({
      cancelDisable: true,
      currentRole: currentRole
    })
  }

  handleRadio = (e) => {
    let currentRole = this.state.currentRole;
    currentRole.camp = e.target.value
    this.setState({
      cancelDisable: true,
      currentRole: currentRole
    })
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('只支持*jpg格式的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 0.05;
    if (!isLt2M) {
      message.error('图片大小必须小于50KB!');
    }
    return isJPG && isLt2M;
  }
  handlePreview = () => {
    this.setState({
      previewVisible: true,
    });
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handleUpload = (info) => {
    message.error('抱歉，暂不支持上传个性头像。')
    // if (info.file.status === 'uploading') {
    //   this.setState({ loadingUpload: true });
    //   return;
    // } else if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   this.getBase64(info.file.originFileObj, imageUrl => {
    //     let currentRole = this.state.currentRole;
    //     currentRole.avatar = imageUrl
    //     this.setState({
    //       cancelDisable: true,
    //       loadingUpload: false,
    //       currentRole: currentRole
    //     })
    //   }
    //   );
    // }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.roleList)
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
        <Button type="primary" onClick={this.showDrawer} icon={this.props.type}>
          {this.props.name}
        </Button>
        <Drawer
          title={(<span><Icon type={this.props.type} style={{ 'marginRight': '5px' }} />{this.props.name}</span>)}
          visible={this.state.visible}
          width={this.props.width}
          placement={this.props.placement}
          closable={false}
        >
          <div style={{ marginBottom: "50px" }}>
            {
              this.state.roleList.map((role, index) => {
                return (
                  <Row key={role.id} type="flex" justify="center" align="middle" style={{ height: "100px", marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #e8e8e8" }}>
                    <Col span={3} style={{ textAlign: "center" }}>
                      {role.avatar ? <img style={{ maxWidth: "80px", maxHeight: "80px" }} src={role.avatar} alt="avatar" /> : (<Icon style={{ fontSize: "50px" }} type="user" />)}
                    </Col>
                    <Col span={3} offset={1}>
                      <span style={{ paddingRight: "10px" }}>ID:</span>
                      <span>{role.player}</span>
                    </Col>
                    <Col span={3} offset={1}>
                      <span style={{ paddingRight: "10px" }}>阵营:</span>
                      <span>{role.camp === 'red' ? '红色联盟' : '蓝色联盟'}</span>
                    </Col>
                    <Col span={3} offset={1}>
                      <span style={{ paddingRight: "10px" }}>职业:</span>
                      <span>{role.role}</span>
                    </Col>
                    <Col span={1} offset={1}>
                      <Button type="primary" shape="circle" onClick={this.showChildrenDrawer} id={role.id} icon="edit"></Button>
                    </Col>
                    <Col span={1} offset={1}>
                      <Popconfirm title="请谨慎操作，删除该玩家信息可能需要重置初始化数据才能还原！" onConfirm={this.handleRemove.bind(this, role.id)} onCancel={this.handleRemoveCancel} okText="确定" cancelText="取消">
                        <Button type="danger" shape="circle" icon="minus"></Button>
                      </Popconfirm>
                    </Col>
                    <Col span={1} offset={1}>
                      <Button onClick={this.indexChange.bind(this, index, 'up')} icon="arrow-up" shape="circle" type="dashed" style={{ marginBottom: "10px" }} disabled={index === 0}></Button>
                      <Button onClick={this.indexChange.bind(this, index, 'down')} icon="arrow-down" shape="circle" type="dashed" disabled={index === this.state.roleList.length - 1}></Button>
                    </Col>
                  </Row>
                );
              })
            }
          </div>
          <Drawer
            title="玩家信息修改"
            width={320}
            closable={false}
            placement={this.props.placement}
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
          >
            <Row type="flex" justify="center" align="middle">
              <Col span={12} style={{ marginBottom: "10px" }}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleUpload}
                  disabled
                >
                  {this.state.currentRole.avatar ? <img style={{ maxWidth: "128px", maxHeight: "128px" }} src={this.state.currentRole.avatar} alt="avatar" /> : (<Icon style={{ fontSize: "128px" }} type={this.state.loadingUpload ? 'loading' : 'user'} />)}
                </Upload>
                <div style={{textAlign:'center',margin:'0 auto'}} ><Button onClick={this.handlePreview} icon="eye" shape="circle"></Button></div>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel} style={{textAlign:'center'}}>
                  {this.state.currentRole.avatar ? <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={this.state.currentRole.avatar} alt="avatar" /> : (<Icon style={{ fontSize: "128px" }} type="user" />)}
                </Modal>
              </Col>
              <Row type="flex" justify="center" align="middle">
                <Col span={4} style={{ marginBottom: "10px" }}>
                  <div style={{ lineHeight: "2.5" }}>ID:</div>
                </Col>
                <Col span={20} style={{ marginBottom: "10px" }}>
                  <Input placeholder="玩家名字" width={150} value={this.state.currentRole.player} onChange={this.handleChange} />
                </Col>
                <Col span={4} style={{ marginBottom: "10px" }}>
                  <div style={{ lineHeight: "2.5" }}>阵营:</div>
                </Col>
                <Col span={20} style={{ marginBottom: "10px" }}>
                  <Radio.Group value={this.state.currentRole.camp} buttonStyle="solid" onChange={this.handleRadio}>
                    <Radio.Button value="red"><Icon style={{ fontSize: "20px" }} type="crown" theme="filled" />红色联盟</Radio.Button>
                    <Radio.Button value="blue"><Icon style={{ fontSize: "18px" }} type="thunderbolt" theme="filled" />蓝色联盟</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col span={4} style={{ marginBottom: "10px" }}>
                  <div style={{ lineHeight: "2.5" }}>职业:</div>
                </Col>
                <Col span={20} style={{ marginBottom: "10px" }}>
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
            </Row>
          </Drawer>
          <div style={{
            position: 'absolute', bottom: 0, width: '100%', borderTop: '1px solid #e8e8e8', padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
          >
            <Row type="flex">
              <Col span={4} style={{ textAlign: "center" }}><Button type="primary" onClick={this.handleAdd} icon="plus-circle">新增玩家</Button></Col>
              <Col span={3} offset={14} style={{ textAlign: "center" }}><Button type="danger" icon="close-circle" onClick={this.onCancel} disabled={this.state.cancelDisable}>取消</Button></Col>
              <Col span={3} style={{ textAlign: "center" }}><Button onClick={this.onSubmit} icon="check-circle" loading={this.state.loading}>确定</Button></Col>
            </Row>
          </div>
        </Drawer>
      </div>
    );
  }
}