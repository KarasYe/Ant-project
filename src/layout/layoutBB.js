import { Component } from 'react';
import { Layout, Icon, Button, Row, Col, Modal } from 'antd';
import { getLocale, setLocale } from 'umi/locale';
import LayoutStyle from './index.less';
import DrawerInfo from '../components/DrawerInfo';
import RoleForm from '../components/RoleForm';


const { Header, Footer, Content } = Layout;

const GameRule = [
    {
        name: '游戏开始及回合设置：',
        content: '不同于杀人/三国杀等以顺时针或逆时针发言/行动的回合制游戏，Blood Bound以玩家之间互相出刀/给刀作为推进回合前进的方式。在游戏开始时，随机挑选一名玩家作为第一位持刀人（我一般会在桌子上旋转刀，刀尖指着哪名玩家就是那一名玩家先开始）。持刀人有两个选择：(1)把刀交给另一名玩家；(2)攻击另一名玩家，并把刀交给该玩家。游戏开始时，每名玩家给其左边的玩家看自己的表象阵营（下文会补充解释）。'
    },
    {
        name: '角色与阵营设置：',
        content: 'Blood Bound一共有20张角色牌，其中红色阵营9张，蓝色阵营9张，中立阵营2张。如果玩家人数为偶数，则从红蓝两个阵营中随机挑选同样数量的角色；若玩家人数为奇数，则从红蓝两个阵营中随机挑选同样数量的角色再加随机一张中立阵营牌。红色阵营和蓝色阵营的9个角色分别标有1-9的编号，也代表了他们在该阵营中的等级，每个角色的技能不一样。每个角色卡的左上角标注了该角色的真实阵营（不能给任何人看），右下角标注了该角色的表象阵营（游戏开始时给左侧的玩家看）。真实阵营和表象阵营不同的只有小丑，后文会详细介绍。'
    },
    {
        name: '血量设计：',
        content: '每名玩家都有四点血，被打掉第四点的时候死亡（游戏结束）。其中被打掉前三点血的每一点时，都要亮出自己身份的一个“线索”。这个线索在卡牌的右上角。根据这些亮出来的线索，其他玩家可以逐步锁定该玩家的阵营和等级。'
    },
    {
        name: '获胜方式：',
        content: '每个角色的等级编号越小，说明该角色在阵营中越重要。当场上有第一名玩家死亡的时候，游戏随之结束（全场只会死掉一名玩家，所以每名玩家都会从头至尾参与游戏）。如果死亡的角色牌，是造成该角色死亡的伤害来源的角色牌的对立阵营的等级编号最小的，那么伤害来源的阵营胜利，反之失败。（这句话有点儿绕，其实胜利条件就是说需要杀死对面阵营的等级编号最小的那个人。但是为什么说这么绕，主要是为了防止游戏中出现一些特殊的情况。如果玩一玩发现出现了不合理的获胜情况，就再翻出来这句话看一看）'
    },
    {
        name: '挡刀：',
        content: '当一名玩家被别的玩家攻击时（本文中的“攻击”特指用刀伤害别的玩家），可以主动呼吁别人帮忙挡刀，别的玩家也可以主动站出来说我要替你挡刀。被挡刀者可以选择一名愿意替他挡刀的玩家替他挡刀（如果出现多名）；或者拒绝所有挡刀者的申请，自己承受伤害。一次攻击中不能出现多次挡刀（即不能在一次攻击中，A替B挡刀，C又替A挡刀）。挡刀者承受挡刀的这一次攻击伤害时，必须亮出自己的等级线索（也就是说挡刀的一下不能亮出另外两个线索，一般情况下只能挡一次刀）。挡刀者承受伤害后持刀。'
    },
    {
        name: '技能发动：',
        content: '每个角色拥有不同的技能，只有在受到“攻击”亮明角色等级线索的时候可以发动技能（重要的地方已经加粗，受到技能伤害掉血是不能发动技能的；一般的，技能只能发动一次）。特殊的，4号炼金术师只有在挡刀的时候才能发动技能。技能不能被任何人挡掉。'
    }
];

