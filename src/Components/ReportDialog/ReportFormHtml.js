import React from 'react'

import useStyles from './Style'

import Gallbladder from '../../Assets/OrganJson/gallbladder.json'
import Kidney from '../../Assets/OrganJson/kidney.json'
import Liver from '../../Assets/OrganJson/liver.json'
import Pancreas from '../../Assets/OrganJson/pancreas.json'
import Spleen from '../../Assets/OrganJson/spleen.json'
import Suggestion from '../../Assets/OrganJson/suggestion.json'

const FormSection = ({ list }) => {
    const classes = useStyles()
    return (
        <>
            <tr>
                <td rowspan={list.cols.length} className={classes.table}>
                    {list.label}
                </td>
                <td rowspan={list.cols.length} className={classes.table}>
                    <input type="checkbox" />
                    正常
                </td>
            </tr>
            {list.cols.map(col => (
                <>
                    {col.type === 'radio' && (
                        <tr>
                            <td className={classes.table}>
                                <input type="checkbox" />
                                {col.label}
                                {col.options.map(option => (
                                    <>
                                        <input type="radio" value={option.value} />
                                        {option.label}
                                    </>
                                ))}
                            </td>
                        </tr>
                    )}
                    {col.type === 'checkbox' && (
                        <tr>
                            <td className={classes.table}>
                                <input type="checkbox" />
                                {col.label}
                            </td>
                        </tr>
                    )}
                    {col.type === 'text' && (
                        <tr>
                            <td colspan="3" className={classes.table}>
                                <input type="checkbox" />
                                {col.label}
                            </td>
                        </tr>
                    )}
                    {col.type === 'select' && (
                        <tr>
                            <td colspan="3" className={classes.table}>
                                <input type="checkbox" />
                                {col.label}
                            </td>
                        </tr>
                    )}
                </>
            ))}
        </>
    )
}

const ReportFormHtml = () => {
    const classes = useStyles()
    return (
        <table className={classes.table} style={{ width: '80%', margin: '2rem' }}>
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
                    <FormSection list={list} />
                ))}
            </tbody>
        </table>
    )
}

export default ReportFormHtml
