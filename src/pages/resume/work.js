import { FormattedMessage } from "umi/locale";
import React from "react";
import { Row, Col, Calendar } from "antd";
import PieChart from '../../components/PieChart.js'
import style from "./resume.less";
import WorkInfo from "../../components/WorkInfo.js";
import TimeLine from "../../components/TimeLine.js";

const workData = [{
  title: '中企动力科技股份有限公司(中企高呈)',
  env: '设计制作部',
  worker: 'web前端',
  workTime: '2018.03~2018.12',
  item: "中企高呈",
  type: "上市",
  count: 10,
  des: [
    '1、负责公司项目前端页面的开发工作;',
    '2、把控前端页面的交互效果实现可行性;',
    '3、负责完成项目的修改和维护;',
    '4、评估项目功能性页面与中台设计器的耦合性等。'],
  tag: [
    'Javascript',
    'HTML5',
    'CSS3',
    'Vue'
  ]
}, {
  title: '广州诺特软件开发有限公司',
  env: 'AdTech',
  worker: 'web前端',
  workTime: '2016.06~2018.03',
  item: "诺特软件",
  type: "外资",
  count: 21,
  des: ['负责公司The knot 内容页面的维护和开发;',
    '为公司赞助商开发合作页面，开发用户抽奖页面和广告NDE Emails;',
    '开发页面上的google AD并处理广告逻辑，负责NDE-Admin-Tool的开发等等。'],
  tag: [
    'React',
    'Ruby',
    'Git'
  ]
}, {
  title: '广州停车网络科技有限公司',
  env: '开发部',
  worker: 'web前端',
  workTime: '2015.07~2016.06',
  item: "停车网",
  type: "私企",
  count: 10,
  des: ['负责公司网站网页前端开发建设和管理，利用多种js开发网站前端，负责公司广告和图片设计。'],
  tag: [
    'DIV+CSS',
    'HTML',
    'CSS'
  ]
}
];

export default class Work extends React.Component {
  render() {
    return (
      <div className={style.wrapper}>
        <h1 className={style.title}>
          <FormattedMessage id="work" />
        </h1>
        <Row>
          <Col span={16}>
            <WorkInfo data={workData} />
          </Col>
          <Col span={8}>
            <h1 className={style.sub_title}>
              <FormattedMessage id="workTime" />
            </h1>
            <PieChart data={workData} />
            <div className={style.calendar}>
              <Calendar fullscreen={false}/>
            </div>
          </Col>
          <Col span={16} offset={4}>
            <div className={style.timeline}>
              <TimeLine />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