const GameRole = [
    {
        name: '1. 长老：拿取一根羽毛',
        explanation: '技能解读：羽毛的功能是让该阵营的等级编号最大的角色成为阵营首领，敌对阵营需要杀死我方阵营等级编号最大的角色才能获胜。',
        skill: '技巧：长老是阵营中等级编号最小的，一旦出现势必是首领，所以不太可能去替人挡刀。发动技能的时机需要仔细拿捏，因为有可能会受到技能影响导致发不出技能（2号刺客，4号炼金，5号感应者，7号狂战士）。'
    },
    {
        name: '2. 刺客：指定一位玩家受到两点伤害，并把刀给他',
        explanation: '技能解读：逆转局势的重要技能，唯一一个能直接掉两点伤害的技能；也是打废对面阵营技能的技能。',
        skill: '技巧：发动技能去打一名已经受到一点伤害的玩家可以直接废掉该名玩家技能。在游戏后期局势较明朗的情况下，刺客的技能往往能够决定胜败。刺客的等级编号也比较小，很可能是阵营首领，所以玩刺客也需要保护好自己，适当时候呼吁挡刀，在后期关键时刻一击制胜。'
    },
    {
        name: '3. 小丑：秘密查看两张角色卡',
        explanation: '技能解读：是唯一能够直接看清真实阵营和等级的技能，对阵营的整体战略有决定性作用。',
        skill: '技巧：小丑是全部角色卡中唯一一张真实阵营和表象阵营不一致的角色，这让他有些类似于三国杀中的内奸。小丑也是一位适合较晚展示自己技能的角色，因为选择去看的两张牌一定是当前局势还不清楚的角色，游戏前期陆续会有一些角色的阵营和等级暴露出来，一直保护自己身份的人一定是技能重要或者是可能是首领的人。由于真实阵营和表象阵营不一致，所以小丑可以多搅局，骗盾牌等，消耗敌方保护性技能。'
    },
    {
        name: '4. 炼金术师：强迫你挡刀的玩家损失/回复一点生命（只有在挡刀的时候才可以使用）',
        explanation: '技能解读：回复一点生命比较好理解，一般可以用来救己方阵营首领或者是己方阵营拥有关键性技能的角色（回复一点生命可以让被回复者扔回等级编号，他就可以第二次发动技能）。损失一点生命的使用情景比较特殊，一般只有在该玩家已经掉了两点血、再受伤害就要亮等级编号了，你想废掉他的技能，同时该玩家同意你为他挡刀的情况下，才值得使用损失一点生命（因为损失一点生命是技能伤害，受伤玩家是不能发动技能的）。',
        skill: '技巧：炼金术师要找准机会，为己方阵营的大哥使用两次技能做挡刀准备。所以炼金需要尽早通过大家自由交流确定己方阵营的玩家是哪几位，一点血的差别造成的局势变化还是很严重的。当然也不用过于谨慎，该发动技能就发动。一般8人局或者10人局，炼金术士是首领的可能性已经比较低了，所以不用太过惜命，有时可以主动吸引对方火力。'
    },
    {
        name: '5. 干扰者：强迫另外一位玩家收到一点伤害（亮出等级编号），并把刀交给他',
        explanation: '技能解读：废掉另外一名玩家的技能。',
        skill: '技巧：干扰者也是一名需要尽快发现地方阵营关键人物是谁的角色，或者是到后期如果对方还有没有亮出身份的玩家也可以用技能让他强亮一波。干扰者及以下等级基本不太可能在游戏中是首领（当然笔者也见过6人局一边阵营抽中了789...），所以就不用太惜命了。'
    },
    {
        name: '6. 护卫：分配一个盾牌给一个玩家，并拿匹配的剑',
        explanation: '技能解读：把盾牌给一名玩家，使该名玩家不受到任何伤害（技能伤害也免疫）。护卫受到三点伤害时，盾牌失效。配盾者挡刀时依然会受到伤害。',
        skill: '技巧：护卫的技巧比较直接，保护好自己方阵营的大哥。如果人多的时候，对面阵营肯定会有骗盾牌的，届时要仔细考虑。如果不确定的话不要过早交盾。'
    },
    {
        name: '7. 狂战士：使攻击你的人受到一点伤害',
        explanation: '技能解读：类似于三国杀夏侯惇的刚烈。狂战士的这一点伤害是对方不能挡也不能发动技能的。同时刀还在自己手里。',
        skill: '技巧：也是一个间接废技能的人物。造成伤害同时刀在自己手中，狂战也是拉开双方血量的关键性人物。'
    },
    {
        name: '8. 法师：把法杖给一名玩家，并自己也获得一根法杖',
        explanation: '技能解读：法杖是说当你需要展示阵营标志物时，展示“？”。当法师被回复血可以再次发动技能时，他可以选择法杖位置不变，或者拿回法杖并交给另外一名玩家',
        skill: '技巧：法师的技能比较适合交给己方的156三名角色，当然最合适的莫过于1号长老。所以法师需要考虑什么时候放技能，因为一旦己方有人已经亮了阵营标示，再给法杖就没有意义了。'
    },
    {
        name: '9. 情妇：把扇子给任意一名玩家',
        explanation: '技能解读：扇子是说获得扇子的玩家受到攻击不能被别人挡刀。',
        skill: '技巧：情妇的扇子在确定敌方首领时会起到关键性的作用，或者是在游戏前期快速的打掉对方一名玩家三点血看等级标示。情妇在己方阵营中有长老时又显得尤为重要，因为一旦长老发动了技能，情妇就是首领了'
    },
    {
        name: '10. 审判者：把诅咒卡面朝下放在你诅咒的玩家前面',
        explanation: '技能解读：有一张真诅咒卡，一张假诅咒卡。游戏结束后，翻开两张诅咒卡。如果真诅咒卡在胜方首领的前面的话，审判者获胜。',
        skill: '技巧：审判者需要尽量掩护自己，争取尽量晚的发动技能，因为可以看局势看的更多，更容易去判断两方的首领分别是谁。'
    }
]

