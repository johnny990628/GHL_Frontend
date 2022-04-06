import React from 'react'

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
                <td rowspan={list.cols.length * 1 + 1} className={classes.table} style={{ fontSize: '1.5rem' }}>
                    {list.label}
                </td>
                <td rowspan={list.cols.length * 1 + 1} className={classes.table}>
                    <input type="checkbox" checked={cancerArr.length === 0} readonly />
                    正常
                </td>
            </tr>
            {list.cols.map(col => {
                const checked = cancerArr.some(c => c.name === col.name)
                return (
                    <>
                        {col.type === 'radio' && (
                            <tr>
                                <td className={classes.table}>
                                    <input type="checkbox" checked={checked} readonly />
                                    {col.label}
                                    {col.options.map(option => (
                                        <>
                                            <input
                                                type="radio"
                                                value={option.value}
                                                checked={cancerArr.some(c => c.name === col.name && c.value === option.value)}
                                                readonly
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
                                    <input type="checkbox" checked={checked} readonly />
                                    {col.label}
                                </td>
                            </tr>
                        )}
                        {col.type === 'text' && (
                            <tr>
                                <td colspan="3" className={classes.table}>
                                    <input type="checkbox" checked={checked} readonly />
                                    {col.label}:{cancerArr.find(c => c.name === col.name)?.value}
                                </td>
                            </tr>
                        )}
                        {col.type === 'select' && (
                            <tr>
                                <td colspan="3" className={classes.table}>
                                    <input type="checkbox" checked={checked} readonly />
                                    {col.label
                                        .split('_')
                                        .reduce(
                                            (prev, cur, curI) =>
                                                prev + (cancerArr.find(c => c.name === col.name)?.value[curI === 1 ? 0 : 1] || '_') + cur
                                        )}
                                </td>
                            </tr>
                        )}
                    </>
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
                    <td colspan="3" className={classes.table}>
                        <b>檢查結果及說明</b>
                    </td>
                </tr>
                {[Liver, Gallbladder, Kidney, Pancreas, Spleen, Suggestion].map(list => (
                    <FormSection list={list} row={row} />
                ))}
            </tbody>
        </table>
    )
}

export default ReportFormHtml
