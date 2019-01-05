import { Component } from 'react';
import { Timeline, Icon, Button } from 'antd';

export default class TimeLine extends Component {
    state = {
        reverse: true,
      }
    
      handleClick = () => {
        this.setState({ reverse: !this.state.reverse });
      }
    render() {
        // const data = this.props.data;
        // const content = data.map((item,index) => {
        //     return (
        //       <Timeline.Item key={item.title+'_timeline'+index} color={item.color}>{item.title}</Timeline.Item>
        //     )
        // });
        return (
            <div>
                <Button type="primary" style={{ marginTop: 16 }} onClick={this.handleClick}>倒叙切换</Button>
                <Timeline mode="alternate" pending="旅程还在继续，我的路还在脚下..." reverse={this.state.reverse}>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>毕业了！ 2015-06</Timeline.Item>
                <Timeline.Item>毕业第一份工作，加入停车网 2015-07</Timeline.Item>
                <Timeline.Item color="gray">因为个人职业发展需要，离开停车网 2016-06</Timeline.Item>
                <Timeline.Item>有幸认识诺特软件公司，并加入TheKnot大家庭担任web前端开发一职 2016-06</Timeline.Item>
                <Timeline.Item color="red">在职TheKnot期间，我学会了很多东西，认识很多人。 2016-06～2018-03</Timeline.Item>
                <Timeline.Item color="gray">天下无不散筵席，最终我还是选择离开TheKnot，不过我不会忘记我曾经来过... 2018-03</Timeline.Item>
                <Timeline.Item>离开TheKnot后，我来到了中企高呈担任web前端开发一职 2018-03</Timeline.Item>
                <Timeline.Item color="red">高呈小伙伴也是超级耐撕的，相处很融洽，工作得很开心，大家更像朋友一样 2018-03~2018-12</Timeline.Item>
                <Timeline.Item color="gray">随之小伙伴陆陆续续离开加上工作的性质与职业生涯规划的不可协调，最后我还是提交辞呈并选择离开 2018-12</Timeline.Item>
            </Timeline>
            </div>
        )
    }
}