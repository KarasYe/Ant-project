import { Component } from 'react';
import { Card, Rate, Icon, Row, Col, notification } from 'antd';
import style from '../pages/BloodBound/index.less';

export default class RoleCard extends Component {
    state = {
        RateDisabled: true,
        actionRole: '角色牌',
        actionCamp: '阵营牌',
        showRole: false,
        showFirstCamp: false,
        showSecondCamp: false,
        rateValue: 4,
        hideenCamp: false,
        roleInfo: this.props.roleInfo
    };
    handleClick = (e) => {
        if (!this.rateValueCheck()) {
            return;
        }
        let rateValue = this.state.rateValue;
        switch (e.currentTarget.id) {
            case 'showRole':
                let showRole = !this.state.showRole;
                this.state.showRole ? rateValue++ : rateValue--;
                this.setState({
                    RateDisabled: rateValue <= 1 ? false : true,
                    showRole: showRole,
                    rateValue: rateValue
                })
                break;
            case 'showFirstCamp':
                let showFirstCamp = !this.state.showFirstCamp;
                this.state.showFirstCamp ? rateValue++ : rateValue--;
                this.setState({
                    RateDisabled: rateValue <= 1 ? false : true,
                    showFirstCamp: showFirstCamp,
                    rateValue: rateValue
                })
                break;
            case 'showSecondCamp':
                let showSecondCamp = !this.state.showSecondCamp;
                this.state.showSecondCamp ? rateValue++ : rateValue--;
                this.setState({
                    RateDisabled: rateValue <= 1 ? false : true,
                    showSecondCamp: showSecondCamp,
                    rateValue: rateValue
                })
                break;
            default:
                console.log('1')
                break;
        }
    };
    rateValueCheck = () => {
        if (this.state.rateValue === 0) {
            notification.open({
                message: '温馨提示',
                description: '请确保该玩家至少存在一滴血量,再以操作角色牌或者阵营方式恢复血量',
                icon: <Icon type="exclamation-circle" style={{ color: '#F8B800' }} />
            });
            return false
        } else {
            return true
        }
    };
    rateChange = (value) => {
        if (value > 1) {
            notification.open({
                message: '温馨提示',
                description: '请以操作角色牌或者阵营方式恢复血量。',
                icon: <Icon type="exclamation-circle" style={{ color: '#F8B800' }} />
            });
        } else {
            let rateValue = value,
                info = rateValue === 0 ? {
                    message: 'Game Over',
                    description: '请判断游戏胜负情况，具体信息参阅游戏规则。',
                    icon: <Icon type="like" style={{ color: '#21A3EC' }} />
                } : {
                        message: '温馨提示',
                        description: '成功恢复当前玩家血量，游戏继续。',
                        icon: <Icon type="smile" style={{ color: '#EC4521' }} />
                    };

            this.setState({
                RateDisabled: false,
                rateValue: rateValue
            })

            notification.open(info);
        }
    };
    hideenCamp = () => {
        let hideenCamp = this.state.hideenCamp
        this.setState({
            hideenCamp: !hideenCamp
        })
    };
    setCamp = (item) => {
        let iconColor = '#001529';
        let iconType = 'question-circle';
        item = this.state.hideenCamp ? 'unknow' : item;
        switch (item) {
            case 'red':
                iconColor = '#EC4521';
                iconType = 'crown';
                break;
            case 'blue':
                iconColor = '#21A3EC';
                iconType = 'thunderbolt';
                break;
            default:
                break;
        }
        iconColor = this.state.rateValue !== 0 ? iconColor : 'gray'
        iconType = this.state.rateValue !== 0 ? iconType : (this.state.roleInfo.camp === 'red' ? 'crown' : 'thunderbolt')
        return (
            <Icon style={{ color: iconColor, fontSize: "20px" }} type={iconType} theme="filled" />
        )
    };
    playerState = (state) => {
        let iconColor = '#30b767';
        let iconType = 'smile';
        switch (state) {
            case 0:
                iconType = 'frown';
                iconColor = 'gray';
                break;
            case 1:
            case 2:
                iconType = 'meh';
                iconColor = '#21A3EC';
                break;
            default:
                break;
        }
        return (
            <Icon style={{ color: iconColor, fontSize: "20px" }} type={iconType} />
        )
    };
    componentWillReceiveProps(nextProps) {
        if ((nextProps.roleInfo !== this.props.roleInfo)) {
            let data = nextProps.roleInfo;
            this.setState({
                RateDisabled: true,
                actionRole: '角色牌',
                actionCamp: '阵营牌',
                showRole: false,
                showFirstCamp: false,
                showSecondCamp: false,
                rateValue: 4,
                hideenCamp: false,
                roleInfo: data
            })
        }
    }
    render() {
        let fCamp = this.state.showFirstCamp ? this.setCamp(this.state.roleInfo.firstCamp) : this.state.actionCamp
        let sCamp = this.state.showSecondCamp ? this.setCamp(this.state.roleInfo.secondCamp) : this.state.actionCamp
        let name = <span className={this.state.rateValue === 0 ? style.inner_line : ''}>{this.props.roleInfo.player}</span>
        return (
            <Card className={style.card} hoverable
                actions={[
                    <a id="showRole" onClick={this.handleClick}>{this.state.showRole ? this.state.roleInfo.role : this.state.actionRole}</a>,
                    <a id="showFirstCamp" onClick={this.handleClick}>{fCamp}</a>,
                    <a id="showSecondCamp" onClick={this.handleClick}>{sCamp}</a>,
                    this.playerState(this.state.rateValue)
                ]}>
                <Row type="flex" align="middle">
                    <Col span={14}>
                        <Card.Meta
                            avatar={this.state.roleInfo.avatar ? <img
                                className={this.state.rateValue !== 0 ? style.avatar : style.avatar_gray}
                                src={this.state.roleInfo.avatar}
                            /> : <Icon className={this.state.rateValue !== 0 ? style.avatar : style.avatar_gray} type="android" theme="filled" />}
                            title={name}
                            description={"玩家" + this.props.index}
                        />
                    </Col>
                    <Col span={10}>
                        <Icon
                            className={this.state.rateValue !== 0 ? style.swing : style.swing_gray}
                            type={this.state.hideenCamp ? 'eye-invisible' : 'eye'}
                            onClick={this.hideenCamp}
                        />
                        <span style={{ position: "absolute", right: "0" }}>{this.props.firstblood ? <Icon className={this.state.rateValue !== 0 ? style.swing : style.swing_gray} type="dingding" /> : ''}</span>
                        <Rate onChange={this.rateChange} style={{ color: 'red' }} character={<Icon type="heart" theme="filled" />} allowClear value={this.state.rateValue} count={4} disabled={this.state.RateDisabled} />
                    </Col>
                </Row>
            </Card>
        );
    }
}