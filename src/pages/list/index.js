import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'dva';

function mapStateToProps(state) {
    return {
        cardsList: state.cards.cardsList,
        cardsLoading: state.loading.effects['cards/queryList'],
    };
}

@connect(mapStateToProps)
export default class List extends Component {
    columns = [
        {
          title: '名称',
          dataIndex: 'name',
        },
        {
          title: '描述',
          dataIndex: 'desc',
        },
        {
          title: '链接',
          dataIndex: 'url',
          render: value => <a href={value} target='_blank'>{value}</a>
        },
      ];
    componentDidMount() {
        this.props.dispatch({
            type: 'cards/queryList',
        });
    };
    render() {
        const { cardsList, cardsLoading } = this.props;
      
        return (
          <div>
            <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading}/>
          </div>
        );
      }
}
