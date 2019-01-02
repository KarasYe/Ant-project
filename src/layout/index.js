import { Component } from 'react';
import { Layout, Menu, Icon, Button, Row, Col } from 'antd';
import Link from 'umi/link';
import { FormattedMessage, getLocale, setLocale } from 'umi/locale';
import LayoutStyle from './index.less';


const { Header, Footer, Sider, Content } = Layout;

// 引入子菜单组件
const SubMenu = Menu.SubMenu;

export default class BasicLayout extends Component {
    changLang() {
        const locale = getLocale();
        if (!locale || locale === 'zh-CN') {
            setLocale('en-US');
        } else {
            setLocale('zh-CN');
        }
    };
    render() {
        return <Layout>
            <Sider width={256} style={{ minHeight: "100vh" }}>
                <div style={{ height: "32px", background: "rgba(255,255,255,.2)", margin: "16px" }} />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1">
                        <Link to="/helloworld">
                            <Icon type="smile" />
                            <span>
                                <FormattedMessage id="helloworld" />
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/puzzlecards">
                            <Icon type="exception" />
                            <span>
                                <FormattedMessage id="FAQ" />
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to="/list">
                            <Icon type="bars" />
                            <span>
                                <FormattedMessage id="list" />
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Link to="/upload">
                            <Icon type="upload" />
                            <span>
                                <FormattedMessage id="upload" />
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Link to="/cards">
                            <Icon type="tags" />
                            <span>
                                <FormattedMessage id="cards" />
                            </span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span>
                        <Icon type="dashboard" />
                        <span>
                            <FormattedMessage id="dashboard" />
                        </span>
                    </span>}>
                        <Menu.Item key="2">
                            <Link to="/dashboard/analysis">
                                <Icon type="line-chart" />
                                <span>
                                    <FormattedMessage id="analysis" />
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/dashboard/monitor">
                                <Icon type="heat-map" />
                                <span>
                                    <FormattedMessage id="monitor" />
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/dashboard/workplace">
                                <Icon type="desktop" />
                                <span>
                                    <FormattedMessage id="workplace" />
                                </span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout>
                <Header className={LayoutStyle.header}>
                    <Row type="flex" justify="center">
                        <Col span={22}>Header</Col>
                        <Col span={2}>
                            <Button size="small" onClick={() => {
                                this.changLang();
                            }}>
                                <FormattedMessage id="lang" />
                            </Button>
                        </Col>
                    </Row>
                </Header>
                <Content className={LayoutStyle.content_wrapper}>
                    <div className={LayoutStyle.subWrapper}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer className={LayoutStyle.footer}>
                    Ant Design ©2019 Created by Ye Binbin
              </Footer>
            </Layout>
        </Layout>;
    }
}