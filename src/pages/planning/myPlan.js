import React from 'react';
import { FormattedMessage } from 'umi/locale';
import style from '../resume/resume.less';

export default class PlanComponent extends React.Component{
    render() {
        return (
            <div className={style.wrapper}>
                <h1 className={style.title}>
                    <FormattedMessage id="plan" />
                </h1>
            </div>
        )
    }
}