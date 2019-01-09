import React from 'react';
import { Row, Col, Icon, Card, Tag} from 'antd';
import style from '../pages/resume/resume.less';

export default class WorkInfo extends React.Component {
    render() {
        const data = this.props.data;
        const content = data.map((item,index) => {
            const tag = item.tag.map((t,i)=>{
              return(
                <Tag key={item.title+index+"_tag"+i}>{t}</Tag>
              )
            })
            const des = item.des.map((d,j)=>{
              return(
                <p key={item.title+index+"_des"+j}>{d}</p>
              )
            })
            return (
                <Row key={item.title+index}>
              <Col span={22} offset={2}>
                <h5 className={style.introduce}>
                  <span>{item.title}</span>
                </h5>
                <Row>
                  <Col span={6} className={style.col}>
                    <Icon type="environment" />
                    <span>{item.env}</span>
                  </Col>
                  <Col span={6} className={style.col}>
                    <Icon type="reconciliation" />
                    <span>{item.worker}</span>
                  </Col>
                  <Col span={8} className={style.col}>
                    <Icon type="calendar" />
                    <span>{item.workTime}</span>
                  </Col>
                </Row>
              </Col>
              <Col span={22} offset={2}>
                <Card>
                  {des}
                </Card>
              </Col>
              <Col span={22} offset={2}>
                <div className={style.tag_wrapper}>
                  {tag}
                </div>
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