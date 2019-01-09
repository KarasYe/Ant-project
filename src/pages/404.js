import { FormattedMessage } from 'umi/locale';
import LayoutStyle from '../layout/index.less';
import { Icon } from 'antd';

export default () => {
  return (
      <div className={LayoutStyle.page_404}>
          <div><Icon type="frown" /></div>
          <FormattedMessage id="pageNotExist" />
      </div>
  )
}