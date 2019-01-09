import { FormattedMessage } from 'umi/locale';
import React from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import style from '../pages/resume/resume.less';

export default class RowInfo extends React.Component {
    render() {
        const data = this.props.data;
        const title = (
            <FormattedMessage id={data.titleId} />
        );
        const content = data.content.map((item,index) => {
            return (
                <Col span={6} className={style.col} key={title+index}>
                    <Icon type={item.type} theme="filled" />
                    <Tooltip title={item.tip}>
                        {item.name}
                    </Tooltip>
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