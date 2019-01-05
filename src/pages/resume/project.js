import { FormattedMessage } from "umi/locale";
import { Component } from "react";
import { Row, Col } from "antd";
import style from "./resume.less";
import Wordcloud from "../../components/WorldCloud";
import ProjectInfo from "../../components/ProjectInfo";
import AnchorNav from "../../components/AnchorNav";

const data = [{
  "x": "CSS3",
  "value": 1,
  "category": "Frontend"
}, {
  "x": "Java",
  "value": 2,
  "category": "Backend"
}, {
  "x": "Jquery",
  "value": 3,
  "category": "Frontend"
}, {
  "x": "UI",
  "value": 4,
  "category": "Design"
}, {
  "x": "UX",
  "value": 5,
  "category": "Product"
}, {
  "x": "Javascript",
  "value": 6,
  "category": "Frontend"
}, {
  "x": "HTML5",
  "value": 7,
  "category": "Frontend"
}, {
  "x": "React",
  "value": 8,
  "category": "Frontend1"
}, {
  "x": "Vue",
  "value": 9,
  "category": "Frontend1"
}, {
  "x": "Ant Design",
  "value": 10,
  "category": "Frontend2"
}, {
  "x": "Umi",
  "value": 11,
  "category": "Frontend2"
}, {
  "x": "Dva",
  "value": 12,
  "category": "Frontend2"
}, {
  "x": "Angular",
  "value": 13,
  "category": "Frontend1"
}, {
  "x": "Ruby",
  "value": 14,
  "category": "Backend"
}, {
  "x": "nodejs",
  "value": 15,
  "category": "Frontend3"
}, {
  "x": "svg",
  "value": 16,
  "category": "Frontend"
}, {
  "x": "canvas",
  "value": 17,
  "category": "Frontend"
}, {
  "x": "https",
  "value": 18,
  "category": "Frontend3"
}, {
  "x": "Class",
  "value": 19,
  "category": "keyWord"
}, {
  "x": "Python",
  "value": 20,
  "category": "backend"
}, {
  "x": "PHP",
  "value": 21,
  "category": "backend"
}, {
  "x": "Design",
  "value": 22,
  "category": "type"
}, {
  "x": "Frontend",
  "value": 23,
  "category": "type"
}, {
  "x": "Backend",
  "value": 24,
  "category": "type"
}];

const projectData = [{
  title: '个人主页',
  worker: 'web前端',
  projectTime: '2019.01~至今',
  des: '基于React的UI框架——Ant Design，开发的个人简历预览页面；主要工作是版面布局设计，公共组件开发，前端数据处理，用umi搭建手脚架与前端开发环境并部署和发布到阿里云。',
  result: '项目已发布上线，后期会做代码优化和调整，考虑加入编辑功能并美化UI界面。'
}, {
  title: '雅图仕，沃德，罗浮宫，翠林',
  worker: 'web前端',
  projectTime: '2018.10~2018.12',
  des: '负责网站前端页面的首页开发和维护，子页面的辅助开发，指导新人做页面结构和样式优化，精简代码和优化逻辑等等。',
  result: '项目正在开发中，负责实现页面复杂交互效果和参与优化工作，项目过程理解到，项目共同开发需要使用git分布式代码管理才能更好配合和协调工作，设计师需要用开发思维做设计，前端开发也需要具有一定设计美感，细节决定成败。'
}, {
  title: '小芸课程表小程序',
  worker: 'web前端',
  projectTime: '2018.10~2018.12',
  des: '实现微信用户管理自己课程的小程序，主要利用Touch WX框架（基于vue）开发，利用canvas实现每周每天精确到分钟的时间数据图表。',
  result: '熟悉小程序页面结构，熟悉Touch WX框架，该小程序属于数据功能型处理页面应用，考验更多是js数据处理能力。'
}, {
  title: '佛山燃气',
  worker: 'web前端',
  projectTime: '2018.8~2018.12',
  des: '该项目负责首页和子页面开发前端工作和中台设计器组件开发，负责移动端响应式开发。',
  result: '按时完成并交付项目，其中利用中台设计器开发通用组件和管理cms系统接口，自定义数据字段。认识到利用设计器平台开发网站的便捷性和局限性。'
}, {
  title: '韶音科技',
  worker: 'web前端',
  projectTime: '2018.3~2018.12',
  des: '韶音科技网站是九国语言版本的多功能型的国际官方门户网站，项目使用了story box（利用Facebook的Instagram资源进行信息抓取的第三方技术支持），后台亚马逊评论抓取与前端整合处理数据和展示，利用google map实现全球商店检索并展示等等。',
  result: '准确完成项目，按时交付网站页面，参与并独立完成韶音网站的前端页面开发和维护，项目中也受益匪浅，知道了在做前端开发时，从用户体验交互层面与设计层美感层面的考虑是不可欠缺的。'
}, {
  title: 'NDE-Admin-Tool',
  worker: 'web前端',
  projectTime: '2017.03~2018.03',
  des: 'NDE-Admin-Tool是一个基于react on rails框架开发的用户Email制作和管理的后台工具，可以生成用户所需要的NDE-Email，其中使用模块化组合Email功能是最近开发的需求。模块化组合Email就是使用不同模块化的Email部分组合成所需要的完整的Email，并保存在数据库和服务器上，使用者可以通过该后台下载对应Email并发送给用户。',
  result: 'NDE-Admin-Tool中负责前端页面开发，对用户与浏览器交互操作的信息进行验证和筛选，并将此数据进行严格分离和排序后提交给后端。该项目主要使用前沿前端框架React，其中难重点是前端负责大部分数据逻辑处理，根据用户操作利用react框架数据驱动的优势实时更新页面数据并预览结果，接受后端数据并根据用户操作处理对应数据，然后严格按照后端数据格式提交给后端，并实行前后端数据的同步等等。'
}, {
  title: 'TheKnot',
  worker: 'web前端',
  projectTime: '2017.03~2018.03',
  des: 'sweepstakes:属于一种基于抽奖来收集用户信息（比如邮件和用户姓名等）的网站单页面，一般设定开始和结束日期，到期页面链接自动过期跳转到主页；NDE Email：属于基础的table结构的单网页，兼容绝大多数主流邮件客户端的一种邮件Html文件；content-hub：属于主页面内容展示页面开发，基于ROR框架的单页面应用，是主要任务之一，处理Google广告逻辑和页面功能逻辑（比如调用视频，生成视频播放列表，ajax请求后端数据生成页面内容等等），基于原生js和jq实现；offer platform：属于一个综合性Google广告系统管理，负责前端页面展示和交互逻辑编写，利用ajax请求对应广告数据并按照需求展示在相应页面，可以灵活插入在用户主页，内容主页，副页等等网站页面。',
  result: '负责项目的前端部分开发和维护，基于rails框架的ruby后端开发环境开发页面，处理不同浏览器兼容问题。针对页面开发遇到问题利用JS解决冲突，期间学会了团队协作，前后端分离开发，git代码版本控制，react框架，使用npm依赖，webpack打包和babel编译等等。'
}
];

export default class project extends Component {
  render() {
    return (
      <div className={style.wrapper}>
        <h1 className={style.title}>
          <FormattedMessage id="project" />
        </h1>
        <Row>
          <Col span={16}>
            <ProjectInfo data={projectData} />
          </Col>
          <Col span={8}>
            <h1 className={style.sub_title}>
              <FormattedMessage id="keyWord" />
            </h1>
            <Wordcloud data={data} />
            <div className={style.anchor}>
              <AnchorNav data={projectData} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
