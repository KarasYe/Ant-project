import { FormattedMessage } from 'umi/locale';
import { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import style from '../pages/resume/resume.less';

export default class RowInfo extends Component {
    render() {
        const data = this.props.data;
        const title = (
            <FormattedMessage id={data.titleId} />
        );
        const content = data.content.map((item) => {
            return (
                <Col span={6} className={style.col} key={item.key}>
                    <Icon type={item.type} theme="filled" />
                    <span>{item.name}</span>
                </Col>
            )
        });
        return (
            <div>
                <Row>
                    <Col span={22} offset={2}>
                        <h5 className={style.introduce}>
                            {title}
                        </h5>
                    </Col>
                    <Col span={22} offset={2}>
                        <Row>
                            {content}
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}