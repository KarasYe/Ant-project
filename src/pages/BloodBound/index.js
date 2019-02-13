import { Component } from 'react';
import { Row, Col} from 'antd';
import RoleCard from '../../components/RoleCard';
import { connect } from 'dva';

const namespace = 'rolelist';

const mapStateToProps = (state) => {
    const roleList = state[namespace].data;
    return {
      roleList,
    };
  };
  @connect(mapStateToProps)
export default class GM extends Component{
    state={
        roleList: this.props.roleList
    }
    initData = (data)=>{
        data.forEach(element => {
            switch(element.role){
                case '刺客':
                case '小丑':
                case '炼金术师':
                case '审判者':
                    element.firstCamp = 'unknow';
                    element.secondCamp = 'unknow';
                    break;
                case '狂战士':
                case '法师':
                case '情妇':
                    element.firstCamp = element.camp;
                    element.secondCamp = 'unknow';
                    break;
                default:
                    element.firstCamp = element.camp;
                    element.secondCamp = element.camp;
                    break;
            }
        });
        return data
    }
    componentWillMount(){
        let data = this.props.roleList;
        data = this.initData(data);
        this.setState({
            roleList: data
        })
    }
    componentWillReceiveProps(nextProps){
        if((nextProps.roleList !== this.props.roleList)){
            let data = nextProps.roleList;
            data = this.initData(data);
            this.setState({
                roleList: data
            })
        }
    }
    render() {
        const random = Math.floor(Math.random()*this.state.roleList.length);
        const content = this.state.roleList.map((item,index)=>{
            return(
                <Col span={6} key={'role'+index} style={{minHeight:"16.67vh"}}>
                    <RoleCard roleInfo={item} index={index+1} firstblood={random === index}/>
                </Col>
            )
        })
        return (
            <div>
                <Row>
                    {content}
                </Row>
            </div>
        );
    }
}