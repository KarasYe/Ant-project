import React from 'react';
import { Button, Modal, Icon} from 'antd'

export default class ModalInfo extends React.Component {
    state = {
        visible: false,
        confirmLoading: false,
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            confirmLoading: true,
        });
        this.props.type === 'reload' ? localStorage.clear() : ''
        setTimeout(()=>{
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            location.reload()
        },2000)
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    render() {
        return(
            <div>
                <Button type="primary" onClick={this.showModal} icon={this.props.type}>
                        {this.props.name}
                </Button>
                <Modal
                                    title="⚠️操作警告"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    confirmLoading={this.state.confirmLoading}
                                    onCancel={this.handleCancel}
                                >
                    <p>{this.props.tip}</p>
                </Modal>
            </div>
        )
    }
}