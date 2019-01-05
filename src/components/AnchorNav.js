import { Component } from 'react';
import { Anchor } from 'antd';

const { Link } = Anchor;

const handleClick = (e, link) => {
  e.preventDefault();
  console.log(link);
};

export default class AnchorNav extends Component {
    render() {
        const data = this.props.data;
        const content = data.map((item,index) => {
            return (
              <Link key={item.title+'_anchor'+index} href={'#'+item.title+index} title={item.title} />
            )
        });
        return (
            <div>
              <Anchor onClick={handleClick}>
              {content}
              </Anchor>
            </div>
        )
    }
}