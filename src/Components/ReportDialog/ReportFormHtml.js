import React, { Fragment, useState, useEffect } from 'react'

import useStyles from './Style'
import './print.css'

import Gallbladder from '../../Assets/OrganJson/gallbladder.json'
import Kidney from '../../Assets/OrganJson/kidney.json'
import Liver from '../../Assets/OrganJson/liver.json'
import Pancreas from '../../Assets/OrganJson/pancreas.json'
import Spleen from '../../Assets/OrganJson/spleen.json'
import Suggestion from '../../Assets/OrganJson/suggestion.json'
import { useSelector } from 'react-redux'

export const ReportFormForPDF = React.forwardRef((_, ref) => {
    return (
        <div style={{ width: '100%' }} ref={ref}>
            <FormHeader />
            <PatientForm />
            <ReportFormHtml print={true} />
            <FormFooter />
        </div>
    )
})

const ReportFormHtml = ({ print }) => {
    const classes = useStyles()
    return (
        <table className={classes.table} style={{ width: '90%', margin: 'auto' }}>
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
                    <FormSection key={list.name} list={list} />
                ))}
                {print && (
                    <tr>
                        <td className={classes.table} style={{ fontSize: '1.5rem' }}>
                            醫師簽章
                        </td>
                        <td colSpan="3" className={classes.table}>
                            <div>
                                <img src="./docSign.png" alt="docSign" style={{ width: '15rem', height: '3rem' }} />
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

const FormSection = ({ list }) => {
    const classes = useStyles()
    const report = useSelector(state => state.reportForm)
    const [cancerArr, setCancerArr] = useState([])
    useEffect(() => {
        if (report) {
            setCancerArr(report[list.name])
        }
    }, [report])

    return (
        <>
            <tr>
                <td rowSpan={list.cols.length * 1 + 1} className={classes.table} style={{ fontSize: '1.5rem' }}>
                    {list.label}
                </td>
                <td rowSpan={list.cols.length * 1 + 1} className={classes.table}>
                    <input type="checkbox" checked={cancerArr?.length === 0} readOnly />
                    正常
                </td>
            </tr>
            {list.cols.map(col => {
                const checked = cancerArr?.some(c => c.name === col.name)
                return (
                    <Fragment key={col.name}>
                        {col.type === 'radio' && (
                            <tr>
                                <td className={classes.table}>
                                    <input type="checkbox" checked={checked} readOnly />
                                    {col.label}
                                    {col.options.map(option => (
                                        <>
                                            <input
                                                type="radio"
                                                value={option.value}
                                                checked={cancerArr?.some(c => c.name === col.name && c.value?.includes(option.value))}
                                                readOnly
                                            />
                                            {option.label}
                                        </>
                                    ))}
                                    {cancerArr?.find(c => c.name.includes(col.name) && c.name.includes('_'))?.value}
                                </td>
                            </tr>
                        )}
                        {col.type === 'checkbox' && (
                            <tr>
                                <td className={classes.table}>
                                    <input type="checkbox" checked={checked} readOnly />
                                    {col.label}
                                </td>
                            </tr>
                        )}
                        {col.type === 'text' && (
                            <tr>
                                <td className={classes.table}>
                                    <input type="checkbox" checked={checked} readOnly />
                                    {col.label}:{cancerArr?.find(c => c.name === col.name)?.value}
                                </td>
                            </tr>
                        )}
                        {col.type === 'select' && (
                            <tr>
                                <td colSpan="3" className={classes.table}>
                                    <input type="checkbox" checked={checked} readOnly />
                                    {col.label
                                        .split('_')
                                        .reduce(
                                            (prev, cur, curI) =>
                                                prev + (cancerArr?.find(c => c.name === col.name)?.value[curI === 1 ? 0 : 1] || '_') + cur
                                        )}
                                </td>
                            </tr>
                        )}
                        {col.type === 'text_size' && <tr></tr>}
                    </Fragment>
                )
            })}
        </>
    )
}

const PatientForm = () => {
    const classes = useStyles()

    const {
        row: { patient },
    } = useSelector(state => state.dialog.report)

    return (
        <table className={classes.table} style={{ width: '90%', margin: 'auto', marginBottom: '1rem' }}>
            <tr>
                <td className={classes.table}>
                    <b>姓名</b>
                </td>
                {patient ? <td className={classes.table}>{patient?.name}</td> : <td className={classes.table}>&emsp;&emsp;&emsp;</td>}
                <td className={classes.table}>
                    <b>性別</b>
                </td>
                <td className={classes.table}>
                    <input type="checkbox" checked={patient?.gender === 'm'} readOnly />男
                    <input type="checkbox" checked={patient?.gender === 'f'} readOnly />女
                </td>
                <td className={classes.table}>
                    <b>出生年月日</b>
                </td>
                {patient ? (
                    <td className={classes.table}>{new Date(patient?.birth).toLocaleDateString()}</td>
                ) : (
                    <td className={classes.table}>&emsp;&emsp;&emsp;</td>
                )}
            </tr>
            <tr>
                <td className={classes.table}>
                    <b>電話</b>
                </td>
                <td className={classes.table} colSpan="5">
                    {patient?.phone}
                </td>
            </tr>
            <tr>
                <td className={classes.table}>
                    <b>部門單位</b>
                </td>
                <td className={classes.table} colSpan="2">
                    {patient?.department}
                </td>
                <td className={classes.table}>
                    <b>身份證字號</b>
                </td>
                <td className={classes.table} colSpan="2">
                    {patient?.id}
                </td>
            </tr>
        </table>
    )
}

const FormHeader = () => {
    const {
        row: { createdAt },
    } = useSelector(state => state.dialog.report)
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img alt="logo" src="./print_logo.png" style={{ width: '2rem' }} />
                <b style={{ fontSize: '1.5rem' }}>財團法人肝病防治學術基金會</b>
            </div>
            <b style={{ fontSize: '1.5rem' }}>腹部超音波檢查報告</b>
            <hr></hr>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between' }}>
                <div>檢查日期 : {new Date(createdAt).toLocaleDateString()}</div>
                <div>報告列印時間 : {new Date().toLocaleString()}</div>
            </div>
        </div>
    )
}
const FormFooter = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontSize: '1.2rem' }}>~感謝您參與本次檢驗活動，祝您健康~ 肝病諮詢專線 : 0800-000-583</p>
        </div>
    )
}

export default ReportFormHtml
