import { FormattedMessage } from 'umi/locale';
import { Component } from 'react';
import { Avatar, Row, Col, Icon, Popover, Card } from 'antd';
import FoldChart from '../../components/FoldChart.js'
import style from './resume.less';
import RowInfo from '../../components/RowInfo.js';

const content = (
    <div className={style.qr}>
        <img src="http://www.09883883.work/Resume/img/qr.jpeg" />
    </div>
);
const data = [
    {
      item: "Javascript",
      binbin: 75,
    },
    {
      item: "NodeJs",
      binbin: 70
    },
    {
      item: "Vue",
      binbin: 65
    },
    {
      item: "HTML5",
      binbin: 80
    },
    {
      item: "CSS3",
      binbin: 85
    },
    {
      item: "React",
      binbin: 80
    }
  ];
const individual = {
    titleId: 'individual',
    content: [
        {
            type: 'reconciliation',
            name: 'web前端',
            tip: '期望职位'
        }, {
            type: 'pay-circle',
            name: '保密',
            tip: '期望薪资'
        }, {
            type: 'project',
            name: '不限行业',
            tip: '期望行业'
        }, {
            type: 'environment',
            name: '广州市',
            tip: '期望地点'
        },
    ]
}
export default class Profile extends Component {
    render() {
        return (
            <div className={style.wrapper}>
                <h1 className={style.title}>
                    <FormattedMessage id="profile" />
                </h1>
                <Row type="flex" justify="center">
                    <Col span={22} offset={2} className={style.date}>
                        <Icon type="calendar" />
                        <span>更新时间: 01/04/2019</span>
                    </Col>
                    <Col span={18}>
                        <Row type="flex" justify="center">
                            <Col span={6} offset={2} className={style.avatar}>
                                <Avatar src="http://www.09883883.work/Resume/img/avatar.jpg" size={150} icon="user" />
                            </Col>
                            <Col span={16}>
                                <div className={style.profile}>
                                    <Row>
                                        <Col span={12} className={style.col}>
                                            <Icon type="idcard" theme="filled" />
                                            <span>叶彬彬</span>
                                        </Col>
                                        <Col span={12} className={style.col}>
                                            <Icon type="man" />
                                            <span>男</span>
                                        </Col>
                                        <Col span={12} className={style.col}>
                                            <Icon type="rocket" theme="filled" />
                                            <span>三年工作经验</span>
                                        </Col>
                                        <Col span={12} className={style.col}>
                                            <Icon type="hourglass" theme="filled" />
                                            <span>本科</span>
                                        </Col>
                                        <Col span={12} className={style.col}>
                                            <Icon type="trophy" theme="filled" />
                                            <span>离职，即刻到岗</span>
                                        </Col>
                                        <Col span={12} className={style.col}>
                                            <Icon type="phone" theme="filled" />
                                            <span>13266312331</span>
                                        </Col>
                                        <Col span={12} className={style.col}>
                                            <Icon type="qq" />
                                            <span>757617041</span>
                                        </Col>
                                        <Col span={12} className={style.col}>
                                            <Icon type="wechat" />
                                            <Popover content={content} title="wechat">
                                                <span>D2B6H_B1F2HB1F2H</span>
                                            </Popover>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={22} offset={2}>
                                <h5 className={style.introduce}>
                                    <FormattedMessage id="introduce" />
                                </h5>
                            </Col>
                            <Col span={22} offset={2}>
                                <Card>
                                    <p className={style.des}>
                                        三年前端开发经验，参与过多种类型网站开发，技术栈有H5，JavaScript，React，touchWX，vue，nodejs等等，涉及网站类型b2b，大型综合的门户网站，小型门户网站，小程序等等，行动派，敢于挑战，追求完美与极致。
                                    </p>
                                </Card>
                            </Col>
                        </Row>
                        <RowInfo data={individual}/>
                    </Col>
                    <Col span={6}>
                        <h1 className={style.sub_title}>
                            <FormattedMessage id="techStack" />
                        </h1>
                        <FoldChart data={data} />
                    </Col>
                </Row>
            </div>
        )
    }
}