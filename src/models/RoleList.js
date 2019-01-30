const state = localStorage['role'] ? JSON.parse(localStorage.getItem('role')) : {
    data: [
        {
            id: 1,
            player: '暗部精英',
            role: '长老',
            camp: 'blue',
            avatar: 'https://www.09883883.work/Resume/img/avatar.jpg'
        },
        {
            id: 2,
            player: '燕子',
            role: '法师',
            camp: 'blue',
            avatar: 'https://www.09883883.work/Resume/img/yanzi.jpg'
        },
        {
            id: 3,
            player: '小强',
            role: '刺客',
            camp: 'red',
            avatar: 'https://www.09883883.work/Resume/img/xiaoqiang.jpg'
        },
        {
            id: 4,
            player: '洽林',
            role: '审判者',
            camp: 'blue',
            avatar: 'https://www.09883883.work/Resume/img/qialin.jpg'
        },
        {
            id: 5,
            player: '劲哥',
            role: '狂战士',
            camp: 'blue',
            avatar: 'https://www.09883883.work/Resume/img/jinge.jpg'
        },
        {
            id: 6,
            player: '琳琅',
            role: '情妇',
            camp: 'blue',
            avatar: 'https://www.09883883.work/Resume/img/linlang.jpg'
        },
        {
            id: 7,
            player: '沈总',
            role: '审判者',
            camp: 'blue',
            avatar: 'https://www.09883883.work/Resume/img/shenzong.jpg'
        },
        {
            id: 8,
            player: '锦明',
            role: '刺客',
            camp: 'blue',
            avatar: 'https://www.09883883.work/Resume/img/jinming.jpg'
        },
        {
            id: 9,
            player: '天业',
            role: '炼金术师',
            camp: 'blue',
            avatar: 'https://www.09883883.work/Resume/img/tianye.jpg'
        },
        {
            id: 10,
            player: '小龙',
            role: '小丑',
            camp: 'blue',
            avatar: 'https://www.09883883.work/Resume/img/xiaolong.jpg'
        },
        {
            id: 11,
            player: '玲玲',
            role: '法师',
            camp: 'blue',
            avatar: 'https://www.09883883.work/Resume/img/lingling.jpg'
        },
        {
            id: 12,
            player: '康靖',
            role: '护卫',
            camp: 'blue',
            avatar: 'https://www.09883883.work/Resume/img/kangjing.jpg'
        },
        {
            id: 13,
            player: '海燕',
            role: '干扰者',
            camp: 'blue',
            avatar: 'https://www.09883883.work/Resume/img/xiaoqi.jpg'
        },
        {
            id: 14,
            player: 'Cat',
            role: '长老',
            camp: 'blue',
            avatar: 'https://www.09883883.work/Resume/img/cat.jpg'
        },
        {
            id: 15,
            player: 'J',
            role: '情妇',
            camp: 'blue',
            avatar: 'https://www.09883883.work/Resume/img/j.jpg'
        }
    ],
    counter: 12
}

export default {
    namespace: 'rolelist',
    state: state,
    reducers: {
        addNewRole(state, { payload: newRole }) {
            const nextCounter = state.counter + 1;
            const newRoleWithId = { ...newRole, id: nextCounter };
            const nextData = state.data.concat(newRoleWithId);
            return {
                data: nextData,
                counter: nextCounter
            };
        },
        removeRole(state, { payload: oldRole }) {
            const currentData = state.data.filter(item => item.id !== oldRole.id)
            const nextCounter = state.counter
            return {
                data: currentData,
                counter: nextCounter
            };
        },
        changeRole(state, { payload: roleList }) {
            const currentData = Object.assign(state.data, roleList);
            const nextCounter = state.counter;
            return {
                data: currentData,
                counter: nextCounter
            };
        }
    },
};