import { Component } from 'react';
import { Layout, Menu, Icon, Button, Row, Col } from 'antd';
import Link from 'umi/link';
import { FormattedMessage, getLocale, setLocale } from 'umi/locale';
import LayoutStyle from './index.less';


const { Header, Footer, Sider, Content } = Layout;

// 引入子菜单组件
const SubMenu = Menu.SubMenu;

export default class BasicLayout extends Component {
    state = {
        collapsed: true,
    };
    menuToggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    changLang() {
        const locale = getLocale();
        if (!locale || locale === 'zh-CN') {
            setLocale('en-US');
        } else {
            setLocale('zh-CN');
        }
    };
    render() {
        return (
<Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
                className={LayoutStyle.sider}
            >
                <div className={LayoutStyle.logo}>
                    <Link to="/">
                        <Icon type="html5" />
                    </Link>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                    <SubMenu key="sub1" title={<span>
                        <Icon type="file-text" />
                        <span>
                            <FormattedMessage id="resume" />
                        </span>
                    </span>}>
                        <Menu.Item key="1">
                            <Link to="/resume/profile">
                                <Icon type="user" />
                                <span>
                                    <FormattedMessage id="profile" />
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/resume/work">
                                <Icon type="bank" />
                                <span>
                                    <FormattedMessage id="work" />
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/resume/project">
                                <Icon type="trophy" />
                                <span>
                                    <FormattedMessage id="project" />
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/resume/other">
                                <Icon type="appstore" />
                                <span>
                                    <FormattedMessage id="other" />
                                </span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout>
                <Header className={LayoutStyle.header}>
                    <Row type="flex" justify="center">
                        <Col span={1}>
                            <Icon
                                className={LayoutStyle.menu}
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.menuToggle}
                            />
                        </Col>
                        <Col span={22}>
                            <a href="https://github.com/KarasYe/Ant-project" target="_blank">
                                <Icon type="github" className={LayoutStyle.github} />
                            </a>
                        </Col>
                        <Col span={1}>
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
        </Layout>
        )
    }
}