export default class BasicLayout extends Component {
    state = {
        visible: false
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        localStorage.clear()
        setTimeout(()=>{
            location.reload()
        },0)
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    changeLang = () => {
        const locale = getLocale();
        if (!locale || locale === 'zh-CN') {
            setLocale('en-US');
        } else {
            setLocale('zh-CN');
        }
    };
    handleClick = (e) => {
        if (!sessionStorage['currentKey']) {
            sessionStorage.setItem('currentKey', e.key)
        } else {
            sessionStorage['currentKey'] = e.key
        }
        this.setState({
            current: e.key,
        });
    };
    render() {
        return (
            <Layout>
                <Layout>
                    <Header className={LayoutStyle.dark_header}>
                        <Row type="flex" justify="center">
                            <Col span={2}>
                                <DrawerInfo name="角色" data={GameRole} type="role" width="50%" placement="right" />
                            </Col>
                            <Col span={2}>
                                <DrawerInfo name="规则" data={GameRule} type="rule" width="50%" placement="right" />
                            </Col>
                            <Col span={2}>
                                <DrawerInfo name="细节" data={GameRule} type="rule" width="50%" placement="right" />
                            </Col>
                            <Col span={3}>
                                <span style={{ color: "#EC4521", marginRight: "5px" }}>红色联盟</span>
                                <Icon style={{ color: "#EC4521", fontSize: "20px" }} type="crown" theme="filled" />
                            </Col>
                            <Col span={4}>
                                <a href="https://github.com/KarasYe/Ant-project" target="_blank">
                                    <Icon type="github" className={LayoutStyle.github} />
                                </a>
                            </Col>
                            <Col span={3}>
                                <Icon style={{ color: "#21A3EC", fontSize: "18px" }} type="thunderbolt" theme="filled" />
                                <span style={{ color: "#21A3EC", marginLeft: "5px" }}>蓝色联盟</span>
                            </Col>
                            <Col span={2}>
                                <Button type="primary" onClick={this.showModal}>
                                    <Icon type="reload" />重置
                                </Button>
                                <Modal
                                    title="⚠️操作警告"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                >
                                    <p>此次操作会重置和还原初始化状态！会清空修改和新增玩家的数据，请谨慎操作。</p>
                                </Modal>
                            </Col>
                            <Col span={2}>
                                <RoleForm name="设置" width="720px" placement="left" />
                            </Col>
                            <Col span={2}>
                                <Button type="primary" onClick={() => { location.reload(); }}>
                                    <Icon type="poweroff" />开始
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
                        Blood Bound ©2019 Created by Ye Binbin
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}