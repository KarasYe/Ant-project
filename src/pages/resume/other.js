import { FormattedMessage } from 'umi/locale';
import { Component } from 'react';
import { Row, Col, Icon, List, Card, Tag } from 'antd';
import style from './resume.less';
import RowInfo from '../../components/RowInfo';

const data = [
    {
        title: 'Karas\'s Github',
        description: 'GitHub，偶尔会更新，欢迎来访。',
        link: 'https://github.com/KarasYe',
        type: 'github'
    },
    {
        title: '09883883',
        description: '个人主页，自己的网站，正在钻研前端技术的小菜鸟。。。',
        link: 'http://www.09883883.work',
        type: 'home'
    }
];
const education = {
    titleId: 'education',
    content: [
        {
            type: 'bank',
            name: '佛山科学技术学院',
            tip: '毕业院校'
        }, {
            type: 'tool',
            name: '光信息科学与技术',
            tip: '所属专业'
        }, {
            type: 'calendar',
            name: '2011~2015',
            tip: '在校时间'
        }, {
            type: 'hourglass',
            name: '学士学位',
            tip: '专业学位'
        },
    ]
};

export default class Profile extends Component {
    render() {
        return (
            <div className={style.wrapper}>
                <h1 className={style.title}>
                    <FormattedMessage id="other" />
                </h1>
                <Row type="flex" justify="center">
                    <Col span={18}>
                        <Row>
                            <Col span={22} offset={2}>
                                <h5 className={style.introduce}>
                                    <FormattedMessage id="social" />
                                </h5>
                            </Col>
                            <Col span={22} offset={2}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={data}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={<a href={item.link} target="_blank" className={style.col}><Icon type={item.type} theme="filled" /><span>{item.title}</span></a>}
                                                description={item.description}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                        <RowInfo data={education} />
                    </Col>
                    <Col span={6}>
                        <h1 className={style.sub_title}>
                            <FormattedMessage id="tag" />
                        </h1>
                        <Card>
                            <Tag color="#FF6F61" className={style.tip}>最强王者</Tag>
                            <Tag color="#5F4B8B" className={style.tip}>落地成盒</Tag>
                            <Tag color="#88B04B" className={style.tip}>Coding</Tag>
                            <Tag color="#f50" className={style.tip}>Music</Tag>
                            <Tag color="#2db7f5" className={style.tip}>登高攀岩</Tag>
                            <Tag color="#87d068" className={style.tip}>90后</Tag>
                            <Tag color="#108ee9" className={style.tip}>前端技术小菜鸡</Tag>
                            <Tag color="#88B04B" className={style.tip}>桌游达人</Tag>
                            <Tag color="#FF6F61" className={style.tip}>回首，掏</Tag>
                            <Tag color="#108ee9" className={style.tip}>鬼刀一开，看不见</Tag>
                            <Tag color="#87d068" className={style.tip}>走位，走位</Tag>
                            <Tag color="#f50" className={style.tip}>难受～～</Tag>
                            <Tag color="#2db7f5" className={style.tip}>09883883</Tag>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}