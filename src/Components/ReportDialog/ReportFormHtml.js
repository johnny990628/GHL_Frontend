import React, { Fragment } from 'react'

import useStyles from './Style'

import Gallbladder from '../../Assets/OrganJson/gallbladder.json'
import Kidney from '../../Assets/OrganJson/kidney.json'
import Liver from '../../Assets/OrganJson/liver.json'
import Pancreas from '../../Assets/OrganJson/pancreas.json'
import Spleen from '../../Assets/OrganJson/spleen.json'
import Suggestion from '../../Assets/OrganJson/suggestion.json'

const FormSection = ({ list, row: { patient, report } }) => {
    const classes = useStyles()
    const { data } = report
    const cancerArr = data[list.name]
    return (
        <>
            <tr>
                <td rowSpan={list.cols.length * 1 + 1} className={classes.table} style={{ fontSize: '1.5rem' }}>
                    {list.label}
                </td>
                <td rowSpan={list.cols.length * 1 + 1} className={classes.table}>
                    <input type="checkbox" defaultChecked={cancerArr.length === 0} readOnly />
                    正常
                </td>
            </tr>
            {list.cols.map(col => {
                const checked = cancerArr.some(c => c.name === col.name)
                return (
                    <Fragment key={col.name}>
                        {col.type === 'radio' && (
                            <tr>
                                <td className={classes.table}>
                                    <input type="checkbox" defaultChecked={checked} readOnly />
                                    {col.label}
                                    {col.options.map(option => (
                                        <>
                                            <input
                                                type="radio"
                                                value={option.value}
                                                defaultChecked={cancerArr.some(c => c.name === col.name && c.value === option.value)}
                                                readOnly
                                            />
                                            {option.label}
                                        </>
                                    ))}
                                </td>
                            </tr>
                        )}
                        {col.type === 'checkbox' && (
                            <tr>
                                <td className={classes.table}>
                                    <input type="checkbox" defaultChecked={checked} readOnly />
                                    {col.label}
                                </td>
                            </tr>
                        )}
                        {col.type === 'text' && (
                            <tr>
                                <td colSpan="3" className={classes.table}>
                                    <input type="checkbox" defaultChecked={checked} readOnly />
                                    {col.label}:{cancerArr.find(c => c.name === col.name)?.value}
                                </td>
                            </tr>
                        )}
                        {col.type === 'select' && (
                            <tr>
                                <td colSpan="3" className={classes.table}>
                                    <input type="checkbox" defaultChecked={checked} readOnly />
                                    {col.label
                                        .split('_')
                                        .reduce(
                                            (prev, cur, curI) =>
                                                prev + (cancerArr.find(c => c.name === col.name)?.value[curI === 1 ? 0 : 1] || '_') + cur
                                        )}
                                </td>
                            </tr>
                        )}
                    </Fragment>
                )
            })}
        </>
    )
}

const ReportFormHtml = ({ row }) => {
    const classes = useStyles()
    return (
        <table className={classes.table} style={{ width: '60%' }}>
            <tbody>
                <tr>
                    <td className={classes.table}>
                        <b>項目</b>
                    </td>
                    <td colSpan="3" className={classes.table}>
                        <b>檢查結果及說明</b>
                    </td>
                </tr>
                {[Liver, Gallbladder, Kidney, Pancreas, Spleen, Suggestion].map(list => (
                    <FormSection key={list.name} list={list} row={row} />
                ))}
            </tbody>
        </table>
    )
}

export default ReportFormHtml
