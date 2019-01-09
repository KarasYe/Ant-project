import React from 'react';
import { Row, Col, Icon, Collapse } from 'antd';
import style from '../pages/resume/resume.less';

const Panel = Collapse.Panel

export default class ProjectInfo extends React.Component {
    render() {
        const data = this.props.data;
        const content = data.map((item, index) => {
            return (
                <Row key={item.title + index} id={item.title + index}>
                    <Col span={22} offset={2}>
                        <h5 className={style.introduce}>
                            <span>{item.title}</span>
                        </h5>
                        <Row>
                            <Col span={4} className={style.col}>
                                <Icon type="reconciliation" />
                                <span>{item.worker}</span>
                            </Col>
                            <Col span={8} className={style.col}>
                                <Icon type="calendar" />
                                <span>{item.projectTime}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={22} offset={2}>
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                            <Panel header="项目描述" key="1">
                                <p className={style.des}>
                                    {item.des}
                                </p>
                            </Panel>
                            <Panel header="项目成果" key="2">
                                <p className={style.des}>
                                    {item.result}
                                </p>
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>
            )
        });
        return (
            <div>
                {content}
            </div>
        )
    }
}