import React from 'react';
import { connect } from 'dva';
import { Upload, Icon, message, Radio, Select, Input, Button } from 'antd';

const namespace = 'rolelist';

const mapStateToProps = (state) => {
    const roleList = state[namespace].data;
    return {
      roleList,
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
        changeInfo: (changeData) => {
            const action = {
                type: `${namespace}/changeInfo`,
                payload: changeData,
            };
            dispatch(action);
        },
    };
};

@connect(mapStateToProps,mapDispatchToProps)

class AvatarUpload extends React.Component {
    state = {
        loading: false,
    };

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
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }), () => this.props.changeInfo({
                id: this.props.roleId,
                type: 'avatar',
                data: imageUrl
            }));
        }
    }

    render() {
        const uploadButton = (
            <div>
                <Icon style={{ fontSize: "50px" }} type={this.state.loading ? 'loading' : 'user'} />
            </div>
        );
        const imageUrl = this.props.imageUrl;
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img style={{ maxWidth: "80px", maxHeight: "80px" }} src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
        );
    }
}

class SelectCamp extends React.Component {
    state = {
        value: this.props.value
    }
    handleChange = (e) => {
        this.props.onClickAdd({
            player: '暗部精英',
            role: '长老',
            camp: 'red',
            avatar: ''
          })
    }
    render() {
        return (
            <div>
                <Radio.Group value={this.props.value} buttonStyle="solid" onChange={this.handleChange}>
                    <Radio.Button value="red"><Icon style={{ fontSize: "20px" }} type="crown" theme="filled" />红色联盟</Radio.Button>
                    <Radio.Button value="blue"><Icon style={{ fontSize: "18px" }} type="thunderbolt" theme="filled" />蓝色联盟</Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}

const Option = Select.Option

class SelectRole extends React.Component {
    state = {
        value: this.props.value
    }
    handleSelect = (value) => {
        this.setState({
            value: value
        })
    }
    render() {
        return (
            <Select value={this.props.value} style={{ width: 100 }} onSelect={}>
                <Option value="长老">长老</Option>
                <Option value="刺客">刺客</Option>
                <Option value="小丑">小丑</Option>
                <Option value="炼金术师">炼金术师</Option>
                <Option value="干扰者">干扰者</Option>
                <Option value="护卫">护卫</Option>
                <Option value="狂战士">狂战士</Option>
                <Option value="法师">法师</Option>
                <Option value="情妇">情妇</Option>
                <Option value="审判者">审判者</Option>
            </Select>
        )
    }
}

class InputName extends React.Component {
    state = {
        value: this.props.value
    }
    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return (
            <Input placeholder="玩家名字" value={this.props.value} onChange={}/>
        )
    }
}
export {
    AvatarUpload,
    SelectCamp,
    SelectRole,
    InputName
}